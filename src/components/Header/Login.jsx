import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = ({ onClose, onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log('Login form values:', values); // Debug log for form values
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Send form data to backend
      });
  
      const data = await response.json();
      console.log('Backend response:', data); // Debug log for backend response
  
      if (data.success) {
        message.success('Login successful!');
  
        const { token, user: { roleId } = {} } = data;
        if (!token || !roleId) {
          message.error('Invalid response from server.');
          return;
        }
  
        localStorage.setItem('token', token);
        localStorage.setItem('roleId', roleId);
  
        if (onLogin) onLogin(roleId);
  
        switch (roleId) {
          case 1:
          case 'Admin':
            navigate('/admin-dashboard');
            break;
          case 2:
          case 'Doctor':
            navigate('/doctor-dashboard');
            break;
          case 3:
          case 'User':
            navigate('/');
            break;
          default:
            message.warning('Unknown role. Redirecting to home.');
            navigate('/');
            break;
        }
  
        if (onClose) onClose();
      } else {
        message.error(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Title level={3} style={{ textAlign: 'center' }}>
        Login
      </Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters long' },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            disabled={loading} // Disable button while loading
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
