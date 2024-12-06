import React from 'react';
import { Table, Card } from 'antd';

const Markdowns = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Content HTML', dataIndex: 'contentHTML', key: 'contentHTML' },
    { title: 'Content Markdown', dataIndex: 'contentMarkdown', key: 'contentMarkdown' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Doctor ID', dataIndex: 'doctorId', key: 'doctorId' },
    { title: 'Specialty ID', dataIndex: 'specialtyId', key: 'specialtyId' },
    { title: 'Clinic ID', dataIndex: 'clinicId', key: 'clinicId' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      contentHTML: '<p>This is a sample HTML content.</p>',
      contentMarkdown: '# Sample Markdown Content',
      description: 'Markdown content description.',
      doctorId: 101,
      specialtyId: 301,
      clinicId: 201,
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="Markdowns" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default Markdowns;
