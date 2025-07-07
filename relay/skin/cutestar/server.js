// Node.js polyfills for browser APIs
import XMLHttpRequest from 'xmlhttprequest';
import fetch, { Headers, Request, Response } from 'node-fetch';

// Make XMLHttpRequest available globally
global.XMLHttpRequest = XMLHttpRequest.XMLHttpRequest;
// Make fetch available globally with proper polyfill
if (!global.fetch) {
  global.fetch = fetch;
  global.Headers = Headers;
  global.Request = Request;
  global.Response = Response;
}

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
import cors from "cors";
import { Ollama } from "ollama";
import { networkInterfaces } from "os";
import { exec } from 'child_process';
import { promisify } from 'util';

// 原生Fetch API类 - 绕过SDK问题的备用方案
class NativeOllamaAPI {
  constructor(host, timeout = 60000) {
    this.host = host.endsWith('/') ? host.slice(0, -1) : host;
    this.timeout = timeout;
    console.log(`🔧 初始化原生Ollama API (绕过SDK): ${this.host}`);
  }

  async request(endpoint, options = {}) {
    const url = `${this.host}${endpoint}`;
    const requestOptions = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Gun-Ollama-Relay/1.0-Native',
        ...options.headers
      },
      ...options
    };

    console.log(`📡 原生API请求: ${options.method || 'GET'} ${url}`);
    
    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // 如果是流式请求，直接返回响应对象
      if (options.stream) {
        return response;
      }
      
      return await response.json();
    } catch (error) {
      console.error(`❌ 原生API请求失败 ${url}:`, error.message);
      throw error;
    }
  }

  // 流式响应解析器 - 兼容Node.js和浏览器环境
  async *parseStreamResponse(response) {
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      // Node.js环境兼容性处理
      if (response.body.getReader) {
        // 浏览器环境或支持getReader的Node.js fetch
        const reader = response.body.getReader();
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            
            // 保留最后一行，可能不完整
            buffer = lines.pop() || '';
            
            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed) {
                try {
                  const parsed = JSON.parse(trimmed);
                  yield parsed;
                } catch (e) {
                  // 忽略解析错误的行
                  console.warn('解析流式响应行失败:', trimmed);
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      } else if (response.body && typeof response.body[Symbol.asyncIterator] === 'function') {
        // Node.js环境 - 使用AsyncIterator
        console.log('🔄 使用Node.js AsyncIterator处理流式响应');
        
        for await (const chunk of response.body) {
          buffer += decoder.decode(chunk, { stream: true });
          const lines = buffer.split('\n');
          
          // 保留最后一行，可能不完整
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed) {
              try {
                const parsed = JSON.parse(trimmed);
                yield parsed;
              } catch (e) {
                // 忽略解析错误的行
                console.warn('解析流式响应行失败:', trimmed);
              }
            }
          }
        }
      } else {
        // 备用方案：尝试读取整个响应
        console.warn('⚠️ 不支持流式读取，回退到完整响应模式');
        const text = await response.text();
        const lines = text.trim().split('\n');
        
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed) {
            try {
              const parsed = JSON.parse(trimmed);
              yield parsed;
            } catch (e) {
              console.warn('解析响应行失败:', trimmed);
            }
          }
        }
      }
      
      // 处理缓冲区中剩余的数据
      if (buffer.trim()) {
        try {
          const parsed = JSON.parse(buffer.trim());
          yield parsed;
        } catch (e) {
          console.warn('解析最后的流式响应失败:', buffer);
        }
      }
    } catch (error) {
      console.error('❌ 流式响应解析错误:', error);
      throw error;
    }
  }

  async list() {
    console.log('🔄 获取模型列表 (原生API)');
    const result = await this.request('/api/tags');
    return { models: result.models || [] };
  }

  async chat(options) {
    console.log(`🔄 聊天请求 (原生API): 模型 ${options.model}${options.stream ? ' [流式]' : ''}`);
    
    if (options.stream) {
      const response = await this.request('/api/chat', {
        method: 'POST',
        body: JSON.stringify(options),
        stream: true
      });
      return this.parseStreamResponse(response);
    } else {
      return await this.request('/api/chat', {
        method: 'POST',
        body: JSON.stringify(options)
      });
    }
  }

  async generate(options) {
    console.log(`🔄 生成请求 (原生API): 模型 ${options.model}${options.stream ? ' [流式]' : ''}`);
    
    if (options.stream) {
      const response = await this.request('/api/generate', {
        method: 'POST',
        body: JSON.stringify(options),
        stream: true
      });
      return this.parseStreamResponse(response);
    } else {
      return await this.request('/api/generate', {
        method: 'POST',
        body: JSON.stringify(options)
      });
    }
  }

  async show(options) {
    console.log(`🔄 模型信息 (原生API): ${options.model}`);
    return await this.request('/api/show', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }

  async create(options) {
    console.log(`🔄 创建模型 (原生API): ${options.model}${options.stream ? ' [流式]' : ''}`);
    
    if (options.stream) {
      const response = await this.request('/api/create', {
        method: 'POST',
        body: JSON.stringify(options),
        stream: true
      });
      return this.parseStreamResponse(response);
    } else {
      return await this.request('/api/create', {
        method: 'POST',
        body: JSON.stringify(options)
      });
    }
  }

  async pull(options) {
    console.log(`🔄 拉取模型 (原生API): ${options.model}${options.stream ? ' [流式]' : ''}`);
    
    if (options.stream) {
      const response = await this.request('/api/pull', {
        method: 'POST',
        body: JSON.stringify(options),
        stream: true
      });
      return this.parseStreamResponse(response);
    } else {
      return await this.request('/api/pull', {
        method: 'POST',
        body: JSON.stringify(options)
      });
    }
  }

  async push(options) {
    console.log(`🔄 推送模型 (原生API): ${options.model}${options.stream ? ' [流式]' : ''}`);
    
    if (options.stream) {
      const response = await this.request('/api/push', {
        method: 'POST',
        body: JSON.stringify(options),
        stream: true
      });
      return this.parseStreamResponse(response);
    } else {
      return await this.request('/api/push', {
        method: 'POST',
        body: JSON.stringify(options)
      });
    }
  }

  async delete(options) {
    console.log(`🔄 删除模型 (原生API): ${options.model}`);
    return await this.request('/api/delete', {
      method: 'DELETE',
      body: JSON.stringify(options)
    });
  }

  async copy(options) {
    console.log(`🔄 复制模型 (原生API): ${options.source} -> ${options.destination}`);
    return await this.request('/api/copy', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }

  async embeddings(options) {
    console.log(`🔄 生成嵌入 (原生API): ${options.model}`);
    return await this.request('/api/embeddings', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
}

const execAsync = promisify(exec);

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

// 获取局域网 IP 地址
function getLocalIPAddress() {
  const interfaces = networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 筛选 IPv4 地址，排除回环地址 (127.0.0.1)
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "0.0.0.0"; 
}

// 测试 Ollama 连接的辅助函数
async function testOllamaConnection(host) {
  try {
    console.log(`🔍 测试连接到: ${host}`);
    
    // 使用原生 fetch 进行简单的连通性测试
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
    
    const response = await fetch(`${host}/api/version`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const version = await response.json();
      console.log(`✅ 连接成功，Ollama 版本: ${version.version || 'unknown'}`);
      return true;
    } else {
      console.log(`❌ HTTP错误: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ 连接失败: ${error.message}`);
    return false;
  }
}

// 测试多个可能的 Ollama 地址
async function findWorkingOllamaHost() {
  const localIP = getLocalIPAddress();
  const possibleHosts = [
    process.env.OLLAMA_HOST,
    "http://localhost:11434",
    "http://127.0.0.1:11434",
    `http://${localIP}:11434`,
    "http://0.0.0.0:11434",
    "https://lzcollama.ponzs.heiyu.space",
    "http://baota.ponzs.heiyu.space:11434",
    "https://api.talkflow.team",
    "https://a.talkflow.team",
    // Docker 内部地址
    "http://host.docker.internal:11434",
    "http://172.17.0.1:11434",
    "http://172.18.0.1:11434",
    // 其他常见内网地址
    "http://192.168.1.1:11434",
    "http://10.0.0.1:11434"
  ].filter(Boolean); // 过滤掉 undefined

  console.log('🔍 尝试连接以下 Ollama 地址:');
  possibleHosts.forEach((host, index) => {
    console.log(`  ${index + 1}. ${host}`);
  });

  for (const host of possibleHosts) {
    const isConnected = await testOllamaConnection(host);
    if (isConnected) {
      console.log(`🎯 找到可用的 Ollama 服务: ${host}`);
      return host;
    }
  }
  
  console.log('❌ 所有 HTTP 地址都不可用');
  return null;
}

// 测试 Ollama CLI 可用性
async function testOllamaCLI() {
  try {
    console.log('🔍 测试 Ollama CLI 可用性...');
    const { stdout } = await execAsync('ollama --version', { timeout: 5000 });
    console.log(`✅ CLI 可用: ${stdout.trim()}`);
    return true;
  } catch (error) {
    console.log(`❌ CLI 不可用: ${error.message}`);
    return false;
  }
}

// 通过 CLI 获取模型列表
async function getModelsViaCLI() {
  try {
    const { stdout } = await execAsync('ollama list', { timeout: 10000 });
    const lines = stdout.trim().split('\n').slice(1); // 跳过标题行
    const models = lines
      .filter(line => line.trim()) // 过滤空行
      .map(line => {
        const parts = line.split(/\s+/);
        return {
          name: parts[0],
          modified_at: parts[1] || '',
          size: parts[2] || '',
          digest: parts[3] || ''
        };
      });
    return { models };
  } catch (error) {
    throw new Error(`CLI List Error: ${error.message}`);
  }
}

// 通过 CLI 进行聊天对话
async function chatViaCLI(model, messages, stream = false) {
  try {
    // 构建提示 - 使用最后一个用户消息
    const lastMessage = messages[messages.length - 1];
    const prompt = lastMessage.content.replace(/"/g, '\\"').replace(/\$/g, '\\$');
    
    // 使用 ollama run 命令
    const { stdout } = await execAsync(`echo "${prompt}" | ollama run ${model}`, { 
      timeout: 60000,
      maxBuffer: 1024 * 1024,
      shell: '/bin/bash'
    });
    
    const response = {
      message: {
        role: 'assistant',
        content: stdout.trim()
      },
      done: true
    };

    // 如果需要流式响应，使用模拟流式处理器
    if (stream) {
      return CLIStreamProcessor.simulateStreamResponse(response.message.content, 50, false); // isGenerate = false
    } else {
      return response;
    }
  } catch (error) {
    throw new Error(`CLI Chat Error: ${error.message}`);
  }
}

// 通过 CLI 生成文本
async function generateViaCLI(model, prompt, stream = false) {
  try {
    const cleanPrompt = prompt.replace(/"/g, '\\"').replace(/\$/g, '\\$');
    
    const { stdout } = await execAsync(`echo "${cleanPrompt}" | ollama run ${model}`, { 
      timeout: 60000,
      maxBuffer: 1024 * 1024,
      shell: '/bin/bash'
    });
    
    const content = stdout.trim();
    
    // 如果需要流式响应，使用模拟流式处理器
    if (stream) {
      return CLIStreamProcessor.simulateStreamResponse(content, 50, true); // isGenerate = true
    } else {
      return {
        response: content,
        done: true
      };
    }
  } catch (error) {
    throw new Error(`CLI Generate Error: ${error.message}`);
  }
}

// 增强的CLI流式处理 - 模拟流式响应
class CLIStreamProcessor {
  static async *simulateStreamResponse(fullResponse, delay = 50, isGenerate = false) {
    const words = fullResponse.split(/(\s+)/);
    let accumulated = '';
    
    for (let i = 0; i < words.length; i++) {
      accumulated += words[i];
      
      // 每几个词发送一个流式片段
      if (i % 3 === 0 || i === words.length - 1) {
        if (isGenerate) {
          // generate API 格式
          yield {
            response: accumulated,
            done: i === words.length - 1
          };
        } else {
          // chat API 格式
          yield {
            message: {
              role: 'assistant',
              content: accumulated
            },
            done: i === words.length - 1
          };
        }
        
        if (i < words.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
  }
}

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
      super: superMode = savedConfig.super || false,  // 从配置文件读取
      // Ollama配置
      ollamaHost = process.env.OLLAMA_HOST || "http://localhost:11434"
    } = config;

    console.clear();
    console.log('=== GUN DATABASE SERVER WITH ENHANCED OLLAMA API ===');
    console.log('🛡️ 支持SDK绕过模式 - 解决服务器连接问题');
    console.log('🔄 多重备用方案 - SDK/原生API/CLI/直接调用');
    console.log('🌊 全面流式支持 - 所有连接模式均支持流式消息');
    console.log('⚡ 智能降级 - CLI模式提供模拟流式体验\n');

    var app = express();

    // 启用CORS和JSON解析 - 为Ollama API添加
    app.use(cors()); 
    app.use(express.json()); 

    // 错误处理中间件
    app.use((err, req, res, next) => {
      console.error('Server Error:', err.stack);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    });

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

    // 寻找可用的 Ollama 服务
    console.log('\n🚀 开始智能搜索 Ollama 服务...\n');
    const workingHost = await findWorkingOllamaHost();
    
    let ollama = null;
    let useCLI = false;
    let activeOllamaHost = workingHost || ollamaHost;

    if (workingHost) {
      console.log(`\n✅ 找到可用的 HTTP 服务: ${workingHost}`);
      
      // 尝试初始化 Ollama SDK - 优化配置
      try {
        console.log('🔧 正在初始化 Ollama SDK...');
        
        // 针对远程API的特殊配置
        const isRemoteAPI = workingHost.startsWith('https://') || workingHost.includes('talkflow.team');
        const ollamaConfig = {
          host: workingHost,
          fetch: global.fetch,
          timeout: isRemoteAPI ? 60000 : 30000, // 远程API使用更长超时
        };
        
        console.log(`📡 SDK配置: ${JSON.stringify(ollamaConfig, null, 2)}`);
        
        ollama = new Ollama(ollamaConfig);
        
        // 添加重试机制测试连接
        let retryCount = 0;
        const maxRetries = isRemoteAPI ? 3 : 1;
        
        while (retryCount <= maxRetries) {
          try {
            console.log(`🔄 尝试连接 SDK (第 ${retryCount + 1}/${maxRetries + 1} 次)...`);
            
            const models = await ollama.list();
            console.log(`✅ Ollama SDK 连接成功，可用模型数量: ${models.models?.length || 0}`);
            if (models.models && models.models.length > 0) {
              const modelNames = models.models.map(m => m.name).slice(0, 5); // 只显示前5个
              console.log(`📋 可用模型 (前5个): ${modelNames.join(', ')}${models.models.length > 5 ? '...' : ''}`);
            }
            activeOllamaHost = workingHost;
            break; // 成功则退出重试循环
            
          } catch (retryError) {
            retryCount++;
            console.log(`❌ 第 ${retryCount} 次尝试失败: ${retryError.message}`);
            
            if (retryCount <= maxRetries) {
              const waitTime = retryCount * 2000; // 递增等待时间
              console.log(`⏱️ 等待 ${waitTime}ms 后重试...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
            } else {
              throw retryError; // 超过最大重试次数，抛出错误
            }
          }
        }
        
      } catch (error) {
        console.error('❌ Ollama SDK 连接失败:', error.message);
        console.log('📊 错误详情:', {
          errorType: error.constructor.name,
          errorCode: error.code,
          timeout: error.message.includes('timeout') || error.message.includes('Aborted'),
          network: error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')
        });
        console.log('🚀 尝试原生API模式 (绕过SDK)...');
        
        // 使用原生API作为备用方案
        try {
          ollama = new NativeOllamaAPI(workingHost, 60000);
          const models = await ollama.list();
          console.log(`✅ 原生API连接成功，可用模型数量: ${models.models?.length || 0}`);
          if (models.models && models.models.length > 0) {
            const modelNames = models.models.map(m => m.name).slice(0, 5);
            console.log(`📋 可用模型 (前5个): ${modelNames.join(', ')}${models.models.length > 5 ? '...' : ''}`);
          }
          activeOllamaHost = workingHost;
          console.log('🛡️ 成功绕过SDK问题，使用原生API模式');
        } catch (nativeError) {
          console.error('❌ 原生API也失败:', nativeError.message);
          console.log('🔄 将尝试 CLI 模式...');
          ollama = null;
        }
      }
    }

    // 如果 HTTP API 不可用，尝试 CLI 模式
    if (!ollama) {
      console.log('\n🔧 尝试 CLI 备用模式...');
      const cliWorks = await testOllamaCLI();
      
      if (cliWorks) {
        try {
          const testModels = await getModelsViaCLI();
          console.log(`✅ CLI 模式工作正常，模型数量: ${testModels.models?.length || 0}`);
          if (testModels.models && testModels.models.length > 0) {
            console.log(`📋 CLI 可用模型: ${testModels.models.map(m => m.name).join(', ')}`);
          }
          useCLI = true;
        } catch (error) {
          console.error('❌ CLI 模式失败:', error.message);
        }
      }
    }

    if (!ollama && !useCLI) {
      console.log('\n❌ 警告: 所有 Ollama 连接方式都不可用');
      console.log('   - HTTP API: 无法连接');
      console.log('   - CLI 模式: 不可用');
      console.log('   - 服务将启动，但 Ollama 功能将不可用');
    }

    // === OLLAMA API 路由 ===
    
    // 检查 Ollama 连接的中间件
    const checkOllamaConnection = (req, res, next) => {
      if (!ollama && !useCLI) {
        return res.status(503).json({ 
          error: "Ollama 服务不可用",
          details: "HTTP API 和 CLI 模式都不可用",
          hint: "请检查 Ollama 是否正确安装和运行",
          attempted_hosts: [
            "HTTP API: 已尝试多个地址",
            "CLI 模式: 已尝试 ollama 命令"
          ]
        });
      }
      next();
    };
    
    // 获取可用模型列表
    app.get("/api/models", async (req, res) => {
      try {
        let result;
        const isNativeAPI = ollama instanceof NativeOllamaAPI;
        
        if (ollama) {
          const apiType = isNativeAPI ? '原生API' : 'Ollama SDK';
          console.log(`🔄 使用 ${apiType} 获取模型列表`);
          const response = await ollama.list();
          result = response.models;
        } else if (useCLI) {
          console.log('🔄 使用 CLI 模式获取模型列表');
          const response = await getModelsViaCLI();
          result = response.models;
        } else {
          throw new Error('所有连接方式都不可用');
        }
        
        res.json(result || []);
      } catch (error) {
        console.error('Models API Error:', error);
        const isNativeAPI = ollama instanceof NativeOllamaAPI;
        res.status(500).json({ 
          error: error.message,
          hint: "请检查 Ollama 服务是否正常运行",
          mode: ollama ? (isNativeAPI ? 'Native API' : 'Ollama SDK') : (useCLI ? 'CLI' : 'none'),
          available_fallbacks: {
            sdk: !!ollama && !isNativeAPI,
            native_api: !!ollama && isNativeAPI,
            cli: useCLI
          }
        });
      }
    });

    // 生成文本（chat completions）
    app.post("/api/chat", checkOllamaConnection, async (req, res) => {
      const { model, messages, stream = false, options = {} } = req.body;
      try {
        if (ollama) {
          const isNativeAPI = ollama instanceof NativeOllamaAPI;
          const apiType = isNativeAPI ? '原生API' : 'Ollama SDK';
          console.log(`🔄 使用 ${apiType} 进行对话 (模型: ${model})${stream ? ' [流式]' : ''}`);
          
          if (stream) {
            // 流式响应
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            const response = await ollama.chat({
              model,
              messages,
              stream: true,
              options,
            });

            for await (const part of response) {
              res.write(`data: ${JSON.stringify(part)}\n\n`);
            }
            res.end();
          } else {
            // 非流式响应
            const response = await ollama.chat({
              model,
              messages,
              options,
            });
            res.json(response);
          }
        } else if (useCLI) {
          console.log(`🔄 使用 CLI 模式进行对话 (模型: ${model})${stream ? ' [模拟流式]' : ''}`);
          
          if (stream) {
            // CLI 模拟流式响应
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            const streamResponse = await chatViaCLI(model, messages, true);
            for await (const part of streamResponse) {
              res.write(`data: ${JSON.stringify(part)}\n\n`);
            }
            res.end();
          } else {
            // CLI 非流式响应
            const response = await chatViaCLI(model, messages, false);
            res.json(response);
          }
        }
      } catch (error) {
        console.error('Chat API Error:', error);
        const isNativeAPI = ollama instanceof NativeOllamaAPI;
        res.status(500).json({ 
          error: error.message,
          model: model,
          mode: ollama ? (isNativeAPI ? 'Native API' : 'Ollama SDK') : (useCLI ? 'CLI' : 'none'),
          hint: "请检查模型名称是否正确，以及 Ollama 服务状态"
        });
      }
    });

    // 生成文本（generate completions）
    app.post("/api/generate", checkOllamaConnection, async (req, res) => {
      const { model, prompt, stream = false, options = {} } = req.body;
      try {
        if (ollama) {
          const isNativeAPI = ollama instanceof NativeOllamaAPI;
          const apiType = isNativeAPI ? '原生API' : 'Ollama SDK';
          console.log(`🔄 使用 ${apiType} 生成文本 (模型: ${model})${stream ? ' [流式]' : ''}`);
          
          if (stream) {
            // 流式响应
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            const response = await ollama.generate({
              model,
              prompt,
              stream: true,
              options,
            });

            for await (const part of response) {
              res.write(`data: ${JSON.stringify(part)}\n\n`);
            }
            res.end();
          } else {
            // 非流式响应
            const response = await ollama.generate({
              model,
              prompt,
              options,
            });
            res.json(response);
          }
        } else if (useCLI) {
          console.log(`🔄 使用 CLI 模式生成文本 (模型: ${model})${stream ? ' [模拟流式]' : ''}`);
          
          if (stream) {
            // CLI 模拟流式响应
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            const streamResponse = await generateViaCLI(model, prompt, true);
            for await (const part of streamResponse) {
              res.write(`data: ${JSON.stringify(part)}\n\n`);
            }
            res.end();
          } else {
            // CLI 非流式响应
            const response = await generateViaCLI(model, prompt, false);
            res.json(response);
          }
        }
      } catch (error) {
        console.error('Generate API Error:', error);
        const isNativeAPI = ollama instanceof NativeOllamaAPI;
        res.status(500).json({ 
          error: error.message,
          model: model,
          mode: ollama ? (isNativeAPI ? 'Native API' : 'Ollama SDK') : (useCLI ? 'CLI' : 'none'),
          hint: "请检查模型名称是否正确，以及 Ollama 服务状态"
        });
      }
    });

    // 获取服务状态
    app.get("/api/status", (req, res) => {
      const isNativeAPI = ollama instanceof NativeOllamaAPI;
      res.json({
        service: "Gun-Ollama Relay (Enhanced Stream Support)",
        gun_relay: {
          status: "running",
          port: port,
          host: host
        },
        ollama: {
          connection_mode: ollama ? (isNativeAPI ? "Native API (SDK Bypass)" : "Ollama SDK") : (useCLI ? "CLI Mode" : "Unavailable"),
          http_api: {
            available: !!ollama,
            host: ollama ? activeOllamaHost : null,
            sdk_bypassed: isNativeAPI,
            streaming_support: !!ollama // 所有HTTP API模式都支持流式
          },
          cli_mode: {
            available: useCLI,
            status: useCLI ? "active" : "unavailable",
            streaming_support: useCLI, // CLI现在也支持模拟流式
            streaming_type: useCLI ? "simulated" : null
          },
          overall_status: ollama ? (isNativeAPI ? "Native API" : "SDK") : (useCLI ? "CLI Mode" : "Unavailable"),
          fallback_ready: !!workingHost, // 表示有备用连接可用
          streaming_capabilities: {
            sdk_mode: "full_streaming",
            native_api_mode: "full_streaming", 
            cli_mode: "simulated_streaming"
          }
        },
        features: {
          streaming_support: "universal", // 所有模式都支持
          multiple_fallbacks: true,
          real_time_streaming: ollama ? true : false,
          simulated_streaming: useCLI ? true : false
        },
        endpoints: {
          models: "/api/models",
          chat: "/api/chat (streaming supported)", 
          generate: "/api/generate (streaming supported)",
          status: "/api/status"
        }
      });
    });

    // 获取Gun数据库实时状态 - 专门为前端提供连接统计信息
    app.get("/api/gun-stats", (req, res) => {
      try {
        // 尝试从Gun数据库获取所有可能的主机数据
        const stats = {
          timestamp: Date.now(),
          hosts: {},
          summary: {
            totalConnections: 0,
            activeWires: 0,
            pulse: 0,
            started: 0,
            status: 'running',
            store: store,
            super: superMode,
            host: host,
            port: port,
            link: link,
            uptime: 0
          }
        };

        // 添加当前主机的统计信息
        stats.hosts[host] = {
          totalConnections: totalConnections,
          activeWires: activeWires,
          pulse: Date.now(),
          started: Date.now() - (process.uptime() * 1000),
          status: 'running',
          store: store,
          super: superMode,
          host: host,
          port: port,
          link: link
        };

        // 设置摘要信息
        stats.summary.totalConnections = totalConnections;
        stats.summary.activeWires = activeWires;
        stats.summary.pulse = Date.now();
        stats.summary.started = Date.now() - (process.uptime() * 1000);
        stats.summary.uptime = process.uptime();

        res.json({
          success: true,
          data: stats
        });
      } catch (error) {
        console.error('Gun stats error:', error);
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });

    // === Gun Relay 路由 ===
    
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

    // 创建多个数据库引用，支持不同的主机标识符
    const primaryDb = gun.get('relays').get(host);
    const alternativeDbRefs = [];
    
    // 添加可能的主机别名
    const hostAliases = [
      host,
      `${host}:${port}`,
      'localhost',
      '127.0.0.1',
      getLocalIPAddress()
    ].filter((h, index, arr) => h && arr.indexOf(h) === index); // 去重
    
    console.log('📡 将数据存储到多个主机标识符:', hostAliases);
    
    hostAliases.forEach(alias => {
      if (alias !== host) {
        alternativeDbRefs.push(gun.get('relays').get(alias));
      }
    });

    // 统一数据更新函数
    const updateAllDbs = (key, value) => {
      primaryDb.get(key).put(value);
      alternativeDbRefs.forEach(db => {
        db.get(key).put(value);
      });
    };

    setSelfAdjustingInterval(() => {
      const pulse = Date.now();
      updateAllDbs("pulse", pulse);
    }, 500);

    gun.on("hi", () => {
      totalConnections += 1;
      activeWires += 1;
      updateAllDbs("totalConnections", totalConnections);
      updateAllDbs("activeWires", activeWires);
      console.log(`🔗 Connection opened (active: ${activeWires})`);
    });

    gun.on("bye", () => {
      activeWires -= 1;
      updateAllDbs("activeWires", activeWires);
      console.log(`🔗 Connection closed (active: ${activeWires})`);
    });

    // 初始化所有数据库的基本信息
    const initData = {
      "host": host,
      "port": port,
      "link": link,
      "ext-link": extLink,
      "store": store,
      "super": superMode,
      "status": "running",
      "started": Date.now(),
      "totalConnections": totalConnections,
      "activeWires": activeWires
    };
    
    Object.entries(initData).forEach(([key, value]) => {
      updateAllDbs(key, value);
    });

    const localIP = getLocalIPAddress();
    
    console.log('\n' + '='.repeat(50));
    console.log('🚀 增强版服务启动完成！(全面流式支持)');
    console.log('='.repeat(50));
    console.log(`🌐 Internal URL: ${link}/`);
    console.log(`🌐 External URL: ${extLink}/`);
    console.log(`🔫 Gun peer: ${link}/gun`);
    console.log(`🤖 Ollama API: ${link}/api/`);
    console.log(`📡 LAN Access: http://${localIP}:${port}/`);
    console.log('='.repeat(50));
    console.log('📊 Ollama 连接状态:');
    if (ollama) {
      const isNativeAPI = ollama instanceof NativeOllamaAPI;
      if (isNativeAPI) {
        console.log(`✅ 原生API模式: ${activeOllamaHost}`);
        console.log(`🛡️ 绕过SDK问题: 成功`);
        console.log(`🌊 流式支持: 完整流式响应`);
      } else {
        console.log(`✅ Ollama SDK模式: ${activeOllamaHost}`);
        console.log(`🔧 SDK状态: 正常`);
        console.log(`🌊 流式支持: 完整流式响应`);
      }
    } else if (useCLI) {
      console.log(`✅ CLI 模式: 本地 ollama 命令行`);
      console.log(`🌊 流式支持: 模拟流式响应`);
    } else {
      console.log(`❌ 未连接: 所有模式都不可用`);
    }
    console.log(`💾 Storage: ${store ? 'enabled' : 'disabled'}`);
    console.log(`⚡ Super node: ${superMode ? 'enabled (read-only)' : 'disabled'}`);
    console.log('🔄 流式消息: 全模式支持 (SDK✓ 原生API✓ CLI模拟✓)');
    console.log('='.repeat(50));

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

    return { app, db: primaryDb, config: savedConfig };
  },
};