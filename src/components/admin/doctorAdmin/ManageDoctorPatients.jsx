import React, { useState } from 'react';
import { Table, Button, DatePicker, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import CreatePrescriptionModal from './CreatePrescriptionModal'; // Import the prescription modal

const ManageDoctorPatients = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [isPrescriptionModalVisible, setIsPrescriptionModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    // Fetch patient data for the selected date
    console.log('Selected Date:', dateString);
  };

  const handleActionClick = (action, record) => {
    console.log(`Action: ${action}, Patient:`, record);
    switch (action) {
      case 'confirm':
        setSelectedPatient(record); // Set the selected patient
        setIsConfirmModalVisible(true); // Show the confirmation modal
        break;
      case 'create-prescription':
        setSelectedPatient(record); // Set the selected patient
        setIsPrescriptionModalVisible(true); // Show the prescription modal
        break;
      case 'cancel':
        alert(`Cancelled appointment for ${record.name}`);
        break;
      default:
        break;
    }
  };

  const handleConfirmSubmit = (values) => {
    console.log('Confirmation Submitted:', values);
    message.success('Appointment confirmed successfully!');
    setIsConfirmModalVisible(false); // Close the modal
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: '8px', backgroundColor: '#FFD700', borderColor: '#FFD700' }}
            onClick={() => handleActionClick('confirm', record)}
          >
            Xác nhận
          </Button>
          <Button
            type="primary"
            style={{ marginRight: '8px', backgroundColor: '#FFA500', borderColor: '#FFA500' }}
            onClick={() => handleActionClick('create-prescription', record)}
          >
            Tạo đơn thuốc
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleActionClick('cancel', record)}
          >
            Hủy
          </Button>
        </>
      ),
    },
  ];

  // Sample patient data
  const data = [
    {
      key: '1',
      time: '9:00 - 10:00',
      name: 'Dao',
      address: 'Can Tho',
      phone: '0123456789',
      gender: 'Nữ',
    },
    {
      key: '2',
      time: '10:00 - 11:00',
      name: 'Nguyen Van A',
      address: 'Hanoi',
      phone: '0987654321',
      gender: 'Nam',
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>QUẢN LÝ BỆNH NHÂN KHÁM BỆNH</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <DatePicker
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          defaultValue={moment(selectedDate)}
          style={{ marginRight: '10px' }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
        style={{ background: '#fff' }}
      />

      {/* Prescription Modal */}
      {selectedPatient && (
        <CreatePrescriptionModal
          visible={isPrescriptionModalVisible}
          onClose={() => setIsPrescriptionModalVisible(false)}
          patient={selectedPatient}
        />
      )}

      {/* Confirmation Modal */}
      {selectedPatient && (
        <Modal
          title="Gửi hóa đơn khám bệnh thành công"
          visible={isConfirmModalVisible}
          onCancel={() => setIsConfirmModalVisible(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleConfirmSubmit}>
            <Form.Item label="Email bệnh nhân" name="email" initialValue={selectedPatient?.email}>
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Chọn file đơn thuốc"
              name="prescriptionFile"
              rules={[{ required: true, message: 'Vui lòng chọn file đơn thuốc' }]}
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Choose other file</Button>
              </Upload>
            </Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={() => setIsConfirmModalVisible(false)} style={{ marginRight: '10px' }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default ManageDoctorPatients;
