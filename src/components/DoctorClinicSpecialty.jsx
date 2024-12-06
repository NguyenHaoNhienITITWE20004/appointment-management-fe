import React from 'react';
import { Table, Card } from 'antd';

const DoctorClinicSpecialty = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Doctor ID', dataIndex: 'doctorId', key: 'doctorId' },
    { title: 'Clinic ID', dataIndex: 'clinicId', key: 'clinicId' },
    { title: 'Specialty ID', dataIndex: 'specialtyId', key: 'specialtyId' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      doctorId: 101,
      clinicId: 201,
      specialtyId: 301,
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="Doctor-Clinic-Specialty" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default DoctorClinicSpecialty;
