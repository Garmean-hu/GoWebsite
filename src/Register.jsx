import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from './services/auth';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await authService.signUp(values.email, values.password);
      message.success('注册成功，请登录');
      navigate('/login');
    } catch (error) {
      message.error(error.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card title="用户注册" style={{ width: 400 }}>
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }, { min: 6, message: '密码长度至少为6位' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              注册
            </Button>
          </Form.Item>

          <Divider>
            已有账号？
          </Divider>

          <Form.Item>
            <Button type="default" style={{ width: '100%' }}>
              <Link to="/login">立即登录</Link>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
