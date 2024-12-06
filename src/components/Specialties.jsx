import React from 'react';
import { Table, Card } from 'antd';

const Schedules = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Doctor ID', dataIndex: 'doctorId', key: 'doctorId' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time Frame', dataIndex: 'timeFrame', key: 'timeFrame' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      doctorId: 101,
      date: '2024-11-28',
      timeFrame: '10:00 AM - 12:00 PM',
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="Schedules" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default Schedules;
