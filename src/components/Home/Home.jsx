import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, message, Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const [popularSpecialties, setPopularSpecialties] = useState([]);
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [featuredClinics, setFeaturedClinics] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000'; // Define the base URL for easier updates

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all required data in parallel
        const [specialtiesRes, doctorsRes, allDoctorsRes, clinicsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/specialties`),
          fetch(`${API_BASE_URL}/doctor-infor/featured`),
          fetch(`${API_BASE_URL}/doctor-infor`),
          fetch(`${API_BASE_URL}/clinics/featured`),
        ]);

        // Process each response
        if (specialtiesRes.ok) {
          const specialtiesData = await specialtiesRes.json();
          setPopularSpecialties(specialtiesData.data || []);
        } else {
          message.error('Unable to fetch popular specialties');
        }

        if (doctorsRes.ok) {
          const doctorsData = await doctorsRes.json();
          setFeaturedDoctors(doctorsData.data || []);
        } else {
          message.error('Unable to fetch featured doctors');
        }

        if (allDoctorsRes.ok) {
          const allDoctorsData = await allDoctorsRes.json();
          setAllDoctors(allDoctorsData.data || []);
        } else {
          message.error('Unable to fetch all doctors');
        }

        if (clinicsRes.ok) {
          const clinicsData = await clinicsRes.json();
          setFeaturedClinics(clinicsData.data || []);
        } else {
          message.error('Unable to fetch featured clinics');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const viewDetails = (id, type) => {
    navigate(`/detail-${type}/${id}`);
  };

  const renderSection = (title, data, type) => (
    <div style={{ marginTop: '40px' }}>
      <Title level={3}>{title}</Title>
      {data.length > 0 ? (
        <Row gutter={[16, 16]}>
          {data.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{
                  border: '1px solid #FFD700',
                  textAlign: 'center',
                  borderRadius: '10px',
                }}
                cover={
                  <img
                    alt={item.name || item.clinicName} // Ensure we have a fallback name in case of no name field
                    src={
                      item.image
                        ? `${API_BASE_URL}${item.image}` // Use dynamic image path
                        : `${API_BASE_URL}/placeholder.jpg` // Fallback image
                    }
                    style={{
                      borderRadius: type === 'doctor' ? '50%' : '5px',
                      objectFit: 'cover',
                      height: '200px',
                    }}
                  />
                }
              >
                <h3>{item.name || item.clinicName}</h3>
                {item.specialtyName && <p>{item.specialtyName}</p>}
                {item.clinicName && <p>{item.clinicName}</p>}
                <Button type="primary" onClick={() => viewDetails(item.id, type)}>
                  Xem thêm
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p style={{ textAlign: 'center', color: '#555' }}>Không có dữ liệu cho mục này.</p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Welcome to Appointment Booking System
      </Title>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        Explore our features and services.
      </p>

      {renderSection('Chuyên khoa phổ biến', popularSpecialties, 'specialty')}
      {renderSection('Bác sĩ nổi bật tuần qua', featuredDoctors, 'doctor')}
      {renderSection('Danh sách bác sĩ', allDoctors, 'doctor')}
      {renderSection('Cơ sở y tế nổi bật', featuredClinics, 'clinic')}
    </div>
  );
};

export default Home;
