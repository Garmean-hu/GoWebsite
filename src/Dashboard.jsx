import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Card, List, Avatar, Tag, message } from 'antd';
import { UserOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authService } from './services/auth';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = ({ currentUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('1');
  const [browseHistory, setBrowseHistory] = useState([]);

  // 模拟浏览历史数据
  useEffect(() => {
    // 在实际应用中，这里应该从本地存储或后端获取浏览历史
    const history = JSON.parse(localStorage.getItem('browseHistory') || '[]');
    setBrowseHistory(history);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      message.success('退出登录成功');
      navigate('/login');
    } catch (error) {
      message.error(error.message || '退出登录失败');
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem('browseHistory');
    setBrowseHistory([]);
    message.success('浏览历史已清空');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: '0 250px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>个人中心</Title>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>欢迎, {currentUser?.email || '用户'}</span>
          <Button 
            type="primary" 
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </div>
      </Header>
      
      <Layout>
        <Sider width={150} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={[activeTab]}
            style={{ height: '100%', borderRight: 0 }}
            onSelect={(e) => setActiveTab(e.key)}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: '个人信息',
              },
              {
                key: '2',
                icon: <HistoryOutlined />,
                label: '浏览历史',
              }
            ]}
          />
        </Sider>
        
        <Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {activeTab === '1' ? (
            <Card title="个人信息">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ marginRight: '20px' }} />
                <div>
                  <Title level={4} style={{ margin: 0 }}>{currentUser?.email?.split('@')[0] || '用户'}</Title>
                  <Text>{currentUser?.email || '未知'}</Text>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>用户ID:</Text> <Text>{currentUser?.id || '未知'}</Text>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>创建时间:</Text> <Text>{currentUser?.created_at ? new Date(currentUser.created_at).toLocaleString() : '未知'}</Text>
              </div>
              <div>
                <Text strong>账号状态:</Text> <Tag color="green">已激活</Tag>
              </div>
            </Card>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Title level={4} style={{ margin: 0 }}>浏览历史</Title>
                {browseHistory.length > 0 && (
                  <Button danger onClick={handleClearHistory}>
                    清空历史
                  </Button>
                )}
              </div>
              
              {browseHistory.length > 0 ? (
                <List
                  dataSource={browseHistory}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <Text key="time">{new Date(item.timestamp).toLocaleString()}</Text>
                      ]}
                    >
                      <List.Item.Meta
                        title={item.title}
                        description={
                          <>
                            <Text>{item.url}</Text>
                            <Tag color="blue" style={{ marginLeft: '10px' }}>{item.category}</Tag>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Card>
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <HistoryOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                    <p style={{ marginTop: '20px', color: '#999' }}>暂无浏览历史</p>
                  </div>
                </Card>
              )}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;