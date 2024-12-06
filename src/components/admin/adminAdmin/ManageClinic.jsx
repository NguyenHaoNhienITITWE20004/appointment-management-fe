import React, { useState } from 'react';
import { Form, Input, Button, Upload, Row, Col, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { marked } from 'marked';

const ManageClinic = () => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState(''); // State for clinic description
  const [imageFile, setImageFile] = useState(null); // State for uploaded image

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('address', values.address);
      formData.append('descriptionMarkdown', description);
      formData.append('descriptionHTML', marked(description));
      if (imageFile) {
        formData.append('image', imageFile); // Add file to formData
      }
  
      // Debugging: Log formData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]); // Logs key-value pairs
      }
  
      // Send the formData to the backend
      const response = await fetch('http://localhost:5000/clinics', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        message.success('Thông tin phòng khám đã được lưu thành công!');
        form.resetFields();
        setDescription('');
        setImageFile(null);
      } else {
        message.error(result.message || 'Đã xảy ra lỗi khi lưu thông tin phòng khám.');
      }
    } catch (error) {
      console.error('Error saving clinic data:', error);
      message.error('Lỗi mạng, vui lòng thử lại sau.');
    }
  };
  

  // Upload props for handling file selection
  const uploadProps = {
    beforeUpload: (file) => {
      console.log('Selected file:', file);
      setImageFile(file); // Save the selected file to state
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setImageFile(null); // Clear the selected file
    },
  };

  return (
    <Card title="QUẢN LÝ PHÒNG KHÁM" bordered={false} style={{ margin: '20px' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          {/* Clinic Name */}
          <Col span={12}>
            <Form.Item
              label="Tên phòng khám"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên phòng khám!' }]}
            >
              <Input placeholder="Tên phòng khám" />
            </Form.Item>
          </Col>

          {/* Clinic Address */}
          <Col span={12}>
            <Form.Item
              label="Địa chỉ phòng khám"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ phòng khám!' }]}
            >
              <Input placeholder="Địa chỉ phòng khám" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Upload Clinic Image */}
          <Col span={12}>
            <Form.Item
              label="Ảnh phòng khám"
              rules={[{ required: true, message: 'Vui lòng tải ảnh phòng khám!' }]}
            >
              <Upload {...uploadProps} listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* TinyMCE Editor */}
          <Col span={12}>
            <Form.Item
              label="Mô tả phòng khám (Editor)"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả phòng khám!' }]}
            >
              <Editor
                apiKey="eli882a110nfk1kih09o4l89yxygfnct7xbjbkdykwdirb28" // Replace with your TinyMCE API key
                value={description}
                onEditorChange={(content) => setDescription(content)}
                init={{
                  height: 300,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                }}
              />
            </Form.Item>
          </Col>

          {/* Live Preview */}
          <Col span={12}>
            <Form.Item label="Mô tả phòng khám (Preview)">
              <div
                style={{
                  border: '1px solid #d9d9d9',
                  padding: '10px',
                  borderRadius: '4px',
                  background: '#f7f7f7',
                  minHeight: '300px',
                  overflowY: 'auto',
                }}
                dangerouslySetInnerHTML={{ __html: marked(description) }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: '20px', backgroundColor: '#FFCC00', color: '#000' }}
          >
            Lưu thông tin phòng khám
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ManageClinic;
