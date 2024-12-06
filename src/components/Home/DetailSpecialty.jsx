import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Typography, Spin, message } from 'antd';

const { Title } = Typography;

const DetailSpecialty = () => {
  const { id } = useParams(); // Get the specialty ID from the URL
  const [specialty, setSpecialty] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchSpecialtyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/specialties/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            console.log(data.data); // Check if the doctors array is present
            setSpecialty(data.data);
          } else {
            message.error(data.message || 'Failed to fetch specialty details.');
          }
        } else {
          message.error('Failed to fetch specialty. Please try again later.');
        }
      } catch (error) {
        message.error('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialtyDetails();
  }, [id]);
  

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!specialty) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <p style={{ fontSize: '18px', color: '#555' }}>Specialty not found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card bordered style={{ textAlign: 'center' }}>
        <img
          src={`http://localhost:5000/${specialty.image}`} // Use the full URL for images
          alt={specialty.name}
          style={{ width: '50%', borderRadius: '8px', marginBottom: '20px' }}
        />
        <Title level={2}>{specialty.name}</Title>
        <div
          style={{ fontSize: '16px', color: '#555', textAlign: 'left' }}
          dangerouslySetInnerHTML={{ __html: specialty.description }} // Render HTML description
        />
      </Card>

      <div style={{ marginTop: '30px' }}>
  <Title level={3}>Danh sách bác sĩ chuyên khoa</Title>
  {specialty.doctors && specialty.doctors.length > 0 ? (
    specialty.doctors.map((doctor) => (
      <Card
        key={doctor.id}
        style={{
          marginBottom: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
        hoverable
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Họ tên">{doctor.name}</Descriptions.Item>
          <Descriptions.Item label="Kinh nghiệm">{doctor.experience || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Phòng khám">{doctor.clinic || 'N/A'}</Descriptions.Item>
        </Descriptions>
      </Card>
    ))
  ) : (
    <p>Không có bác sĩ nào được liên kết với chuyên khoa này.</p>
  )}
</div>

    </div>
  );
};

export default DetailSpecialty;
