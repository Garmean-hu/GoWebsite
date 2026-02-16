import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { authService } from '../services/auth';
import '../styles.css';

const { Search } = Input;

function Header({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate('/');
    } catch (error) {
      console.error('退出登录失败:', error);
    }
  };

  return (
    <div className="header">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 15px', 
        maxWidth: '100%', 
        boxSizing: 'border-box',
        flexWrap: 'wrap'
      }}>
        <div className="logo" style={{ marginBottom: isMobile ? '10px' : 0 }}>
          <h1>GoWeb</h1>
        </div>
        <nav className="nav" style={{ marginBottom: isMobile ? '10px' : 0 }}>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
            {user && (
              <li><Link to="/dashboard">个人中心</Link></li>
            )}
          </ul>
        </nav>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          width: isMobile ? '100%' : 'auto'
        }}>
          <div className="search-container" style={{ marginBottom: isMobile ? '10px' : 0, width: isMobile ? '100%' : 'auto' }}>
            <Search
              placeholder="搜索网站..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', maxWidth: 300 }}
            />
          </div>
          <Space style={{ width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'flex-end' : 'flex-start' }}>
            {user ? (
              <>
                {!isMobile && <span style={{ marginRight: '10px' }}>欢迎, {user.email}</span>}
                <Button 
                  type="primary" 
                  icon={<LogoutOutlined />} 
                  onClick={handleLogout}
                >
                  退出
                </Button>
              </>
            ) : (
              <>
                <Button type="default">
                  <Link to="/login">登录</Link>
                </Button>
                <Button type="primary">
                  <Link to="/register">注册</Link>
                </Button>
              </>
            )}
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Header;