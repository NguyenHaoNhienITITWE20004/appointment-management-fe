import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Button,
  Row,
  Col,
  DatePicker,
  Typography,
  Modal,
  Form,
  Input,
  Spin,
  message,
  Divider,
  Space,
} from 'antd';
import moment from 'moment';
import { marked } from 'marked';

const { Text, Title } = Typography;

const DetailDoctor = () => {
  const { id } = useParams(); // Doctor ID from URL
  const [doctor, setDoctor] = useState(null);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment()); // Default to today
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/doctor-infor/${id}`);
        if (response.ok) {
          const { data } = await response.json();
          setDoctor(data);
        } else {
          message.error('Failed to fetch doctor details.');
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        message.error('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        console.log('Fetching schedules for:', `http://localhost:5000/schedules/doctor/${id}?date=${formattedDate}`);

        const response = await fetch(`http://localhost:5000/schedules/doctor/${id}?date=${formattedDate}`);
        if (response.ok) {
          const { data } = await response.json();
          setAvailableSchedules(data || []);
          console.log('Fetched Schedules:', data);
        } else {
          setAvailableSchedules([]);
          message.error('No schedules found for the selected date.');
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
        message.error('Network error. Please try again later.');
      }
    };

    fetchSchedules();
  }, [id, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = (time) => {
    setSelectedTime(time);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const bookingDetails = {
        ...values,
        doctorId: doctor.doctorId,
        doctorName: doctor.nameClinic,
        selectedTime,
        selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
      };

      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        message.success('Appointment successfully booked!');
        setIsModalVisible(false);
        form.resetFields();
      } else {
        const error = await response.json();
        message.error(error.message || 'Failed to book the appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      message.error('An error occurred. Please try again.');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (!doctor) return <Text type="danger">Doctor not found.</Text>;

  return (
    <Card
      title={
        <Space direction="vertical" style={{ textAlign: 'center' }}>
          <Title level={3}>{doctor.nameClinic}</Title>
          <Text type="secondary">{doctor.specialtyId || 'Specialty not specified'}</Text>
        </Space>
      }
      bordered={false}
      style={{ margin: '20px', backgroundColor: '#fafafa' }}
    >
      <Descriptions bordered column={1} layout="vertical" size="middle">
        <Descriptions.Item label="Địa chỉ phòng khám">
          <Text strong>{doctor.addressClinic || 'N/A'}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Giá khám bệnh">
          <Text strong>{doctor.priceId || 'N/A'} VND</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán">
          <Text>{doctor.paymentId || 'N/A'}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Tỉnh thành">{doctor.provinceId || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Ghi chú">
          <div
            dangerouslySetInnerHTML={{
              __html: marked(doctor.note || 'No additional information.'),
            }}
            style={{
              backgroundColor: '#f9f9f9',
              padding: '10px',
              borderRadius: '5px',
            }}
          />
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <div style={{ marginTop: '20px' }}>
        <Title level={4}>Chọn lịch khám</Title>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <DatePicker
              style={{ width: '100%' }}
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              value={selectedDate}
              placeholder="Chọn ngày"
            />
          </Col>
        </Row>

        <div style={{ marginTop: '20px' }}>
          <Row gutter={[16, 16]}>
            {availableSchedules.length > 0 ? (
              availableSchedules.map((schedule, index) => (
                <Col key={index}>
                  <Button
                    type="primary"
                    style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
                    onClick={() => handleBooking(schedule.timeFrame)}
                  >
                    {schedule.timeFrame}
                  </Button>
                </Col>
              ))
            ) : (
              <Text type="warning">Không có lịch hẹn nào cho ngày này.</Text>
            )}
          </Row>
        </div>
      </div>

      <Modal
        title="Thông tin đặt lịch khám bệnh"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Địa chỉ email"
            rules={[{ type: 'email', required: true, message: 'Vui lòng nhập email hợp lệ!' }]}
          >
            <Input placeholder="Nhập địa chỉ email" />
          </Form.Item>
          <Form.Item name="reason" label="Lý do khám">
            <Input.TextArea placeholder="Nhập lý do khám" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};



export default DetailDoctor;
