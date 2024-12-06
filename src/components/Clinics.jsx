import React from 'react';
import { Table, Card } from 'antd';

const Clinics = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Description (Markdown)', dataIndex: 'descriptionMarkdown', key: 'descriptionMarkdown' },
    { title: 'Description (HTML)', dataIndex: 'descriptionHTML', key: 'descriptionHTML' },
    { title: 'Image', dataIndex: 'image', key: 'image', render: (text) => <img src={text} alt="clinic" style={{ width: 50 }} /> },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      name: 'Health Clinic',
      address: '123 Main St',
      descriptionMarkdown: 'This is a general health clinic.',
      descriptionHTML: '<p>This is a general health clinic.</p>',
      image: 'https://via.placeholder.com/50',
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="Clinics" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default Clinics;
