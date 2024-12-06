import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ManageUser from './ManageUser';
import ManageDoctor from './ManageDoctor';
import ManageHealthPlan from './ManageHealthPlan';
import ManageClinic from './ManageClinic';
import ManageSpecialty from './ManageSpecialty';

const { Sider, Content } = Layout;

const AdminDashboard = () => {
  // State to manage the active menu item
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Define components to render based on the active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'manage-user':
        return <ManageUser />;
      case 'dashboard':
        return <h1>Welcome to the Admin Dashboard</h1>;
      case 'manage-doctor':
        return <ManageDoctor />;
        case 'manage-health':
          return <ManageHealthPlan />;
          case 'manage-clinic':
            return <ManageClinic />;
            case 'manage-specialty':
              return <ManageSpecialty />;
              default:
        return <h1>Welcome to the Admin Dashboard</h1>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ background: '#f0f2f5' }}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <h3 style={{ margin: '10px 0' }}>Admin Admin</h3>
          <p style={{ color: '#888' }}>ADMIN</p>
        </div>
        <Menu
          mode="inline"
          style={{ background: '#f0f2f5' }}
          defaultSelectedKeys={['dashboard']}
          onClick={({ key }) => setActiveMenu(key)} // Update the active menu
        >
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="manage-user" icon={<UserOutlined />}>
            Manage User
          </Menu.Item>
          <Menu.Item key="manage-doctor" icon={<AppstoreOutlined />}>
            Manage Doctor
          </Menu.Item>
          <Menu.Item key="manage-health" icon={<CalendarOutlined />}>
            Manage Health Examination Plan
          </Menu.Item>
          <Menu.Item key="manage-clinic" icon={<AppstoreOutlined />}>
            Manage Clinic
          </Menu.Item>
          <Menu.Item key="manage-specialty" icon={<PlusOutlined />}>
            Manage Specialty
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          {renderContent()} {/* Dynamically render content based on active menu */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
