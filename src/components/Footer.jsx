import React from 'react';
import { Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { GithubOutlined, MailOutlined, WechatOutlined } from '@ant-design/icons';
import '../styles.css';

const { Title, Text } = Typography;

const Footer = () => {
  return (
    <div className="footer" style={{ background: '#f0f2f5', padding: '50px 0 20px' }}>
      <div className="container">
        <Row gutter={[32, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Title level={4} style={{ color: '#4a90e2', marginBottom: 16 }}>
                GoWeb
              </Title>
              <Text type="secondary">
                聚合各类官方网站，便捷访问
              </Text>
              <div style={{ marginTop: 16, display: 'flex', gap: 16, justifyContent: 'center' }}>
                <button type="button" style={{ background: 'none', border: 'none', color: '#666', fontSize: 20, cursor: 'pointer', padding: 0 }}>
                  <GithubOutlined />
                </button>
                <button type="button" style={{ background: 'none', border: 'none', color: '#666', fontSize: 20, cursor: 'pointer', padding: 0 }}>
                  <MailOutlined />
                </button>
                <button type="button" style={{ background: 'none', border: 'none', color: '#666', fontSize: 20, cursor: 'pointer', padding: 0 }}>
                  <WechatOutlined />
                </button>
              </div>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Title level={5} style={{ marginBottom: 16 }}>
                快速链接
              </Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                <Link to="/" style={{ color: '#666', fontSize: 14 }}>
                  首页
                </Link>
                <Link to="/about" style={{ color: '#666', fontSize: 14 }}>
                  关于我们
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #e8e8e8', textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            © 2026 Garmean官网通. 保留所有权利.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Footer;