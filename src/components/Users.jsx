import React from 'react';
import { Table, Card } from 'antd';

const Users = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Password', dataIndex: 'password', key: 'password' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Role ID', dataIndex: 'roleId', key: 'roleId' },
    { title: 'Phone Number', dataIndex: 'phonenumber', key: 'phonenumber' },
    { title: 'Position ID', dataIndex: 'positionId', key: 'positionId' },
    { title: 'Image', dataIndex: 'image', key: 'image', render: (text) => <img src={text} alt="user" style={{ width: 50 }} /> },
    { title: 'Token', dataIndex: 'tokenUser', key: 'tokenUser' },
    { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost' },
    { title: 'Total Revenue', dataIndex: 'totalRevenue', key: 'totalRevenue' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      email: 'john.doe@example.com',
      password: 'encrypted-password',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      gender: 'Male',
      roleId: 'R001',
      phonenumber: '1234567890',
      positionId: 'P001',
      image: 'https://via.placeholder.com/50',
      tokenUser: 'sample-token',
      totalCost: 1000,
      totalRevenue: 5000,
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="Users" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default Users;
