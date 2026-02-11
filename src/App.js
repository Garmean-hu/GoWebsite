import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import { authService } from './services/auth';
import './styles.css';

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // 更新状态，下次渲染时显示备用UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 显示备用UI
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>发生了错误</h1>
          <p>很抱歉，应用程序遇到了问题。</p>
          <p>错误信息: {this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()}>
            刷新页面
          </button>
        </div>
      );
    }

    // 正常渲染子组件
    return this.props.children;
  }
}

// 主应用组件 - 路由配置
function App() {
  // 搜索状态管理
  const [searchTerm, setSearchTerm] = useState('');
  // 认证状态管理
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 初始化认证状态
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('获取用户信息失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
    
    // 监听认证状态变化
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  // 受保护的路由组件
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>加载中...</div>;
    }
    
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };
  
  return (
    <ErrorBoundary>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* 头部导航栏 - 独立于Content，可全屏扩展 */}
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            user={user}
          />
          
          {/* 页面内容区域 */}
          <div className="container" style={{ flex: 1, padding: '20px 0' }}>
            <Routes>
              {/* 首页 */}
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              
              {/* 关于我们页面 */}
              <Route path="/about" element={<About />} />
              

              
              {/* 登录页面 */}
              <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
              
              {/* 注册页面 */}
              <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
              
              {/* 仪表板页面 - 受保护 */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard currentUser={user} />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
          
          {/* 页脚 */}
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;