'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, Button, Typography, Space, Form, Select, DatePicker, 
  Input, Upload, Table, Tag, Avatar, Divider, Modal, message 
} from 'antd';
import { 
  CalendarOutlined, FileTextOutlined, PlusOutlined, UploadOutlined,
  EyeOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined,
  ClockCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined,
  UserOutlined, DownloadOutlined
} from '@ant-design/icons';
import { Kanit } from 'next/font/google';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Font Loader
const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

export default function LeaveRequest() {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('request');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  // Employee data (same as profile)
  const employeeData = {
    name: 'Kittisak Priabying',
    position: 'Junior Full Stack Engineer',
    department: 'Information Technology Department',
    employeeId: '7984563211',
    email: 'kittisak.pri@tosakancorp.com',
    manager: 'Thanakrit Watcharapongwanich',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    managerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  // Leave types
  const leaveTypes = [
    { value: 'annual', label: 'ลาพักผ่อนประจำปี', color: '#52c41a' },
    { value: 'sick', label: 'ลาป่วย', color: '#faad14' },
    { value: 'personal', label: 'ลากิจส่วนตัว', color: '#1890ff' },
    { value: 'maternity', label: 'ลาคลอด', color: '#eb2f96' },
    { value: 'paternity', label: 'ลาคลอดบุตร (บิดา)', color: '#722ed1' },
    { value: 'emergency', label: 'ลาฉุกเฉิน', color: '#f5222d' },
  ];

  // Mock leave history data
  const leaveHistory = [
    {
      id: 1,
      type: 'annual',
      startDate: '2024-05-15',
      endDate: '2024-05-17',
      days: 3,
      reason: 'เดินทางท่องเที่ยวกับครอบครัว',
      status: 'approved',
      appliedDate: '2024-05-01',
      approvedBy: 'Thanakrit Watcharapongwanich',
      approvedDate: '2024-05-03'
    },
    {
      id: 2,
      type: 'sick',
      startDate: '2024-04-20',
      endDate: '2024-04-20',
      days: 1,
      reason: 'ไข้หวัดและปวดหัว',
      status: 'approved',
      appliedDate: '2024-04-19',
      approvedBy: 'Thanakrit Watcharapongwanich',
      approvedDate: '2024-04-19'
    },
    {
      id: 3,
      type: 'personal',
      startDate: '2024-06-10',
      endDate: '2024-06-10',
      days: 1,
      reason: 'ติดต่อธุรกิจส่วนตัว',
      status: 'pending',
      appliedDate: '2024-05-20',
    },
    {
      id: 4,
      type: 'annual',
      startDate: '2024-03-25',
      endDate: '2024-03-26',
      days: 2,
      reason: 'พักผ่อนส่วนตัว',
      status: 'rejected',
      appliedDate: '2024-03-10',
      rejectedBy: 'Thanakrit Watcharapongwanich',
      rejectedDate: '2024-03-12',
      rejectedReason: 'ช่วงเวลาดังกล่าวมีโครงการสำคัญ'
    }
  ];

  // Leave balance
  const leaveBalance = {
    annual: { used: 8, total: 15, remaining: 7 },
    sick: { used: 2, total: 30, remaining: 28 },
    personal: { used: 3, total: 5, remaining: 2 }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#52c41a';
      case 'pending': return '#faad14';
      case 'rejected': return '#f5222d';
      default: return '#d9d9d9';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircleOutlined />;
      case 'pending': return <ClockCircleOutlined />;
      case 'rejected': return <CloseCircleOutlined />;
      default: return <ExclamationCircleOutlined />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'อนุมัติแล้ว';
      case 'pending': return 'รออนุมัติ';
      case 'rejected': return 'ไม่อนุมัติ';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getLeaveTypeLabel = (type) => {
    const leaveType = leaveTypes.find(lt => lt.value === type);
    return leaveType ? leaveType.label : type;
  };

  const getLeaveTypeColor = (type) => {
    const leaveType = leaveTypes.find(lt => lt.value === type);
    return leaveType ? leaveType.color : '#d9d9d9';
  };

  const columns = [
    {
      title: 'ประเภทการลา',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={getLeaveTypeColor(type)}>
          {getLeaveTypeLabel(type)}
        </Tag>
      ),
    },
    {
      title: 'วันที่ลา',
      key: 'dateRange',
      render: (record) => (
        <div>
          <div>{dayjs(record.startDate).format('DD/MM/YYYY')}</div>
          {record.startDate !== record.endDate && (
            <div style={{ color: '#666', fontSize: '12px' }}>
              ถึง {dayjs(record.endDate).format('DD/MM/YYYY')}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'จำนวนวัน',
      dataIndex: 'days',
      key: 'days',
      align: 'center',
      render: (days) => <Text strong>{days} วัน</Text>,
    },
    {
      title: 'เหตุผล',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <Tag 
          icon={getStatusIcon(status)}
          color={getStatusColor(status)}
        >
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'วันที่ส่งคำขอ',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'การดำเนินการ',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewLeave(record)}
            style={{ color: '#2b6cb0' }}
          />
          {record.status === 'pending' && (
            <>
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                style={{ color: '#faad14' }}
              />
              <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                style={{ color: '#f5222d' }}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleViewLeave = (record) => {
    setSelectedLeave(record);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log('Leave request submitted:', values);
    message.success('ส่งคำขอลาสำเร็จ!');
    form.resetFields();
  };

  const calculateLeaveDays = (dates) => {
    if (dates && dates.length === 2) {
      const start = dayjs(dates[0]);
      const end = dayjs(dates[1]);
      return end.diff(start, 'day') + 1;
    }
    return 0;
  };

  return (
    <div className={kanit.className} >
      <div style={{ 
        maxWidth: '1800px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 40px)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(90deg, #134e90 0%, #2973c2 100%)',
          borderRadius: '12px',
          padding: '24px 30px',
          color: 'white',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginRight: '24px' }}>
            <Avatar 
              src={employeeData.avatar} 
              size={70}
              style={{
                border: '3px solid white',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
              }}
            />
          </div>
          
          <div style={{ flex: 1 }}>
            <Title level={4} style={{ color: 'white', margin: '0 0 4px 0', fontFamily: 'Kanit, sans-serif' }}>
              ระบบการลา - {employeeData.name}
            </Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px' }}>
              {employeeData.position} | {employeeData.department}
            </Text>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>
                {leaveBalance.annual.remaining}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                วันลาพักผ่อนคงเหลือ
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>
                {leaveBalance.sick.remaining}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                วันลาป่วยคงเหลือ
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Tabs */}
          <div style={{ 
            borderBottom: '1px solid #e8e8e8',
            padding: '0 16px',
            display: 'flex'
          }}>
            <div 
              onClick={() => setActiveKey('request')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'request' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'request' ? '500' : 'normal',
                borderBottom: activeKey === 'request' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PlusOutlined />
              <span>ส่งคำขอลา</span>
            </div>
            <div 
              onClick={() => setActiveKey('history')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'history' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'history' ? '500' : 'normal',
                borderBottom: activeKey === 'history' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CalendarOutlined />
              <span>ประวัติการลา</span>
            </div>
            <div 
              onClick={() => setActiveKey('balance')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'balance' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'balance' ? '500' : 'normal',
                borderBottom: activeKey === 'balance' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileTextOutlined />
              <span>สรุปวันลา</span>
            </div>
          </div>
          
          {/* Content */}
          <div style={{ 
            flex: 1,
            padding: '24px',
            overflowY: 'auto'
          }}>
            {activeKey === 'request' && (
              <div>
                <SectionCard title="ส่งคำขอลา">
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: '800px' }}
                  >
                    <Row gutter={[24, 16]}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="ประเภทการลา"
                          name="leaveType"
                          rules={[{ required: true, message: 'กรุณาเลือกประเภทการลา' }]}
                        >
                          <Select placeholder="เลือกประเภทการลา" size="large">
                            {leaveTypes.map(type => (
                              <Option key={type.value} value={type.value}>
                                <Tag color={type.color} style={{ marginRight: 8 }}>
                                  {type.label}
                                </Tag>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="ช่วงเวลาที่ลา"
                          name="dateRange"
                          rules={[{ required: true, message: 'กรุณาเลือกวันที่ลา' }]}
                        >
                          <RangePicker 
                            style={{ width: '100%' }} 
                            size="large"
                            format="DD/MM/YYYY"
                            placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
                          />
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24}>
                        <Form.Item
                          label="เหตุผลในการลา"
                          name="reason"
                          rules={[{ required: true, message: 'กรุณาระบุเหตุผลในการลา' }]}
                        >
                          <TextArea 
                            rows={4} 
                            placeholder="กรุณาระบุเหตุผลในการลาอย่างละเอียด..."
                            maxLength={500}
                            showCount
                          />
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24}>
                        <Form.Item
                          label="เอกสารแนบ (ถ้ามี)"
                          name="documents"
                        >
                          <Upload.Dragger
                            multiple
                            beforeUpload={() => false}
                            style={{ background: '#fafbfd' }}
                          >
                            <p className="ant-upload-drag-icon">
                              <UploadOutlined style={{ color: '#2b6cb0' }} />
                            </p>
                            <p className="ant-upload-text">
                              คลิกหรือลากไฟล์มาวางที่นี่เพื่ือแนบเอกสาร
                            </p>
                            <p className="ant-upload-hint">
                              รองรับไฟล์ PDF, JPG, PNG ขนาดไม่เกิน 10MB
                            </p>
                          </Upload.Dragger>
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Divider />
                    
                    <div style={{ textAlign: 'right' }}>
                      <Space>
                        <Button size="large" onClick={() => form.resetFields()}>
                          ล้างข้อมูล
                        </Button>
                        <Button 
                          type="primary" 
                          size="large" 
                          htmlType="submit"
                          style={{ 
                            background: 'linear-gradient(90deg, #134e90 0%, #2973c2 100%)',
                            border: 'none'
                          }}
                        >
                          ส่งคำขอลา
                        </Button>
                      </Space>
                    </div>
                  </Form>
                </SectionCard>
              </div>
            )}
            
            {activeKey === 'history' && (
              <div>
                <SectionCard title="ประวัติการลา">
                  <Table
                    columns={columns}
                    dataSource={leaveHistory}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1000 }}
                  />
                </SectionCard>
              </div>
            )}
            
            {activeKey === 'balance' && (
              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={8}>
                    <SectionCard title="วันลาพักผ่อนประจำปี">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', color: '#52c41a', fontWeight: '600' }}>
                          {leaveBalance.annual.remaining}
                        </div>
                        <div style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                          วันคงเหลือ
                        </div>
                        <div style={{ fontSize: '14px', color: '#999' }}>
                          ใช้ไป {leaveBalance.annual.used} วัน จากทั้งหมด {leaveBalance.annual.total} วัน
                        </div>
                        <div style={{ 
                          marginTop: '16px', 
                          height: '8px', 
                          background: '#f0f0f0', 
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${(leaveBalance.annual.used / leaveBalance.annual.total) * 100}%`,
                            background: '#52c41a',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                    </SectionCard>
                  </Col>
                  
                  <Col xs={24} md={8}>
                    <SectionCard title="วันลาป่วย">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', color: '#faad14', fontWeight: '600' }}>
                          {leaveBalance.sick.remaining}
                        </div>
                        <div style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                          วันคงเหลือ
                        </div>
                        <div style={{ fontSize: '14px', color: '#999' }}>
                          ใช้ไป {leaveBalance.sick.used} วัน จากทั้งหมด {leaveBalance.sick.total} วัน
                        </div>
                        <div style={{ 
                          marginTop: '16px', 
                          height: '8px', 
                          background: '#f0f0f0', 
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${(leaveBalance.sick.used / leaveBalance.sick.total) * 100}%`,
                            background: '#faad14',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                    </SectionCard>
                  </Col>
                  
                  <Col xs={24} md={8}>
                    <SectionCard title="วันลากิจส่วนตัว">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', color: '#1890ff', fontWeight: '600' }}>
                          {leaveBalance.personal.remaining}
                        </div>
                        <div style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                          วันคงเหลือ
                        </div>
                        <div style={{ fontSize: '14px', color: '#999' }}>
                          ใช้ไป {leaveBalance.personal.used} วัน จากทั้งหมد {leaveBalance.personal.total} วัน
                        </div>
                        <div style={{ 
                          marginTop: '16px', 
                          height: '8px', 
                          background: '#f0f0f0', 
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${(leaveBalance.personal.used / leaveBalance.personal.total) * 100}%`,
                            background: '#1890ff',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                    </SectionCard>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leave Detail Modal */}
      <Modal
        title="รายละเอียดการลา"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            ปิด
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />}
            style={{ 
              background: 'linear-gradient(90deg, #134e90 0%, #2973c2 100%)',
              border: 'none'
            }}
          >
            ดาวน์โหลด
          </Button>
        ]}
        width={600}
      >
        {selectedLeave && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>ประเภทการลา:</Text>
                <br />
                <Tag color={getLeaveTypeColor(selectedLeave.type)}>
                  {getLeaveTypeLabel(selectedLeave.type)}
                </Tag>
              </Col>
              <Col span={12}>
                <Text strong>สถานะ:</Text>
                <br />
                <Tag 
                  icon={getStatusIcon(selectedLeave.status)}
                  color={getStatusColor(selectedLeave.status)}
                >
                  {getStatusText(selectedLeave.status)}
                </Tag>
              </Col>
              <Col span={12}>
                <Text strong>วันที่เริ่มต้น:</Text>
                <br />
                <Text>{dayjs(selectedLeave.startDate).format('DD/MM/YYYY')}</Text>
              </Col>
              <Col span={12}>
                <Text strong>วันที่สิ้นสุด:</Text>
                <br />
                <Text>{dayjs(selectedLeave.endDate).format('DD/MM/YYYY')}</Text>
              </Col>
              <Col span={12}>
                <Text strong>จำนวนวัน:</Text>
                <br />
                <Text>{selectedLeave.days} วัน</Text>
              </Col>
              <Col span={12}>
                <Text strong>วันที่ส่งคำขอ:</Text>
                <br />
                <Text>{dayjs(selectedLeave.appliedDate).format('DD/MM/YYYY')}</Text>
              </Col>
              <Col span={24}>
                <Text strong>เหตุผล:</Text>
                <br />
                <Text>{selectedLeave.reason}</Text>
              </Col>
              {selectedLeave.status === 'approved' && (
                <>
                  <Col span={12}>
                    <Text strong>อนุมัติโดย:</Text>
                    <br />
                    <Text>{selectedLeave.approvedBy}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>วันที่อนุมัติ:</Text>
                    <br />
                    <Text>{dayjs(selectedLeave.approvedDate).format('DD/MM/YYYY')}</Text>
                  </Col>
                </>
              )}
              {selectedLeave.status === 'rejected' && (
                <>
                  <Col span={12}>
                    <Text strong>ไม่อนุมัติโดย:</Text>
                    <br />
                    <Text>{selectedLeave.rejectedBy}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>วันที่ไม่อนุมัติ:</Text>
                    <br />
                    <Text>{dayjs(selectedLeave.rejectedDate).format('DD/MM/YYYY')}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>เหตุผลที่ไม่อนุมัติ:</Text>
                    <br />
                    <Text type="danger">{selectedLeave.rejectedReason}</Text>
                  </Col>
                </>
              )}
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
}

// Section Card Component (same as profile)
function SectionCard({ title, children }) {
  return (
    <div style={{ 
      borderRadius: '12px',
      border: '1px solid #eaedf2',
      overflow: 'hidden',
      height: '100%',
      background: 'white'
    }}>
      <div style={{ 
        borderBottom: '1px solid #eaedf2',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fafbfd'
      }}>
        <Text strong style={{ fontSize: '15px', color: '#2b6cb0' }}>
          {title}
        </Text>
      </div>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}