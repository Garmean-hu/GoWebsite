import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { authService } from '../services/auth';
import '../styles.css';

const { Search } = Input;

function Header({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', maxWidth: '100%', boxSizing: 'border-box' }}>
        <div className="logo">
          <h1>GoWeb</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
            {user && (
              <li><Link to="/dashboard">个人中心</Link></li>
            )}
          </ul>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="search-container">
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
          <Space>
            {user ? (
              <>
                <span style={{ marginRight: '10px' }}>欢迎, {user.email}</span>
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