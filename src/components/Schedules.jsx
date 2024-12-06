import React from 'react';
import { Table, Card, Button, Space } from 'antd';

const Schedules = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Doctor Name', dataIndex: 'doctorName', key: 'doctorName' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time Slot', dataIndex: 'timeSlot', key: 'timeSlot' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small">Edit</Button>
          <Button type="danger" size="small">Delete</Button>
        </Space>
      ),
    },
  ];

  const data = [
    { id: 1, doctorName: 'Dr. Smith', date: '2024-11-28', timeSlot: '10:00 AM - 12:00 PM' },
    { id: 2, doctorName: 'Dr. Brown', date: '2024-11-29', timeSlot: '02:00 PM - 04:00 PM' },
  ];

  return (
    <Card title="Doctor Schedules" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Button type="primary" style={{ marginBottom: '10px' }}>Add Schedule</Button>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default Schedules;
