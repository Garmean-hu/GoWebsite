import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';

const { Content } = Layout;

// 主应用组件 - 路由配置
function App() {
  // 搜索状态管理
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Router>
      <Layout className="app">
        {/* 头部导航栏 */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* 页面内容区域 */}
        <Content>
          <Routes>
            {/* 首页 */}
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            
            {/* 关于我们页面 */}
            <Route path="/about" element={<About />} />
          </Routes>
        </Content>
        
        {/* 页脚 */}
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;