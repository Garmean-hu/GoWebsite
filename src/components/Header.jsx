import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../styles.css';

const { Search } = Input;

function Header({ searchTerm, setSearchTerm }) {
  return (
    <div className="header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', maxWidth: '100%', boxSizing: 'border-box' }}>
        <div className="logo">
          <h1>Garmean官网通</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
          </ul>
        </nav>
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
      </div>
    </div>
  );
}

export default Header;