import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';

// 主应用组件 - 路由配置
function App() {
  // 搜索状态管理
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* 头部导航栏 - 独立于Content，可全屏扩展 */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* 页面内容区域 */}
        <div className="container" style={{ flex: 1, padding: '20px 0' }}>
          <Routes>
            {/* 首页 */}
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            
            {/* 关于我们页面 */}
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        
        {/* 页脚 */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;