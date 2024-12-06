import React from 'react';
import { Table, Card } from 'antd';

const Histories = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Patient ID', dataIndex: 'patientId', key: 'patientId' },
    { title: 'Doctor ID', dataIndex: 'doctorId', key: 'doctorId' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Files', dataIndex: 'files', key: 'files', render: (text) => <a href={text}>Download</a> },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      patientId: 10,
      doctorId: 20,
      description: 'Routine checkup notes.',
      files: '/path/to/file1.pdf',
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="Patient Histories" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default Histories;
