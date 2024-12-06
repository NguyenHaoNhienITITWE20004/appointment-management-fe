import React, { useState, useEffect } from 'react';
import { Menu, Button, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const AppHeader = ({ role, setRole }) => {
  const navigate = useNavigate();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const handleLogout = () => {
    localStorage.clear(); // Clear stored data
    setRole(null); // Reset role in the state
    navigate('/'); // Redirect to Home
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#001529',
      }}
    >
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} style={{ flex: 1 }}>
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        {role === 'ADMIN' && (
          <>
            <Menu.Item key="/admin-dashboard">
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </Menu.Item>
          </>
        )}
        {role === 'DOCTOR' && (
          <>
            <Menu.Item key="/doctor-dashboard">
              <Link to="/doctor-dashboard">Doctor Dashboard</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
      <div style={{ display: 'flex', gap: '10px' }}>
        {!role ? (
          <>
            <Button type="primary" onClick={() => setIsLoginVisible(true)}>
              Login
            </Button>
            <Button onClick={() => setIsRegisterVisible(true)}>Register</Button>
          </>
        ) : (
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>

      {/* Login Modal */}
      <Modal
        title="Login"
        visible={isLoginVisible}
        onCancel={() => setIsLoginVisible(false)}
        footer={null}
      >
        <Login
          onLogin={(userRole) => {
            setRole(userRole);
            setIsLoginVisible(false);
            navigate(userRole === 'ADMIN' ? '/admin-dashboard' : '/doctor-dashboard');
          }}
        />
      </Modal>

      {/* Register Modal */}
      <Modal
        title="Register"
        visible={isRegisterVisible}
        onCancel={() => setIsRegisterVisible(false)}
        footer={null}
      >
        <Register onClose={() => setIsRegisterVisible(false)} />
      </Modal>
    </div>
  );
};

export default AppHeader;
