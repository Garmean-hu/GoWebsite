import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Card, List, Avatar, Tag, message, Drawer, Input, Modal, Upload } from 'antd';
import { UserOutlined, HistoryOutlined, LogoutOutlined, MenuOutlined, StarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from './services/auth';

const { TextArea } = Input;

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [activeTab, setActiveTab] = useState('1');
  const [browseHistory, setBrowseHistory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // 个人信息状态
  const [nickname, setNickname] = useState(currentUser?.email?.split('@')[0] || '用户');
  const [avatar, setAvatar] = useState(null);
  
  // 收藏网址状态
  const [bookmarks, setBookmarks] = useState([]);
  
  // 模态框状态
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [newBookmarkModalVisible, setNewBookmarkModalVisible] = useState(false);
  
  // 新收藏网址表单状态
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    url: '',
    description: ''
  });

  // 获取浏览历史和收藏网址数据
  useEffect(() => {
    // 从本地存储获取浏览历史
    const history = JSON.parse(localStorage.getItem('browseHistory') || '[]');
    
    // 如果没有浏览历史，添加一些模拟数据
    if (history.length === 0) {
      const mockHistory = [
        {
          id: Date.now() - 3600000,
          title: 'GitHub',
          url: 'https://github.com/',
          category: 'DevOps',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: Date.now() - 7200000,
          title: 'Google',
          url: 'https://www.google.com/',
          category: '生活',
          timestamp: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: Date.now() - 10800000,
          title: 'React',
          url: 'https://reactjs.org/',
          category: '学习',
          timestamp: new Date(Date.now() - 10800000).toISOString()
        }
      ];
      setBrowseHistory(mockHistory);
    } else {
      setBrowseHistory(history);
    }
    
    // 从本地存储获取收藏网址
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (storedBookmarks.length === 0) {
      const mockBookmarks = [
        {
          id: Date.now(),
          title: 'GitHub',
          url: 'https://github.com/',
          description: '全球最大的代码托管平台'
        },
        {
          id: Date.now() - 1,
          title: 'React',
          url: 'https://reactjs.org/',
          description: 'Facebook开发的前端框架'
        }
      ];
      setBookmarks(mockBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(mockBookmarks));
    } else {
      setBookmarks(storedBookmarks);
    }
    
    // 从本地存储获取用户头像和昵称
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
    
    const storedNickname = localStorage.getItem('userNickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }
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

  // 修改昵称
  const handleEditNickname = () => {
    localStorage.setItem('userNickname', nickname);
    setEditModalVisible(false);
    message.success('昵称修改成功');
  };

  // 上传头像
  const handleAvatarUpload = (info) => {
    if (info.file.status === 'done') {
      // 这里应该上传到服务器，现在只是模拟
      const avatarUrl = URL.createObjectURL(info.file.originFileObj);
      setAvatar(avatarUrl);
      localStorage.setItem('userAvatar', avatarUrl);
      message.success('头像上传成功');
      setAvatarModalVisible(false);
    } else if (info.file.status === 'error') {
      message.error('头像上传失败');
    }
  };

  // 添加收藏网址
  const handleAddBookmark = () => {
    if (!newBookmark.title || !newBookmark.url) {
      message.error('请填写标题和网址');
      return;
    }
    
    const bookmark = {
      id: Date.now(),
      title: newBookmark.title,
      url: newBookmark.url,
      description: newBookmark.description,
      timestamp: new Date().toISOString()
    };
    
    const updatedBookmarks = [...bookmarks, bookmark];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setNewBookmarkModalVisible(false);
    setNewBookmark({ title: '', url: '', description: '' });
    message.success('网址收藏成功');
  };

  // 删除收藏网址
  const handleDeleteBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    message.success('收藏网址已删除');
  };

  const handleMenuClick = (key) => {
    setActiveTab(key);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // 菜单项配置
  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      key: '2',
      icon: <HistoryOutlined />,
      label: '浏览历史',
    },
    {
      key: '3',
      icon: <StarOutlined />,
      label: '收藏网址',
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: '0 70px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        {/* 左侧：桌面端显示标题，移动端显示汉堡菜单和Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isMobile ? (
            <>
              <Button 
                type="text" 
                icon={<MenuOutlined />} 
                onClick={() => setDrawerOpen(true)}
                aria-label="打开菜单"
              />
              <Link to="/" style={{ color: '#1890ff', fontWeight: 'bold', fontSize: '18px' }}>
                GoWeb
              </Link>
            </>
          ) : (
            <div>
              <Title level={3} style={{ margin: 0 }}>个人中心</Title>
            </div>
          )}
        </div>
        
        {/* 右侧：用户信息和退出登录按钮 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isMobile && (
            <span>欢迎, {currentUser?.email || '用户'}</span>
          )}
          <Avatar 
            icon={<UserOutlined />} 
            style={{ cursor: 'pointer' }} 
            aria-label="用户头像"
          />
          <Button 
            type="primary" 
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            aria-label="退出登录"
          >
            {isMobile ? '退出' : '退出登录'}
          </Button>
        </div>
      </Header>
      
      {/* 桌面端布局：侧边栏 + 主内容区 */}
      {!isMobile && (
        <Layout style={{ flex: 1 }}>
          {/* 左侧侧边栏 */}
          <Sider 
            width={200} 
            style={{ 
              background: '#fff',
              boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
              height: 'calc(100vh - 64px)'
            }}
          >
            {/* 个人信息头部 */}
            <div style={{ 
              padding: '24px', 
              borderBottom: '1px solid #f0f0f0',
              textAlign: 'center'
            }}>
              <Avatar size={64} src={avatar} icon={<UserOutlined />} style={{ marginBottom: '12px' }} />
              <div>
                <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                  {nickname}
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {currentUser?.email || '未知'}
                </Text>
              </div>
            </div>
            
            {/* 功能菜单 */}
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              selectedKeys={[activeTab]}
              style={{ height: 'calc(100% - 150px)', borderRight: 0, paddingTop: '16px' }}
              onSelect={(e) => handleMenuClick(e.key)}
              items={menuItems}
              aria-label="功能菜单"
            />
            
            {/* 底部版本信息 */}
            <div style={{ 
              padding: '16px', 
              borderTop: '1px solid #f0f0f0',
              textAlign: 'center',
              fontSize: '12px',
              color: '#999'
            }}>
              <Text>版本 1.0.0</Text>
            </div>
          </Sider>
          
          {/* 右侧主内容区 */}
          <Content style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
            {activeTab === '1' ? (
              <Card 
                title="个人信息" 
                style={{ 
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ position: 'relative', marginRight: '20px' }}>
                    <Avatar 
                      size={80} 
                      src={avatar} 
                      icon={<UserOutlined />} 
                      style={{ cursor: 'pointer' }}
                      onClick={() => setAvatarModalVisible(true)}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      right: 0, 
                      backgroundColor: '#1890ff', 
                      borderRadius: '50%', 
                      width: '24px', 
                      height: '24px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '2px solid white'
                    }} onClick={() => setAvatarModalVisible(true)}>
                      <EditOutlined style={{ color: 'white', fontSize: '12px' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Title level={4} style={{ margin: 0, marginRight: '10px' }}>{nickname}</Title>
                      <Button 
                        type="text" 
                        icon={<EditOutlined />} 
                        size="small"
                        onClick={() => setEditModalVisible(true)}
                      >
                        编辑
                      </Button>
                    </div>
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
            ) : activeTab === '2' ? (
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
                      style={{ alignItems: 'flex-start' }}
                    >
                      <List.Item.Meta
                        title={<a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', textDecoration: 'none' }}>{item.title}</a>}
                        description={
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', overflow: 'hidden' }}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', marginRight: '10px', flex: '1 1 auto', minWidth: 0 }}>
                              <Text ellipsis={{ tooltip: item.url }} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '300px' }}>
                                {item.url}
                              </Text>
                            </a>
                            <Tag color="blue" style={{ flex: '0 0 auto' }}>{item.category}</Tag>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Card style={{ borderRadius: '8px' }}>
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <HistoryOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                    <p style={{ marginTop: '20px', color: '#999' }}>暂无浏览历史</p>
                  </div>
                </Card>
              )}
              </>
            ) : activeTab === '3' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <Title level={4} style={{ margin: 0 }}>收藏网址</Title>
                  <Button type="primary" icon={<StarOutlined />} onClick={() => setNewBookmarkModalVisible(true)}>
                    添加收藏
                  </Button>
                </div>
                
                {bookmarks.length > 0 ? (
                  <List
                    dataSource={bookmarks}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <Text key="time">{item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}</Text>,
                          <Button 
                            key="delete" 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteBookmark(item.id)}
                          >
                            删除
                          </Button>
                        ]}
                        style={{ alignItems: 'flex-start' }}
                      >
                        <List.Item.Meta
                          title={<a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', textDecoration: 'none' }}>{item.title}</a>}
                          description={
                            <>
                              <div style={{ marginBottom: '8px' }}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>
                                  {item.url}
                                </a>
                              </div>
                              {item.description && (
                                <Text type="secondary">{item.description}</Text>
                              )}
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Card style={{ borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <StarOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                      <p style={{ marginTop: '20px', color: '#999' }}>暂无收藏网址</p>
                      <Button type="primary" icon={<StarOutlined />} style={{ marginTop: '20px' }} onClick={() => setNewBookmarkModalVisible(true)}>
                        添加收藏
                      </Button>
                    </div>
                  </Card>
                )}
              </>
            ) : null}
          </Content>
        </Layout>
      )}
      
      {/* 移动端布局：主内容区 */}
      {isMobile && (
        <Content style={{ padding: '16px', flex: 1 }}>
          {activeTab === '1' ? (
            <Card 
              title="个人信息" 
              style={{ 
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ position: 'relative', marginRight: '20px' }}>
                  <Avatar 
                    size={80} 
                    src={avatar} 
                    icon={<UserOutlined />} 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setAvatarModalVisible(true)}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0, 
                    backgroundColor: '#1890ff', 
                    borderRadius: '50%', 
                    width: '24px', 
                    height: '24px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '2px solid white'
                  }} onClick={() => setAvatarModalVisible(true)}>
                    <EditOutlined style={{ color: 'white', fontSize: '12px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0, marginRight: '10px', fontSize: '18px' }}>{nickname}</Title>
                    <Button 
                      type="text" 
                      icon={<EditOutlined />} 
                      size="small"
                      onClick={() => setEditModalVisible(true)}
                    >
                      编辑
                    </Button>
                  </div>
                  <Text>{currentUser?.email || '未知'}</Text>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>用户ID:</Text> <Text style={{ fontSize: '14px' }}>{currentUser?.id || '未知'}</Text>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>创建时间:</Text> <Text>{currentUser?.created_at ? new Date(currentUser.created_at).toLocaleString() : '未知'}</Text>
              </div>
              <div>
                <Text strong>账号状态:</Text> <Tag color="green">已激活</Tag>
              </div>
            </Card>
          ) : activeTab === '3' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Title level={4} style={{ margin: 0, fontSize: '18px' }}>收藏网址</Title>
                <Button type="primary" icon={<StarOutlined />} size="small" onClick={() => setNewBookmarkModalVisible(true)}>
                  添加收藏
                </Button>
              </div>
              
              {bookmarks.length > 0 ? (
                <List
                  dataSource={bookmarks}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <Text key="time" style={{ fontSize: '12px' }}>{item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}</Text>,
                        <Button 
                          key="delete" 
                          type="text" 
                          danger 
                          icon={<DeleteOutlined />}
                          size="small"
                          onClick={() => handleDeleteBookmark(item.id)}
                        >
                          删除
                        </Button>
                      ]}
                      style={{ alignItems: 'flex-start' }}
                    >
                      <List.Item.Meta
                        title={<a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', textDecoration: 'none', fontSize: '14px' }}>{item.title}</a>}
                        description={
                          <>
                            <div style={{ marginBottom: '8px' }}>
                              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>
                                {item.url}
                              </a>
                            </div>
                            {item.description && (
                              <Text type="secondary" style={{ fontSize: '12px' }}>{item.description}</Text>
                            )}
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Card style={{ borderRadius: '8px' }}>
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <StarOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                    <p style={{ marginTop: '20px', color: '#999' }}>暂无收藏网址</p>
                    <Button type="primary" icon={<StarOutlined />} size="small" style={{ marginTop: '20px' }} onClick={() => setNewBookmarkModalVisible(true)}>
                      添加收藏
                    </Button>
                  </div>
                </Card>
              )}
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Title level={4} style={{ margin: 0, fontSize: '18px' }}>浏览历史</Title>
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
                        <Text key="time" style={{ fontSize: '12px' }}>{new Date(item.timestamp).toLocaleString()}</Text>
                      ]}
                      style={{ alignItems: 'flex-start' }}
                    >
                      <List.Item.Meta
                        title={<a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', textDecoration: 'none', fontSize: '14px' }}>{item.title}</a>}
                        description={
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', overflow: 'hidden' }}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', marginRight: '10px', flex: '1 1 auto', minWidth: 0 }}>
                              <Text style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '200px' }}>
                                {item.url}
                              </Text>
                            </a>
                            <Tag color="blue" style={{ marginLeft: '10px', fontSize: '10px', flex: '0 0 auto' }}>{item.category}</Tag>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Card style={{ borderRadius: '8px' }}>
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <HistoryOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                    <p style={{ marginTop: '20px', color: '#999' }}>暂无浏览历史</p>
                  </div>
                </Card>
              )}
            </>
          )}
        </Content>
      )}
      
      {/* 移动端侧边栏抽屉 */}
      <Drawer
        title="菜单"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={240}
        bodyStyle={{ padding: 0 }}
      >
        {/* 个人信息头部 */}
        <div style={{ 
          padding: '24px', 
          borderBottom: '1px solid #f0f0f0',
          textAlign: 'center'
        }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '12px' }} />
          <div>
            <Text strong style={{ display: 'block', marginBottom: '4px' }}>
              {currentUser?.email?.split('@')[0] || '用户'}
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {currentUser?.email || '未知'}
            </Text>
          </div>
        </div>
        
        {/* 功能菜单 */}
        <Menu
          mode="inline"
          defaultSelectedKeys={[activeTab]}
          selectedKeys={[activeTab]}
          style={{ height: '100%', borderRight: 0 }}
          onSelect={(e) => handleMenuClick(e.key)}
          items={menuItems}
        />
        
        {/* 底部版本信息 */}
        <div style={{ 
          padding: '16px', 
          borderTop: '1px solid #f0f0f0',
          textAlign: 'center',
          fontSize: '12px',
          color: '#999'
        }}>
          <Text>版本 1.0.0</Text>
        </div>
      </Drawer>
      
      {/* 修改昵称模态框 */}
      <Modal
        title="修改昵称"
        open={editModalVisible}
        onOk={handleEditNickname}
        onCancel={() => setEditModalVisible(false)}
      >
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="请输入新昵称"
          style={{ marginBottom: '20px' }}
        />
      </Modal>
      
      {/* 修改头像模态框 */}
      <Modal
        title="修改头像"
        open={avatarModalVisible}
        onCancel={() => setAvatarModalVisible(false)}
        footer={null}
      >
        <Upload
          name="avatar"
          showUploadList={false}
          action="#"
          customRequest={handleAvatarUpload}
          accept="image/*"
        >
          <Button icon={<EditOutlined />}>上传头像</Button>
        </Upload>
        <div style={{ marginTop: '20px' }}>
          <Text type="secondary">支持JPG、PNG等图片格式</Text>
        </div>
      </Modal>
      
      {/* 添加收藏网址模态框 */}
      <Modal
        title="添加收藏网址"
        open={newBookmarkModalVisible}
        onOk={handleAddBookmark}
        onCancel={() => setNewBookmarkModalVisible(false)}
      >
        <Input
          value={newBookmark.title}
          onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
          placeholder="网站标题"
          style={{ marginBottom: '16px' }}
        />
        <Input
          value={newBookmark.url}
          onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
          placeholder="网站网址"
          style={{ marginBottom: '16px' }}
        />
        <TextArea
          value={newBookmark.description}
          onChange={(e) => setNewBookmark({ ...newBookmark, description: e.target.value })}
          placeholder="网站描述（可选）"
          rows={4}
        />
      </Modal>
    </Layout>
  );
};

export default Dashboard;