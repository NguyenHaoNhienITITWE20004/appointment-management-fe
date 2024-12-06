import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import ManageDoctorSchedule from './ManageDoctorSchedule';
import ManageDoctorPatients from './ManageDoctorPatients';

const { Sider, Content } = Layout;

const DoctorDashboard = () => {
  // State to manage the active menu item
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Define components to render based on the active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'manage-schedule':
        return <ManageDoctorSchedule />;
      case 'manage-patients':
        return <ManageDoctorPatients />;
      case 'dashboard':
      default:
        return <h1>Welcome to the Doctor Dashboard</h1>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider width={250} style={{ background: '#f0f2f5' }}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <h3 style={{ margin: '10px 0' }}>Doctor Name</h3>
          <p style={{ color: '#888' }}>DOCTOR</p>
        </div>
        <Menu
          mode="inline"
          style={{ background: '#f0f2f5' }}
          defaultSelectedKeys={['dashboard']}
          onClick={({ key }) => setActiveMenu(key)} // Update the active menu
        >
          <Menu.Item key="manage-schedule" icon={<CalendarOutlined />}>
            Manage Schedule
          </Menu.Item>
          <Menu.Item key="manage-patients" icon={<FileTextOutlined />}>
            Manage Patients
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Content style={{ padding: '20px', background: '#fff' }}>
          {renderContent()} {/* Dynamically render content based on active menu */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DoctorDashboard;
