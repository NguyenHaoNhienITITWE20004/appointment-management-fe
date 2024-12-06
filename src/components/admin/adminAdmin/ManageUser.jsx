import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Upload, Table, Space, Tag, message, Modal } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

// Mapping of role names to roleId (string values expected by the backend)
const roleMapping = { Admin: 'Admin', Doctor: 'Doctor', Patient: 'Patient' }; // RoleId as strings
const roleColorMapping = { Admin: 'green', Doctor: 'blue', Patient: 'orange' }; // Color mapping for roles

const ManageUser = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/users');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.users)) {
            // Map numeric roleId back to the role string (for frontend display)
            const mappedUsers = data.users.map((user) => ({
              ...user,
              role: Object.keys(roleMapping).find((key) => roleMapping[key] === user.roleId), // Map numeric roleId to string role name
            }));
            setUsers(mappedUsers);
          } else {
            message.error('Unexpected response format.');
          }
        } else {
          message.error('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        message.error('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  


  // Handle form submission for adding/editing a user
  const onFinish = async (values) => {
    console.log('Form values:', values); // Debug: Log the form values to check if the role is selected correctly
  
    try {
      setLoading(true);
  
      // Map role to roleId (numeric)
      const roleId = roleMapping[values.role]; // Mapping the selected role string to the numeric roleId
      console.log('Mapped Role ID:', roleId); // Debug: Log the mapped roleId
  
      if (!roleId) {
        message.error('Invalid role selected.');
        setLoading(false);
        return;
      }
  
      // Map gender to lowercase for backend compatibility
      const gender = values.gender.toLowerCase();
  
      // Create a new FormData object
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'image' && values[key]?.file) {
          console.log('File object:', values[key].file); // Debug: Log the image file
          formData.append(key, values[key].file.originFileObj);
        } else if (key !== 'role' && key !== 'gender') {
          formData.append(key, values[key]);
        }
      });
  
      // Append roleId and gender to form data
      formData.append('roleId', roleId);  // Append the numeric roleId instead of the role string
      formData.append('gender', gender);  // Append the gender in lowercase
  
      console.log('Form Data Sent:', Array.from(formData.entries())); // Debug: Log the FormData contents
  
      const endpoint = editingUser
        ? `http://localhost:5000/users/${editingUser.id}`
        : 'http://localhost:5000/users';
  
      const method = editingUser ? 'PUT' : 'POST';
  
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        if (editingUser) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === editingUser.id
                ? { ...updatedUser.user, role: values.role } // Preserve the role name (string)
                : user
            )
          );
          message.success('User updated successfully!');
        } else {
          setUsers((prevUsers) => [
            ...prevUsers,
            { ...updatedUser.user, role: values.role }, // Preserve the role name (string)
          ]);
          message.success('User added successfully!');
        }
        form.resetFields();
        setEditingUser(null);
        setModalVisible(false); // Close the modal after successful operation
      } else {
        const error = await response.json();
        console.error('Backend Error:', error);
        message.error(error.message || 'Failed to save user.');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      message.error('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  // Handle user editing
  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      ...user,
      role: user.role, // Use the mapped role name
      positionId: user.positionId || null,
      image: null, // Reset image preview when editing
      phoneNumber: user.phonenumber || '', // Ensure phone number is set but not overwritten
    });
    setModalVisible(true);
    message.info(`Editing user: ${user.firstName}`);
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/users/${userId}`, { method: 'DELETE' });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        message.success('User deleted successfully!');
      } else {
        const error = await response.json();
        message.error(error.message || 'Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Columns for the users table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={roleColorMapping[role]}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];
  

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>User Management</h2>
      <Button
        type="primary"
        style={{ marginBottom: '20px' }}
        onClick={() => {
          setEditingUser(null);
          form.resetFields();
          setModalVisible(true);
        }}
      >
        Add New User
      </Button>

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email!' }]}>
              <Input placeholder="Enter email" />
            </Form.Item>
            {!editingUser && (
              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password!' }]}>
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            )}
            <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter first name!' }]}>
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter last name!' }]}>
              <Input placeholder="Enter last name" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please enter phone number!' }]}>
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter address!' }]}>
              <Input placeholder="Enter address" />
            </Form.Item>
            <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender!' }]}>
              <Select placeholder="Select gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select a role!' }]}>
              <Select placeholder="Select role">
                <Option value="Admin">Admin</Option>
                <Option value="Doctor">Doctor</Option>
                <Option value="Patient">Patient</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Profile Image" name="image">
              <Upload listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingUser ? 'Update User' : 'Save User'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={columns} dataSource={users} rowKey="id" loading={loading} />
    </div>
  );
};

export default ManageUser;
