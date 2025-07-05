import server from "./server.js";

console.log('🚀 启动 Gun-Ollama 集成服务器...\n');

// 启动集成了Gun Relay和Ollama API的智能服务器
server.init().then(() => {
  console.log('\n🎉 服务器启动完成！');
  console.log('\n💡 使用说明:');
  console.log('  - Gun Relay: WebSocket实时数据同步');
  console.log('  - Ollama API: 智能AI模型访问（支持多种连接方式）');
  console.log('  - 统一端口: 8765');
  console.log('  - 状态查询: GET /api/status');
  console.log('\n📚 API 端点:');
  console.log('  - GET  /api/models     - 获取模型列表');
  console.log('  - POST /api/chat       - 聊天对话');
  console.log('  - POST /api/generate   - 文本生成');
  console.log('  - GET  /api/status     - 服务状态');
}).catch(error => {
  console.error('❌ 服务器启动失败:', error);
  process.exit(1);
});

