import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Image } from 'antd';

const DetailClinic = () => {
  const { id } = useParams(); // Get clinic ID from the URL
  const [clinic, setClinic] = useState(null);

  useEffect(() => {
    // Fetch clinic details based on the ID (replace with API call)
    const mockClinicDetails = {
      id,
      name: 'Bệnh viện Hữu nghị Việt Đức',
      address: '123 Đường A, Quận B, TP Hà Nội',
      descriptionMarkdown: '## Thông tin chi tiết về phòng khám\n- Đội ngũ bác sĩ chuyên môn cao\n- Trang thiết bị hiện đại\n- Dịch vụ chuyên nghiệp',
      image: 'https://via.placeholder.com/600x300', // Replace with the real clinic image
    };

    setClinic(mockClinicDetails);
  }, [id]);

  if (!clinic) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Card
        bordered={false}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* Clinic Image */}
        <Image
          alt={clinic.name}
          src={clinic.image}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />

        {/* Clinic Details */}
        <Descriptions title={clinic.name} bordered column={1} size="middle">
          <Descriptions.Item label="Địa chỉ">{clinic.address}</Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            <div
              dangerouslySetInnerHTML={{ __html: clinic.descriptionMarkdown }}
              style={{ whiteSpace: 'pre-wrap' }}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default DetailClinic;
