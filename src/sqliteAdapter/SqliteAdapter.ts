import { ref, Ref } from 'vue';
import { Flint, NodeAdapter } from 'gun-flint';
import StorageService from './storageService';
import { ISQLiteService } from './sqliteService';
import { IDbVersionService } from './dbVersionService';

// 日志工具
const log = {
  debug: (msg: string, ...args: any[]) => console.debug(`[Gun-SQLite-Adapter] ${msg}`, ...args),
  info: (msg: string, ...args: any[]) => console.info(`[Gun-SQLite-Adapter] ${msg}`, ...args),
  warn: (msg: string, ...args: any[]) => console.warn(`[Gun-SQLite-Adapter] ${msg}`, ...args),
  error: (msg: string, ...args: any[]) => console.error(`[Gun-SQLite-Adapter] ${msg}`, ...args),
};

// CRDT 合并函数（保持不变）
function mergeCRDT(oldNode: any, newNode: any): any {
  if (!oldNode) return { ...newNode };
  if (!newNode) return { ...oldNode };

  const oldMeta = oldNode._ && oldNode._['>'] ? oldNode._['>'] : {};
  const newMeta = newNode._ && newNode._['>'] ? newNode._['>'] : {};
  const merged = { ...oldNode, _: { ...oldNode._, '>': { ...oldMeta } } };

  for (const field in newNode) {
    if (field === '_') continue;
    const newVal = newNode[field];
    const newState = newMeta[field] || Date.now();

    if (!(field in oldNode)) {
      merged[field] = newVal;
      merged._['>'][field] = newState;
    } else if (typeof newVal === 'object' && typeof oldNode[field] === 'object' && newVal !== null && oldNode[field] !== null) {
      merged[field] = mergeCRDT(oldNode[field], newVal);
    } else {
      const oldState = oldMeta[field] || 0;
      if (newState > oldState) {
        merged[field] = newVal;
        merged._['>'][field] = newState;
      }
    }
  }
  return merged;
}

// 请求队列和缓存管理
class RequestQueue {
  private queue: Map<string, { resolve: (data: any) => void; reject: (err: any) => void }[]> = new Map();
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private storageServ: StorageService;
  private maxCacheSize: number = 1000;

  constructor(storageServ: StorageService) {
    this.storageServ = storageServ;
    this.initCache();
  }

  async initCache() {
    try {
      const result = await this.storageServ.query('SELECT key, value FROM gun_nodes WHERE key = ?', ['persistentCache']);
      if (result.values && result.values.length > 0) {
        this.cache = new Map(JSON.parse(result.values[0].value));
        log.info('Cache restored from SQLite');
      }
    } catch (err) {
      log.error('Failed to initialize cache from SQLite:', err);
    }
  }

  async get(key: string): Promise<any> {
    if (this.cache.has(key)) {
      const { data } = this.cache.get(key)!;
      log.debug(`Cache hit for key=${key}`);
      return data;
    }

    return new Promise((resolve, reject) => {
      const handlers = this.queue.get(key) || [];
      handlers.push({ resolve, reject });
      this.queue.set(key, handlers);

      if (!this.debounceTimers.has(key)) {
        const timer = setTimeout(async () => {
          const handlers = this.queue.get(key) || [];
          this.queue.delete(key);
          this.debounceTimers.delete(key);

          try {
            if (!this.storageServ.db) throw new Error('Database connection not available');
            const result = await this.storageServ.query('SELECT value FROM gun_nodes WHERE key = ?', [key]);
            const data = result.values && result.values.length > 0 ? JSON.parse(result.values[0].value) : null;
            if (this.cache.size >= this.maxCacheSize) {
              await this.trimCache();
            }
            this.cache.set(key, { data, timestamp: Date.now() });
            await this.saveCache();
            handlers.forEach(h => h.resolve(data));
          } catch (err) {
            log.error(`Failed to get key=${key}:`, err);
            handlers.forEach(h => h.reject(err));
          }
        }, 50);
        this.debounceTimers.set(key, timer);
      }
    });
  }

  async put(soul: string, node: any): Promise<void> {
    const oldData = await this.get(soul);
    const merged = mergeCRDT(oldData, node);
    await this.storageServ.run('INSERT OR REPLACE INTO gun_nodes (key, value, timestamp) VALUES (?, ?, ?)', [
      soul,
      JSON.stringify(merged),
      Date.now(),
    ]);
    if (this.cache.size >= this.maxCacheSize) {
      await this.trimCache();
    }
    this.cache.set(soul, { data: merged, timestamp: Date.now() });
    await this.saveCache();
  }

  async batchPut(nodes: Record<string, any>): Promise<void> {
    const updates: [string, string, number][] = [];
    for (const soul in nodes) {
      const oldData = await this.get(soul);
      const merged = mergeCRDT(oldData, nodes[soul]);
      updates.push([soul, JSON.stringify(merged), Date.now()]);
      if (this.cache.size >= this.maxCacheSize) {
        await this.trimCache();
      }
      this.cache.set(soul, { data: merged, timestamp: Date.now() });
    }
    await this.storageServ.run(
      'INSERT OR REPLACE INTO gun_nodes (key, value, timestamp) VALUES ' + updates.map(() => '(?, ?, ?)').join(','),
      updates.flat()
    );
    await this.saveCache();
  }

  async saveCache() {
    try {
      await this.storageServ.run('INSERT OR REPLACE INTO gun_nodes (key, value, timestamp) VALUES (?, ?, ?)', [
        'persistentCache',
        JSON.stringify([...this.cache]),
        Date.now(),
      ]);
    } catch (err) {
      log.error('Failed to save cache to SQLite:', err);
    }
  }

  async trimCache() {
    const entries = [...this.cache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp);
    const removeCount = Math.floor(entries.length * 0.25);
    for (let i = 0; i < removeCount; i++) {
      this.cache.delete(entries[i][0]);
    }
    log.info(`Trimmed cache, removed ${removeCount} items`);
  }

  async clearCache(): Promise<void> {
    try {
      this.cache.clear();
      await this.storageServ.run('DELETE FROM gun_nodes WHERE key = ?', ['persistentCache']);
      log.info('Cache cleared');
    } catch (err) {
      log.error('Failed to clear cache:', err);
      throw err;
    }
  }

  getCacheStatus(): { size: number; memoryBytes: number } {
    let totalBytes = 0;
    for (const [key, value] of this.cache) {
      totalBytes += (key.length * 2 + 8) + (JSON.stringify(value.data).length * 2 + 8) + 32;
    }
    return { size: this.cache.size, memoryBytes: totalBytes };
  }
}

// 定义适配器接口
interface GunAdapter {
  opt?: (context: any, options: any) => void;
  get: (key: string, done: (err: Error | null, node: any) => void) => void;
  put: (node: any, done: (err: Error | null) => void) => void;
}

export interface IGunSQLiteAdapter {
  initialize(): Promise<void>;
  getAdapter(): GunAdapter;
  clearCache(): Promise<void>;
  getCacheStatus(): { size: number; memoryBytes: number };
  isReady: Ref<boolean>;
}

// 单例实例
let instance: IGunSQLiteAdapter | null = null;

export function useGunSQLiteAdapter(
  sqliteService: ISQLiteService,
  dbVersionService: IDbVersionService,
  storageService: StorageService
): IGunSQLiteAdapter {
  if (instance) return instance;

  const isReady: Ref<boolean> = ref(false);
  const storageServ = storageService;
  let queue: RequestQueue | null = null;

  async function initialize() {
    if (isReady.value) return;
    try {
      log.info('Initializing Gun SQLite adapter...');
      // 检查 StorageService 是否已初始化数据库
      if (!storageServ.db) {
        log.warn('StorageService database not initialized, initializing now...');
        // 使用 SQLiteService 的 openDatabase 方法确保数据库打开
        const dbName = 'talkflowdb';
        const loadToVersion = storageServ.loadToVersion || 2; // 使用 StorageService 的目标版本
        storageServ.db = await sqliteService.openDatabase(dbName, loadToVersion, false);
      } else {
        const isOpen = await storageServ.db.isDBOpen()
        if (!isOpen) {
          log.warn('Database not open, reopening...');
          await storageServ.db.open();
        }
      }

      // 创建 gun_nodes 表
      const result = await storageServ.execute(`
        CREATE TABLE IF NOT EXISTS gun_nodes (
          key TEXT PRIMARY KEY NOT NULL,
          value TEXT NOT NULL,
          timestamp INTEGER DEFAULT (strftime('%s', 'now'))
        )
      `);
      if (result.changes && result.changes.changes >= 0) {
        log.info('gun_nodes table created or already exists');
      } else {
        throw new Error('Failed to create gun_nodes table: no changes returned');
      }

      queue = new RequestQueue(storageServ);
      isReady.value = true;
      log.info('Gun SQLite adapter initialized successfully');
    } catch (err) {
      log.error('Failed to initialize Gun SQLite adapter:', err);
      throw err;
    }
  }

  const adapterCore = {
    storageServ,
    queue,
    opt: async function (context: any, options: any) {
      log.info('Adapter opt called:', { context, options });
      await initialize();
      return options;
    },
    get: async function (key: string, done: (err: Error | null, node: any) => void) {
      try {
        if (!isReady.value) await initialize();
        if (!queue) throw new Error('Adapter not initialized');
        const data = await queue.get(key);
        done(null, data);
      } catch (err) {
        log.error(`Get error for key=${key}:`, err);
        done(err instanceof Error ? err : new Error('Unknown error'), null);
      }
    },
    put: async function (node: any, done: (err: Error | null) => void) {
      try {
        if (!isReady.value) await initialize();
        if (!queue) throw new Error('Adapter not initialized');
        if (typeof node !== 'object' || node === null) throw new Error('Invalid node');
        const souls = Object.keys(node).length > 1 ? Object.keys(node) : [node._?.['#'] || node._.id];
        if (!souls[0]) throw new Error('Missing soul in node');
        if (souls.length > 1) {
          await queue.batchPut(node);
        } else {
          await queue.put(souls[0], node[souls[0]] || node);
        }
        done(null);
      } catch (err) {
        log.error('Put error:', err);
        done(err instanceof Error ? err : new Error('Unknown error'));
      }
    },
  };

  const adapter = new NodeAdapter(adapterCore);
  Flint.register(adapter);

  const gunSQLiteAdapter: IGunSQLiteAdapter = {
    initialize,
    getAdapter: () => adapter,
    clearCache: async () => {
      if (!queue) throw new Error('Adapter not initialized');
      await queue.clearCache();
    },
    getCacheStatus: () => {
      if (!queue) throw new Error('Adapter not initialized');
      return queue.getCacheStatus();
    },
    isReady,
  };

  instance = gunSQLiteAdapter;
  return gunSQLiteAdapter;
}

export function getGunSQLiteAdapter(
  sqliteService: ISQLiteService,
  dbVersionService: IDbVersionService,
  storageService: StorageService
): IGunSQLiteAdapter {
  if (!instance) {
    instance = useGunSQLiteAdapter(sqliteService, dbVersionService, storageService);
  }
  return instance;
}

export default getGunSQLiteAdapter;