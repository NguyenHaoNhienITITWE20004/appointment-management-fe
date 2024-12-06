import React, { useState, useEffect } from 'react';
import { Select, DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';

const { Option } = Select;

const ManageDoctorSchedule = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    // Fetch doctors (mock data for now)
    const mockDoctors = [
      { id: 1, name: 'Doctor A' },
      { id: 2, name: 'Doctor B' },
    ];
    setDoctors(mockDoctors);
  }, []);

  const handleSaveSchedule = () => {
    console.log('Saving schedule:', { selectedDoctor, selectedDate, timeSlots });
    alert('Schedule saved successfully!');
  };

  const toggleTimeSlot = (slot) => {
    setTimeSlots((prevSlots) =>
      prevSlots.includes(slot) ? prevSlots.filter((s) => s !== slot) : [...prevSlots, slot]
    );
  };

  const availableTimeSlots = [
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        QUẢN LÝ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ
      </h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <Select
          placeholder="Chọn bác sĩ"
          onChange={(value) => setSelectedDoctor(value)}
          style={{ width: '200px' }}
        >
          {doctors.map((doctor) => (
            <Option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </Option>
          ))}
        </Select>
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          style={{ width: '200px' }}
        />
      </div>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        {availableTimeSlots.map((slot) => (
          <Col key={slot}>
            <Button
              type={timeSlots.includes(slot) ? 'primary' : 'default'}
              onClick={() => toggleTimeSlot(slot)}
            >
              {slot}
            </Button>
          </Col>
        ))}
      </Row>
      <Button type="primary" onClick={handleSaveSchedule}>
        Lưu thông tin
      </Button>
    </div>
  );
};

export default ManageDoctorSchedule;
