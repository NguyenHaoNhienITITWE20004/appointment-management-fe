import React from 'react';
import { Table, Card } from 'antd';

const AllCodes = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Key Map', dataIndex: 'keyMap', key: 'keyMap' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Value (EN)', dataIndex: 'valueEn', key: 'valueEn' },
    { title: 'Value (VI)', dataIndex: 'valueVi', key: 'valueVi' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      keyMap: 'GENDER',
      type: 'system',
      valueEn: 'Male',
      valueVi: 'Nam',
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
    {
      id: 2,
      keyMap: 'GENDER',
      type: 'system',
      valueEn: 'Female',
      valueVi: 'Nữ',
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="All Codes" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default AllCodes;
