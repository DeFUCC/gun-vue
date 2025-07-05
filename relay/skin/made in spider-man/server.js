import express from "express";
import Gun from "gun";
import qr from "qr";
import ip from "ip";
import 'dotenv/config'
import setSelfAdjustingInterval from 'self-adjusting-interval';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';

/* global process */

// 配置文件路径
const CONFIG_FILE = './config.json';

// 读取配置文件
function readConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
      return JSON.parse(configData);
    }
  } catch (error) {
    console.log('⚠️ Error reading config file:', error.message);
  }
  
  // 默认配置
  return {
    store: false,
    super: false,
    version: "0.6.1",
    lastModified: new Date().toISOString()
  };
}

// 写入配置文件
function writeConfig(config) {
  try {
    config.lastModified = new Date().toISOString();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.log('❌ Error writing config file:', error.message);
    return false;
  }
}

// 导出store数据
function exportStoreData() {
  try {
    const storeData = {
      timestamp: Date.now(),
      files: [],
      data: {}
    };

    // 检查store目录是否存在
    if (fs.existsSync('./store')) {
      const files = fs.readdirSync('./store');
      
      files.forEach(file => {
        try {
          const filePath = path.join('./store', file);
          const stats = fs.statSync(filePath);
          
          if (stats.isFile()) {
            const content = fs.readFileSync(filePath, 'utf8');
            storeData.files.push({
              name: file,
              size: stats.size,
              modified: stats.mtime,
              content: content
            });
          }
        } catch (err) {
          console.log(`⚠️ Error reading file ${file}:`, err.message);
        }
      });
    }

    return storeData;
  } catch (error) {
    console.log('❌ Error exporting store data:', error.message);
    return null;
  }
}

// 清空store数据
function clearStoreData() {
  try {
    if (fs.existsSync('./store')) {
      const files = fs.readdirSync('./store');
      
      files.forEach(file => {
        try {
          const filePath = path.join('./store', file);
          fs.unlinkSync(filePath);
          console.log(`🗑️ Deleted: ${file}`);
        } catch (err) {
          console.log(`⚠️ Error deleting file ${file}:`, err.message);
        }
      });
      
      return true;
    }
    return true;
  } catch (error) {
    console.log('❌ Error clearing store data:', error.message);
    return false;
  }
}

// 获取目录大小（递归计算）
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  try {
    if (!fs.existsSync(dirPath)) {
      return 0;
    }
    
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    });
  } catch (error) {
    console.log('⚠️ Error calculating directory size:', error.message);
  }
  
  return totalSize;
}

// 获取磁盘空间信息
function getDiskSpace() {
  try {
    const platform = os.platform();
    let diskInfo = {};
    
    if (platform === 'win32') {
      // Windows
      try {
        const output = execSync('wmic logicaldisk get size,freespace,caption', { encoding: 'utf8' });
        const lines = output.trim().split('\n').slice(1);
        
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 3) {
            const drive = parts[0];
            const freeSpace = parseInt(parts[1]);
            const totalSpace = parseInt(parts[2]);
            
            if (!isNaN(freeSpace) && !isNaN(totalSpace)) {
              diskInfo[drive] = {
                total: totalSpace,
                free: freeSpace,
                used: totalSpace - freeSpace
              };
            }
          }
        });
      } catch (error) {
        console.log('⚠️ Error getting Windows disk info:', error.message);
      }
    } else {
      // Unix/Linux/macOS
      try {
        const output = execSync('df -k .', { encoding: 'utf8' });
        const lines = output.trim().split('\n');
        
        if (lines.length >= 2) {
          const parts = lines[1].split(/\s+/);
          if (parts.length >= 4) {
            const total = parseInt(parts[1]) * 1024; // Convert from KB to bytes
            const used = parseInt(parts[2]) * 1024;
            const free = parseInt(parts[3]) * 1024;
            
            diskInfo.current = {
              total: total,
              free: free,
              used: used,
              filesystem: parts[0],
              mountpoint: parts[parts.length - 1]
            };
          }
        }
      } catch (error) {
        console.log('⚠️ Error getting Unix disk info:', error.message);
      }
    }
    
    return diskInfo;
  } catch (error) {
    console.log('❌ Error getting disk space:', error.message);
    return {};
  }
}

// 获取存储使用情况
function getStorageUsage() {
  try {
    const storageInfo = {
      timestamp: Date.now(),
      platform: os.platform(),
      storeDirectory: {
        exists: fs.existsSync('./store'),
        size: 0,
        files: 0,
        details: []
      },
      diskSpace: getDiskSpace()
    };
    
    // 获取store目录信息
    if (storageInfo.storeDirectory.exists) {
      storageInfo.storeDirectory.size = getDirectorySize('./store');
      
      // 获取文件详情
      try {
        const files = fs.readdirSync('./store');
        storageInfo.storeDirectory.files = files.length;
        
        files.forEach(file => {
          try {
            const filePath = path.join('./store', file);
            const stats = fs.statSync(filePath);
            
            if (stats.isFile()) {
              storageInfo.storeDirectory.details.push({
                name: file,
                size: stats.size,
                modified: stats.mtime.toISOString(),
                type: 'file'
              });
            } else if (stats.isDirectory()) {
              storageInfo.storeDirectory.details.push({
                name: file,
                size: getDirectorySize(filePath),
                modified: stats.mtime.toISOString(),
                type: 'directory'
              });
            }
          } catch (err) {
            console.log(`⚠️ Error reading file ${file}:`, err.message);
          }
        });
        
        // 按大小排序
        storageInfo.storeDirectory.details.sort((a, b) => b.size - a.size);
      } catch (error) {
        console.log('⚠️ Error reading store directory:', error.message);
      }
    }
    
    return storageInfo;
  } catch (error) {
    console.log('❌ Error getting storage usage:', error.message);
    return null;
  }
}

const testPort = (port) => {
  return new Promise((resolve, reject) => {
    const server = express().listen(port, () => {
      server.close(() => resolve(true));
    }).on('error', () => resolve(false));
  });
};

export default {
  initiated: false,
  async init(config = {}) {
    if (this.initiated) return;
    this.initiated = true;

    // 读取配置文件
    const savedConfig = readConfig();
    console.log('📋 Loaded config:', savedConfig);

    let {
      host = process.env.RELAY_HOST || ip.address(),
      store = savedConfig.store || false,  // 从配置文件读取
      port = process.env.RELAY_PORT || 8765,
      path = process.env.RELAY_PATH || "public",
      showQr = true,  // 始终启用二维码
      super: superMode = savedConfig.super || false  // 从配置文件读取
    } = config;

    console.clear();
    console.log('=== GUN DATABASE SERVER ===\n');

    var app = express();

    // 配置API端点
    app.use(express.json());

    // 获取当前配置
    app.get('/api/config', (req, res) => {
      const currentConfig = readConfig();
      res.json(currentConfig);
    });

    // 更新配置
    app.post('/api/config', (req, res) => {
      const { store: newStore, super: newSuper } = req.body;
      const currentConfig = readConfig();
      
      if (typeof newStore !== 'undefined') {
        currentConfig.store = newStore;
      }
      
      if (typeof newSuper !== 'undefined') {
        currentConfig.super = newSuper;
      }
      
      if (writeConfig(currentConfig)) {
        res.json({ 
          success: true, 
          config: currentConfig,
          message: 'Configuration updated. Please restart the application for changes to take effect.'
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'Failed to write config file' 
        });
      }
    });

    // 导出数据端点
    app.get('/api/export', (req, res) => {
      const exportData = exportStoreData();
      if (exportData) {
        res.json({
          success: true,
          data: exportData
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to export data'
        });
      }
    });

    // 清空数据端点
    app.post('/api/clear', (req, res) => {
      if (clearStoreData()) {
        res.json({
          success: true,
          message: 'Store data cleared successfully'
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to clear store data'
        });
      }
    });

    // 获取存储使用情况端点
    app.get('/api/storage', (req, res) => {
      const storageInfo = getStorageUsage();
      if (storageInfo) {
        res.json({
          success: true,
          data: storageInfo
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to get storage usage'
        });
      }
    });

    // Explicit root route handling
    app.get('/', (req, res) => {
      res.sendFile('index.html', { root: path });
    });

    app.use(express.static(path));

    let currentPort = parseInt(port);
    while (!(await testPort(currentPort))) {
      console.log(`Port ${currentPort} in use, trying next...`);
      currentPort++;
    }

    var server = app.listen(currentPort);
    port = currentPort; // Update port for later use

    // Gun配置根据超级节点模式调整
    const gunConfig = {
      super: superMode,  // 超级节点模式
      file: store ? "store" : false,  // 根据配置启用存储
      radisk: store,
      web: server,
    };

    console.log('🔧 Gun configuration:', gunConfig);
    const gun = Gun(gunConfig);

    const link = "http://" + host + (port ? ":" + port : "");
    const extLink = "https://" + host;
    let totalConnections = 0;
    let activeWires = 0;

    const db = gun.get('relays').get(host);

    setSelfAdjustingInterval(() => {
      db.get("pulse").put(Date.now());
    }, 500);

    gun.on("hi", () => {
      totalConnections += 1;
      db.get("totalConnections").put(totalConnections);
      activeWires += 1;
      db.get("activeWires").put(activeWires);
      console.log(`🔗 Connection opened (active: ${activeWires})`);
    });

    gun.on("bye", () => {
      activeWires -= 1;
      db.get("activeWires").put(activeWires);
      console.log(`🔗 Connection closed (active: ${activeWires})`);
    });

    db.get("host").put(host);
    db.get("port").put(port);
    db.get("link").put(link);
    db.get("ext-link").put(extLink);
    db.get("store").put(store);
    db.get("super").put(superMode);
    db.get("status").put("running");
    db.get("started").put(Date.now());

    console.log(`🌐 Internal URL: ${link}/`);
    console.log(`🌐 External URL: ${extLink}/`);
    console.log(`🔫 Gun peer: ${link}/gun`);
    console.log(`💾 Storage: ${store ? 'enabled' : 'disabled'}`);
    console.log(`⚡ Super node: ${superMode ? 'enabled (read-only)' : 'disabled'}`);

    // 始终显示二维码
    console.log('\n=== QR CODE ===');
    console.log(qr(link, 'ascii', { border: 1 }))
    console.log('===============\n');

    // 超级节点模式提示
    if (superMode) {
      console.log('⚡ SUPER NODE MODE ENABLED');
      console.log('   - Provides STUN/TURN-like functionality');
      console.log('   - Database is READ-ONLY');
      console.log('   - Helps other peers with NAT traversal\n');
    }

    return { app, db, config: savedConfig };
  },
};