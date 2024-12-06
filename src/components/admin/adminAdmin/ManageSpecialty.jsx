import React, { useState } from 'react';
import { Form, Input, Button, Upload, Row, Col, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';

const ManageSpecialty = () => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState(''); // State for specialty description
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [imageFile, setImageFile] = useState(null); // State for the uploaded image file
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (!imageFile) {
      message.error('Please upload an image for the specialty.');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', description);
    formData.append('image', imageFile); // Append the selected image file

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/specialties', {
        method: 'POST',
        body: formData, // Send FormData for proper file upload handling
      });

      if (response.ok) {
        const result = await response.json();
        message.success('Specialty added successfully!');
        console.log('Specialty added successfully:', result);

        form.resetFields();
        setDescription(''); // Clear the editor content
        setImageFile(null); // Clear the uploaded image
        navigate('/'); // Redirect to the home page to refresh the list
      } else {
        const error = await response.json();
        console.error('Error saving specialty:', error.message || response.statusText);
        message.error(error.message || 'Failed to save specialty. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      message.error('An error occurred while saving the specialty. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      // Ensure only image files are uploaded
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }

      // Limit file size to 5MB
      const isValidSize = file.size / 1024 / 1024 < 5;
      if (!isValidSize) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }

      setImageFile(file); // Save the selected file to the state
      console.log('Selected file:', file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setImageFile(null); // Clear the image file when removed
    },
    fileList: imageFile
    ? [
        {
          uid: '-1', // Unique identifier for the file
          name: imageFile.name, // Display the file name
          status: 'done', // Show the upload status
          url: URL.createObjectURL(imageFile), // Preview URL
        },
      ]
    : [],
    };

  return (
    <Card title="Quản lý chuyên khoa" bordered={false} style={{ margin: '20px' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          {/* Specialty Name */}
          <Col span={12}>
            <Form.Item
              label="Tên chuyên khoa"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên chuyên khoa!' }]}
            >
              <Input placeholder="Tên chuyên khoa" />
            </Form.Item>
          </Col>

          {/* Upload Specialty Image */}
          <Col span={12}>
            <Form.Item
              label="Ảnh chuyên khoa"
              rules={[{ required: true, message: 'Vui lòng tải ảnh chuyên khoa!' }]}
            >
              <Upload {...uploadProps} listType="picture">
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* TinyMCE Editor */}
          <Col span={12}>
            <Form.Item
              label="Thông tin mô tả (Editor)"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập thông tin mô tả!' }]}
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
            <Form.Item label="Thông tin mô tả (Preview)">
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
            loading={loading} // Show loading spinner during submission
            style={{ marginTop: '20px', backgroundColor: '#FFCC00', color: '#000' }}
          >
            {loading ? 'Saving...' : 'Lưu thông tin chuyên khoa'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ManageSpecialty;
