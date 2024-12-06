import React from 'react';
import { Table, Card } from 'antd';

const DoctorInfo = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Doctor ID', dataIndex: 'doctorId', key: 'doctorId' },
    { title: 'Specialty ID', dataIndex: 'specialtyId', key: 'specialtyId' },
    { title: 'Clinic ID', dataIndex: 'clinicId', key: 'clinicId' },
    { title: 'Price ID', dataIndex: 'priceId', key: 'priceId' },
    { title: 'Province ID', dataIndex: 'provinceId', key: 'provinceId' },
    { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId' },
    { title: 'Address Clinic', dataIndex: 'addressClinic', key: 'addressClinic' },
    { title: 'Name Clinic', dataIndex: 'nameClinic', key: 'nameClinic' },
    { title: 'Note', dataIndex: 'note', key: 'note' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
  ];

  const data = [
    {
      id: 1,
      doctorId: 101,
      specialtyId: 301,
      clinicId: 201,
      priceId: 'P001',
      provinceId: 'PR001',
      paymentId: 'PAY001',
      addressClinic: '123 Clinic St.',
      nameClinic: 'Health Clinic',
      note: 'Available on weekends',
      count: 5,
      createdAt: '2024-11-01 10:00:00',
      updatedAt: '2024-11-15 10:00:00',
    },
  ];

  return (
    <Card title="Doctor Information" bordered style={{ margin: '20px', borderRadius: '8px' }}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default DoctorInfo;
