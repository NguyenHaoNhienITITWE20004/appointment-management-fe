import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Card, message, Spin } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { marked } from 'marked';

const { Option } = Select;

const ManageDoctor = () => {
  const [form] = Form.useForm();
  const [introduction, setIntroduction] = useState('');
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [users, setUsers] = useState([]); // State to store fetched users
  const [specialties, setSpecialties] = useState([]);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      setOptionsLoading(true);
      try {
        const [usersRes, specialtiesRes, clinicsRes] = await Promise.all([
          fetch('http://localhost:5000/users'),
          fetch('http://localhost:5000/specialties'),
          fetch('http://localhost:5000/clinics'),
        ]);

        if (usersRes.ok && specialtiesRes.ok && clinicsRes.ok) {
          const [usersData, specialtiesData, clinicsData] = await Promise.all([
            usersRes.json(),
            specialtiesRes.json(),
            clinicsRes.json(),
          ]);

          // Filter users to include only those with the role "Doctor"
          const doctors = usersData.users.filter((user) => user.roleId === 'Doctor');
          setUsers(doctors);
          setSpecialties(specialtiesData.data || []);
          setClinics(clinicsData.data || []);
        } else {
          message.error('Failed to fetch select options.');
        }
      } catch (error) {
        console.error('Error fetching options:', error);
        message.error('Network error. Please try again later.');
      } finally {
        setOptionsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const onFinish = async (values) => {
    const doctorInfo = {
      doctorId: values.doctorId,
      specialtyId: values.specialtyId,
      clinicId: values.clinicId,
      priceId: values.fee.toString(),
      provinceId: values.province,
      paymentId: values.paymentMethod,
      addressClinic: values.clinicAddress,
      nameClinic: values.clinicName,
      note: values.notes || null,
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/doctor-infor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorInfo),
      });

      if (response.ok) {
        const result = await response.json();
        message.success('Doctor information added successfully!');
        form.resetFields();
        setIntroduction('');
      } else {
        const error = await response.json();
        message.error(error.message || 'Failed to add doctor information.');
      }
    } catch (error) {
      console.error('Network error:', error);
      message.error('An error occurred while saving doctor information.');
    } finally {
      setLoading(false);
    }
  };

  if (optionsLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card title="TẠO THÊM THÔNG TIN BÁC SĨ" bordered={false} style={{ margin: '20px' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          {/* Select Doctor */}
          <Col span={12}>
            <Form.Item
              label="Chọn bác sĩ"
              name="doctorId"
              rules={[{ required: true, message: 'Vui lòng chọn bác sĩ!' }]}
            >
              <Select placeholder="Chọn bác sĩ" loading={optionsLoading}>
                {users.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Fee */}
          <Col span={12}>
            <Form.Item
              label="Giá khám bệnh"
              name="fee"
              rules={[{ required: true, message: 'Vui lòng nhập giá khám bệnh!' }]}
            >
              <Input type="number" placeholder="Giá khám bệnh" />
            </Form.Item>
          </Col>

          {/* Payment Method */}
          <Col span={12}>
            <Form.Item
              label="Phương thức thanh toán"
              name="paymentMethod"
              rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
            >
              <Select placeholder="Phương thức thanh toán">
                <Option value="cash">Tiền mặt</Option>
                <Option value="credit_card">Thẻ tín dụng</Option>
                <Option value="insurance">Bảo hiểm</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Clinic Address */}
          <Col span={12}>
            <Form.Item
              label="Địa chỉ phòng khám"
              name="clinicAddress"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ phòng khám!' }]}
            >
              <Input placeholder="Địa chỉ phòng khám" />
            </Form.Item>
          </Col>

          {/* Province */}
          <Col span={12}>
            <Form.Item
              label="Tỉnh thành"
              name="province"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành!' }]}
            >
              <Select placeholder="Tỉnh thành">
                <Option value="hanoi">Hà Nội</Option>
                <Option value="hochiminh">Hồ Chí Minh</Option>
                <Option value="danang">Đà Nẵng</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Clinic Name */}
          <Col span={12}>
            <Form.Item
              label="Tên phòng khám"
              name="clinicName"
              rules={[{ required: true, message: 'Vui lòng nhập tên phòng khám!' }]}
            >
              <Input placeholder="Tên phòng khám" />
            </Form.Item>
          </Col>

          {/* Specialty */}
          <Col span={12}>
            <Form.Item
              label="Chọn chuyên khoa"
              name="specialtyId"
              rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa!' }]}
            >
              <Select placeholder="Chọn chuyên khoa" loading={optionsLoading}>
                {specialties.map((specialty) => (
                  <Option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Clinic */}
          <Col span={12}>
            <Form.Item
              label="Chọn phòng khám"
              name="clinicId"
              rules={[{ required: true, message: 'Vui lòng chọn phòng khám!' }]}
            >
              <Select placeholder="Chọn phòng khám" loading={optionsLoading}>
                {clinics.map((clinic) => (
                  <Option key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Notes */}
          <Col span={24}>
            <Form.Item label="Ghi chú" name="notes">
              <Input.TextArea placeholder="Ghi chú" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* TinyMCE Editor */}
          <Col span={12}>
            <Form.Item
              label="Thông tin giới thiệu (Editor)"
              name="introduction"
              rules={[{ required: true, message: 'Vui lòng nhập thông tin giới thiệu!' }]}
            >
              <Editor
                apiKey="eli882a110nfk1kih09o4l89yxygfnct7xbjbkdykwdirb28"
                value={introduction}
                onEditorChange={(content) => setIntroduction(content)}
                init={{
                  height: 300,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                }}
              />
            </Form.Item>
          </Col>

          {/* Live Preview */}
          <Col span={12}>
            <Form.Item label="Thông tin giới thiệu (Preview)">
              <div
                style={{
                  border: '1px solid #d9d9d9',
                  padding: '10px',
                  borderRadius: '4px',
                  background: '#f7f7f7',
                  minHeight: '300px',
                  overflowY: 'auto',
                }}
                dangerouslySetInnerHTML={{ __html: marked(introduction) }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: '20px' }}>
            {loading ? 'Saving...' : 'Lưu thông tin bác sĩ'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ManageDoctor;
