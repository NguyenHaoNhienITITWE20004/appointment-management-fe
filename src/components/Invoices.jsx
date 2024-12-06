import React from 'react';
import { Table, Card } from 'antd';

const Invoices = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Doctor ID', dataIndex: 'doctorId', key: 'doctorId' },
    { title: 'Patient ID', dataIndex: 'patientId', key: 'patientId' },
    { title: 'Specialty ID', dataIndex: 'specialtyId', key: 'specialtyId' },
    { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      doctorId: 101,
      patientId: 201,
      specialtyId: 301,
      totalCost: 150,
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="Invoices" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default Invoices;
