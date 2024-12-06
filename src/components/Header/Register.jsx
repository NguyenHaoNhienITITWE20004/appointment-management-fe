import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const Register = ({ onClose, currentUserRole }) => {
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true); // Set loading state to true during the request
    try {
      // Prepare form data
      const formData = {
        ...values,
        phonenumber: values.phoneNumber, // Ensure field name matches backend expectations
        positionId: values.roleId === '3' ? '1' : null, // Set positionId if role is 'Doctor'
      };

      // Send registration request
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      if (data.success) {
        message.success('Registration successful!');
        if (onClose) onClose();
      } else {
        message.error(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center' }}>
        Register
      </Title>
      <Form layout="vertical" onFinish={onFinish}>
        {/* Email input with validation */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Password input with validation */}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters long' },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, // Password must have at least one letter and one number
              message: 'Password must contain at least one letter and one number',
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        {/* Confirm Password input with dependency validation */}
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        {/* First Name input */}
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>

        {/* Last Name input */}
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>

        {/* Address input */}
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input placeholder="Enter your address" />
        </Form.Item>

        {/* Gender select */}
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/* Role select */}
        <Form.Item
          name="roleId"
          label="Role"
          initialValue={currentUserRole || '2'} // Default to 'User' role if no currentRole is provided
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select your role" disabled={currentUserRole === '1'}> {/* Disable Admin if current user is Admin */}
            <Option value="1">Admin</Option>
            <Option value="2">User</Option>
            <Option value="3">Doctor</Option> {/* Added Doctor role */}
          </Select>
        </Form.Item>

        {/* Phone Number input */}
        <Form.Item
          name="phoneNumber" // Ensure this matches the field your backend expects
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
