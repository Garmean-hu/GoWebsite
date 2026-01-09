import React from 'react';
import { Layout, Menu, Button, Typography, Card } from 'antd';
import { UserOutlined, DashboardOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard = ({ currentUser, onLogout }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>管理系统</Title>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>欢迎, {currentUser}</span>
          <Button 
            type="primary" 
            icon={<LogoutOutlined />}
            onClick={onLogout}
          >
            退出登录
          </Button>
        </div>
      </Header>
      
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '1',
                icon: <DashboardOutlined />,
                label: '仪表板',
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: '用户管理',
              }
            ]}
          />
        </Sider>
        
        <Content style={{ padding: '24px' }}>
          <Card title="欢迎使用系统">
            <p>这是一个简单的登录系统示例。</p>
            <p>当前用户: <strong>{currentUser}</strong></p>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;