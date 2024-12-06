import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CreatePrescriptionModal = ({ visible, onClose, patient }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Prescription data:', values);
    alert('Prescription created successfully!');
    onClose();
  };

  return (
    <Modal
      title="Tạo đơn thuốc"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          email: patient?.email,
          name: patient?.name,
          drugs: '',
          instructions: '',
        }}
      >
        <Form.Item label="Email bệnh nhân" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Tên bệnh nhân" name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Danh sách các loại thuốc"
          name="drugs"
          rules={[{ required: true, message: 'Vui lòng nhập danh sách thuốc' }]}
        >
          <Input.TextArea placeholder="Ví dụ: thuốc A, thuốc B" />
        </Form.Item>
        <Form.Item
          label="Thông tin mô tả cách uống thuốc"
          name="instructions"
          rules={[{ required: true, message: 'Vui lòng nhập hướng dẫn' }]}
        >
          <Input.TextArea placeholder="Ví dụ: uống sáng chiều" />
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreatePrescriptionModal;
