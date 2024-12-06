import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Row, Col, Card, message } from 'antd';

const { Option } = Select;

const ManageHealthPlan = () => {
  const [form] = Form.useForm();
  const [selectedTimes, setSelectedTimes] = useState([]); // State to store selected time slots
  const [doctors, setDoctors] = useState([]); // State to store fetched doctors
  const [loading, setLoading] = useState(false); // Loading state

  const timeSlots = [
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ];

  useEffect(() => {
    // Fetch doctors from API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/doctor-clinic-specialty');
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.data || []); // Assuming API response has `data.data`
        } else {
          message.error('Failed to fetch doctors.');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        message.error('Network error. Please try again later.');
      }
    };

    fetchDoctors();
  }, []);

  const toggleTimeSlot = (slot) => {
    setSelectedTimes((prev) =>
      prev.includes(slot) ? prev.filter((time) => time !== slot) : [...prev, slot]
    );
  };

  const onFinish = async (values) => {
    const { doctorId, date } = values;

    // Ensure timeSlots array is not empty
    if (selectedTimes.length === 0) {
      message.error('Vui lòng chọn ít nhất một khung giờ!');
      return;
    }

    try {
      setLoading(true);

      // Submit a request for each time slot
      const responses = await Promise.all(
        selectedTimes.map((timeSlot) =>
          fetch('http://localhost:5000/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId, date, timeFrame: timeSlot }),
          })
        )
      );

      // Check for errors in responses
      const errors = responses.filter((res) => !res.ok);
      if (errors.length > 0) {
        throw new Error(`Failed to save ${errors.length} schedules.`);
      }

      message.success('Kế hoạch khám bệnh đã được lưu!');
      form.resetFields();
      setSelectedTimes([]);
    } catch (error) {
      console.error('Error saving health plan:', error);
      message.error('Lỗi xảy ra khi lưu kế hoạch khám bệnh. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="QUẢN LÝ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ" bordered={false} style={{ margin: '20px' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          {/* Select Doctor */}
          <Col span={12}>
            <Form.Item
              label="Chọn bác sĩ"
              name="doctorId"
              rules={[{ required: true, message: 'Vui lòng chọn bác sĩ!' }]}
            >
              <Select placeholder="Chọn bác sĩ" loading={doctors.length === 0}>
                {doctors.map((doctor) => (
                  <Option key={doctor.id} value={doctor.id}>
                    {doctor.firstName} {doctor.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Select Date */}
          <Col span={12}>
            <Form.Item
              label="Chọn ngày"
              name="date"
              rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
            >
              <input type="date" style={{ width: '100%', padding: '5px' }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Time Slots */}
        <Row gutter={[8, 8]} style={{ margin: '20px 0' }}>
          {timeSlots.map((slot) => (
            <Col key={slot}>
              <Button
                type={selectedTimes.includes(slot) ? 'primary' : 'default'}
                onClick={() => toggleTimeSlot(slot)}
              >
                {slot}
              </Button>
            </Col>
          ))}
        </Row>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Lưu thông tin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ManageHealthPlan;
