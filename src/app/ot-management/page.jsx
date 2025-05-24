'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, Button, Typography, Space, Form, Select, DatePicker, 
  Input, TimePicker, Table, Tag, Avatar, Divider, Modal, message, 
  InputNumber, Radio, Switch
} from 'antd';
import { 
  ClockCircleOutlined, FileTextOutlined, PlusOutlined, 
  EyeOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined,
  ExclamationCircleOutlined, CloseCircleOutlined, UserOutlined,
  DownloadOutlined, CalendarOutlined, HourglassOutlined,
  DollarCircleOutlined, TeamOutlined
} from '@ant-design/icons';
import { Kanit } from 'next/font/google';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Font Loader
const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

export default function OvertimeRequest() {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('request');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOT, setSelectedOT] = useState(null);
  const [otType, setOtType] = useState('normal');

  // Employee data
  const employeeData = {
    name: 'Kittisak Priabying',
    position: 'Junior Full Stack Engineer',
    department: 'Information Technology Department',
    employeeId: '7984563211',
    email: 'kittisak.pri@tosakancorp.com',
    manager: 'Thanakrit Watcharapongwanich',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    managerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    hourlyRate: 125, // บาท/ชั่วโมง
  };

  // OT Types
  const otTypes = [
    { value: 'normal', label: 'OT ปกติ (วันจันทร์-ศุกร์)', rate: 1.5, color: '#52c41a' },
    { value: 'weekend', label: 'OT วันหยุดสุดสัปดาห์', rate: 2.0, color: '#1890ff' },
    { value: 'holiday', label: 'OT วันหยุดนักขัตฤกษ์', rate: 3.0, color: '#faad14' },
    { value: 'emergency', label: 'OT ฉุกเฉิน', rate: 2.5, color: '#f5222d' },
  ];

  // Mock OT history data
  const otHistory = [
    {
      id: 1,
      date: '2024-05-20',
      type: 'normal',
      startTime: '18:00',
      endTime: '21:00',
      totalHours: 3,
      breakTime: 0.5,
      actualHours: 2.5,
      reason: 'พัฒนาระบบใหม่ ต้องการเวลาเพิ่มเติมในการทดสอบ',
      project: 'โปรเจค E-Commerce Platform',
      status: 'approved',
      appliedDate: '2024-05-19',
      approvedBy: 'Thanakrit Watcharapongwanich',
      approvedDate: '2024-05-20',
      amount: 468.75 // 2.5 * 125 * 1.5
    },
    {
      id: 2,
      date: '2024-05-18',
      type: 'weekend',
      startTime: '09:00',
      endTime: '17:00',
      totalHours: 8,
      breakTime: 1,
      actualHours: 7,
      reason: 'แก้ไข Bug ด่วนก่อนส่งมอบลูกค้า',
      project: 'โปรเจค CRM System',
      status: 'approved',
      appliedDate: '2024-05-17',
      approvedBy: 'Thanakrit Watcharapongwanich',
      approvedDate: '2024-05-17',
      amount: 1750 // 7 * 125 * 2.0
    },
    {
      id: 3,
      date: '2024-05-25',
      type: 'normal',
      startTime: '18:30',
      endTime: '20:30',
      totalHours: 2,
      breakTime: 0,
      actualHours: 2,
      reason: 'ประชุมกับทีมต่างประเทศ เนื่องจากต่างเวลา',
      project: 'โปรเจค International API',
      status: 'pending',
      appliedDate: '2024-05-24',
    },
    {
      id: 4,
      date: '2024-05-15',
      type: 'holiday',
      startTime: '10:00',
      endTime: '16:00',
      totalHours: 6,
      breakTime: 1,
      actualHours: 5,
      reason: 'แก้ไขปัญหาระบบเซิร์ฟเวอร์ที่ล่ม',
      project: 'Infrastructure Maintenance',
      status: 'rejected',
      appliedDate: '2024-05-14',
      rejectedBy: 'Thanakrit Watcharapongwanich',
      rejectedDate: '2024-05-15',
      rejectedReason: 'ไม่ได้รับการอนุมัติล่วงหน้าสำหรับ OT วันหยุด'
    }
  ];

  // OT Summary
  const otSummary = {
    thisMonth: {
      totalHours: 15.5,
      normalHours: 8.5,
      weekendHours: 7,
      holidayHours: 0,
      totalAmount: 3218.75
    },
    lastMonth: {
      totalHours: 22,
      normalHours: 12,
      weekendHours: 6,
      holidayHours: 4,
      totalAmount: 4750
    },
    yearToDate: {
      totalHours: 98.5,
      totalAmount: 18456.25
    }
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

  const getOTTypeLabel = (type) => {
    const otType = otTypes.find(ot => ot.value === type);
    return otType ? otType.label : type;
  };

  const getOTTypeColor = (type) => {
    const otType = otTypes.find(ot => ot.value === type);
    return otType ? otType.color : '#d9d9d9';
  };

  const getOTRate = (type) => {
    const otType = otTypes.find(ot => ot.value === type);
    return otType ? otType.rate : 1;
  };

  const calculateOTAmount = (hours, type) => {
    const rate = getOTRate(type);
    return hours * employeeData.hourlyRate * rate;
  };

  const columns = [
    {
      title: 'วันที่',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <div>
          <div>{dayjs(date).format('DD/MM/YYYY')}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            {dayjs(date).format('dddd')}
          </div>
        </div>
      ),
    },
    {
      title: 'ประเภท OT',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={getOTTypeColor(type)}>
          {getOTTypeLabel(type)}
        </Tag>
      ),
    },
    {
      title: 'เวลา',
      key: 'time',
      render: (record) => (
        <div>
          <div>{record.startTime} - {record.endTime}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            {record.actualHours} ชั่วโมง
          </div>
        </div>
      ),
    },
    {
      title: 'โปรเจค',
      dataIndex: 'project',
      key: 'project',
      ellipsis: true,
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      align: 'right',
      render: (record) => (
        <div>
          {record.amount && (
            <Text strong style={{ color: '#52c41a' }}>
              ฿{record.amount.toLocaleString()}
            </Text>
          )}
          {record.status === 'pending' && (
            <Text style={{ color: '#faad14' }}>รอการอนุมัติ</Text>
          )}
        </div>
      ),
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
      title: 'การดำเนินการ',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewOT(record)}
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

  const handleViewOT = (record) => {
    setSelectedOT(record);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    const startTime = dayjs(values.startTime);
    const endTime = dayjs(values.endTime);
    const totalHours = endTime.diff(startTime, 'hour', true);
    const actualHours = totalHours - (values.breakTime || 0);
    const estimatedAmount = calculateOTAmount(actualHours, values.otType);

    console.log('OT request submitted:', {
      ...values,
      totalHours,
      actualHours,
      estimatedAmount
    });
    
    message.success('ส่งคำขอ OT สำเร็จ!');
    form.resetFields();
  };

  const handleOTTypeChange = (value) => {
    setOtType(value);
  };

  // Calculate estimated OT amount
  const watchedValues = Form.useWatch([], form);
  const estimatedAmount = React.useMemo(() => {
    if (watchedValues?.startTime && watchedValues?.endTime && watchedValues?.otType) {
      const startTime = dayjs(watchedValues.startTime);
      const endTime = dayjs(watchedValues.endTime);
      const totalHours = endTime.diff(startTime, 'hour', true);
      const actualHours = totalHours - (watchedValues.breakTime || 0);
      return calculateOTAmount(actualHours, watchedValues.otType);
    }
    return 0;
  }, [watchedValues]);

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
            <Title level={4} style={{ color: 'white', margin: '0 0 4px 0',fontFamily: 'Kanit, sans-serif'}}>
              ระบบขอทำ OT - {employeeData.name}
            </Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px' }}>
              {employeeData.position} | {employeeData.department}
            </Text>
          </div>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>
                {otSummary.thisMonth.totalHours}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                ชั่วโมง OT เดือนนี้
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>
                ฿{otSummary.thisMonth.totalAmount.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                ค่า OT เดือนนี้
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>
                ฿{employeeData.hourlyRate}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                อัตราต่อชั่วโมง
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
              <span>ส่งคำขอ OT</span>
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
              <ClockCircleOutlined />
              <span>ประวัติ OT</span>
            </div>
            <div 
              onClick={() => setActiveKey('summary')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'summary' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'summary' ? '500' : 'normal',
                borderBottom: activeKey === 'summary' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileTextOutlined />
              <span>สรุป OT</span>
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
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <SectionCard title="ส่งคำขอทำ OT">
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                      >
                        <Row gutter={[24, 16]}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              label="วันที่ทำ OT"
                              name="otDate"
                              rules={[{ required: true, message: 'กรุณาเลือกวันที่ทำ OT' }]}
                            >
                              <DatePicker 
                                style={{ width: '100%' }} 
                                size="large"
                                format="DD/MM/YYYY"
                                placeholder="เลือกวันที่"
                              />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24} sm={12}>
                            <Form.Item
                              label="ประเภท OT"
                              name="otType"
                              rules={[{ required: true, message: 'กรุณาเลือกประเภท OT' }]}
                            >
                              <Select 
                                placeholder="เลือกประเภท OT" 
                                size="large"
                                onChange={handleOTTypeChange}
                              >
                                {otTypes.map(type => (
                                  <Option key={type.value} value={type.value}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <Tag color={type.color} style={{ marginRight: 8 }}>
                                        {type.label}
                                      </Tag>
                                      <Text style={{ fontSize: '12px', color: '#666' }}>
                                        x{type.rate}
                                      </Text>
                                    </div>
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24} sm={8}>
                            <Form.Item
                              label="เวลาเริ่มต้น"
                              name="startTime"
                              rules={[{ required: true, message: 'กรุณาเลือกเวลาเริ่มต้น' }]}
                            >
                              <TimePicker 
                                style={{ width: '100%' }} 
                                size="large"
                                format="HH:mm"
                                placeholder="เวลาเริ่มต้น"
                              />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24} sm={8}>
                            <Form.Item
                              label="เวลาสิ้นสุด"
                              name="endTime"
                              rules={[{ required: true, message: 'กรุณาเลือกเวลาสิ้นสุด' }]}
                            >
                              <TimePicker 
                                style={{ width: '100%' }} 
                                size="large"
                                format="HH:mm"
                                placeholder="เวลาสิ้นสุด"
                              />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24} sm={8}>
                            <Form.Item
                              label="เวลาพักรับประทานอาหาร (ชั่วโมง)"
                              name="breakTime"
                              initialValue={0}
                            >
                              <InputNumber 
                                style={{ width: '100%' }} 
                                size="large"
                                min={0}
                                max={2}
                                step={0.5}
                                placeholder="0"
                              />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24}>
                            <Form.Item
                              label="โปรเจค/งานที่ทำ"
                              name="project"
                              rules={[{ required: true, message: 'กรุณาระบุโปรเจคหรืองานที่ทำ' }]}
                            >
                              <Input 
                                size="large"
                                placeholder="ระบุชื่อโปรเจคหรืองานที่ทำ OT..."
                              />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24}>
                            <Form.Item
                              label="เหตุผลในการทำ OT"
                              name="reason"
                              rules={[{ required: true, message: 'กรุณาระบุเหตุผลในการทำ OT' }]}
                            >
                              <TextArea 
                                rows={4} 
                                placeholder="กรุณาระบุเหตุผลในการทำ OT อย่างละเอียด..."
                                maxLength={500}
                                showCount
                              />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24}>
                            <Form.Item
                              label="การอนุมัติล่วงหน้า"
                              name="preApproval"
                              valuePropName="checked"
                            >
                              <Switch 
                                checkedChildren="ได้รับการอนุมัติแล้ว" 
                                unCheckedChildren="ยังไม่ได้อนุมัติ"
                              />
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
                              ส่งคำขอ OT
                            </Button>
                          </Space>
                        </div>
                      </Form>
                    </SectionCard>
                  </Col>
                  
                  <Col xs={24} lg={8}>
                    {/* OT Calculator */}
                    <SectionCard title="คำนวณค่า OT">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '20px' }}>
                          <HourglassOutlined style={{ fontSize: '48px', color: '#2b6cb0' }} />
                        </div>
                        
                        <div style={{ marginBottom: '16px' }}>
                          <Text style={{ fontSize: '14px', color: '#666' }}>
                            ค่า OT โดยประมาณ
                          </Text>
                          <div style={{ 
                            fontSize: '32px', 
                            fontWeight: '600', 
                            color: '#52c41a',
                            margin: '8px 0'
                          }}>
                            ฿{estimatedAmount.toLocaleString()}
                          </div>
                        </div>
                        
                        <Divider />
                        
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ marginBottom: '12px' }}>
                            <Text strong>อัตราการคำนวณ:</Text>
                          </div>
                          {otTypes.map(type => (
                            <div key={type.value} style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              marginBottom: '8px',
                              padding: '4px 0',
                              borderBottom: '1px solid #f0f0f0'
                            }}>
                              <Tag color={type.color} size="small">
                                {type.label}
                              </Tag>
                              <Text style={{ fontSize: '12px' }}>
                                ฿{employeeData.hourlyRate} x {type.rate}
                              </Text>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SectionCard>
                  </Col>
                </Row>
              </div>
            )}
            
            {activeKey === 'history' && (
              <div>
                <SectionCard title="ประวัติการทำ OT">
                  <Table
                    columns={columns}
                    dataSource={otHistory}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1200 }}
                  />
                </SectionCard>
              </div>
            )}
            
            {activeKey === 'summary' && (
              <div>
                <Row gutter={[24, 24]}>
                  {/* Monthly Summary */}
                  <Col xs={24} md={8}>
                    <SectionCard title="OT เดือนนี้">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', color: '#52c41a', fontWeight: '600' }}>
                          {otSummary.thisMonth.totalHours}
                        </div>
                        <div style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                          ชั่วโมง
                        </div>
                        <div style={{ fontSize: '24px', color: '#52c41a', fontWeight: '500' }}>
                          ฿{otSummary.thisMonth.totalAmount.toLocaleString()}
                        </div>
                        
                        <Divider />
                        
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <Text>OT ปกติ:</Text>
                            <Text strong>{otSummary.thisMonth.normalHours} ชม.</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <Text>OT วันหยุด:</Text>
                            <Text strong>{otSummary.thisMonth.weekendHours} ชม.</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text>OT นักขัตฤกษ์:</Text>
                            <Text strong>{otSummary.thisMonth.holidayHours} ชม.</Text>
                          </div>
                        </div>
                      </div>
                    </SectionCard>
                  </Col>
                  
                  {/* Last Month Summary */}
                  <Col xs={24} md={8}>
                    <SectionCard title="OT เดือนที่แล้ว">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', color: '#1890ff', fontWeight: '600' }}>
                          {otSummary.lastMonth.totalHours}
                        </div>
                        <div style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                         ชั่วโมง
                       </div>
                       <div style={{ fontSize: '24px', color: '#1890ff', fontWeight: '500' }}>
                         ฿{otSummary.lastMonth.totalAmount.toLocaleString()}
                       </div>
                       
                       <Divider />
                       
                       <div style={{ textAlign: 'left' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <Text>OT ปกติ:</Text>
                           <Text strong>{otSummary.lastMonth.normalHours} ชม.</Text>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <Text>OT วันหยุด:</Text>
                           <Text strong>{otSummary.lastMonth.weekendHours} ชม.</Text>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Text>OT นักขัตฤกษ์:</Text>
                           <Text strong>{otSummary.lastMonth.holidayHours} ชม.</Text>
                         </div>
                       </div>
                     </div>
                   </SectionCard>
                 </Col>
                 
                 {/* Year to Date Summary */}
                 <Col xs={24} md={8}>
                   <SectionCard title="OT สะสมปีนี้">
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '48px', color: '#faad14', fontWeight: '600' }}>
                         {otSummary.yearToDate.totalHours}
                       </div>
                       <div style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                         ชั่วโมง
                       </div>
                       <div style={{ fontSize: '24px', color: '#faad14', fontWeight: '500' }}>
                         ฿{otSummary.yearToDate.totalAmount.toLocaleString()}
                       </div>
                       
                       <Divider />
                       
                       <div>
                         <Text style={{ fontSize: '14px', color: '#666' }}>
                           ค่าเฉลี่ยต่อเดือน
                         </Text>
                         <div style={{ fontSize: '18px', fontWeight: '500', color: '#333' }}>
                           ฿{Math.round(otSummary.yearToDate.totalAmount / 5).toLocaleString()}
                         </div>
                       </div>
                     </div>
                   </SectionCard>
                 </Col>
                 
                 {/* OT Trend Chart Placeholder */}
                 <Col xs={24}>
                   <SectionCard title="แนวโน้มการทำ OT">
                     <div style={{ 
                       height: '200px', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center',
                       background: '#fafbfd',
                       borderRadius: '8px',
                       border: '2px dashed #d9d9d9'
                     }}>
                       <div style={{ textAlign: 'center', color: '#999' }}>
                         <CalendarOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                         <div>กราฟแสดงแนวโน้มการทำ OT</div>
                         <div style={{ fontSize: '12px', marginTop: '8px' }}>
                           (สามารถเพิ่ม Chart Library เช่น Chart.js หรือ Recharts)
                         </div>
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

     {/* OT Detail Modal */}
     <Modal
       title="รายละเอียดการทำ OT"
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
       width={700}
     >
       {selectedOT && (
         <div>
           <Row gutter={[16, 16]}>
             <Col span={12}>
               <Text strong>วันที่:</Text>
               <br />
               <Text>{dayjs(selectedOT.date).format('DD/MM/YYYY (dddd)')}</Text>
             </Col>
             <Col span={12}>
               <Text strong>ประเภท OT:</Text>
               <br />
               <Tag color={getOTTypeColor(selectedOT.type)}>
                 {getOTTypeLabel(selectedOT.type)}
               </Tag>
             </Col>
             <Col span={12}>
               <Text strong>เวลาเริ่มต้น:</Text>
               <br />
               <Text>{selectedOT.startTime}</Text>
             </Col>
             <Col span={12}>
               <Text strong>เวลาสิ้นสุด:</Text>
               <br />
               <Text>{selectedOT.endTime}</Text>
             </Col>
             <Col span={12}>
               <Text strong>รวมเวลาทำงาน:</Text>
               <br />
               <Text>{selectedOT.totalHours} ชั่วโมง</Text>
             </Col>
             <Col span={12}>
               <Text strong>เวลาพักรับประทานอาหาร:</Text>
               <br />
               <Text>{selectedOT.breakTime} ชั่วโมง</Text>
             </Col>
             <Col span={12}>
               <Text strong>เวลา OT ที่นับได้:</Text>
               <br />
               <Text strong style={{ color: '#52c41a' }}>{selectedOT.actualHours} ชั่วโมง</Text>
             </Col>
             <Col span={12}>
               <Text strong>สถานะ:</Text>
               <br />
               <Tag 
                 icon={getStatusIcon(selectedOT.status)}
                 color={getStatusColor(selectedOT.status)}
               >
                 {getStatusText(selectedOT.status)}
               </Tag>
             </Col>
             <Col span={24}>
               <Text strong>โปรเจค/งานที่ทำ:</Text>
               <br />
               <Text>{selectedOT.project}</Text>
             </Col>
             <Col span={24}>
               <Text strong>เหตุผล:</Text>
               <br />
               <Text>{selectedOT.reason}</Text>
             </Col>
             {selectedOT.amount && (
               <Col span={24}>
                 <div style={{ 
                   background: '#f6ffed', 
                   border: '1px solid #b7eb8f',
                   borderRadius: '6px',
                   padding: '16px',
                   textAlign: 'center'
                 }}>
                   <Text strong style={{ fontSize: '16px' }}>ค่า OT ที่ได้รับ</Text>
                   <div style={{ 
                     fontSize: '28px', 
                     fontWeight: '600', 
                     color: '#52c41a',
                     margin: '8px 0'
                   }}>
                     ฿{selectedOT.amount.toLocaleString()}
                   </div>
                   <Text style={{ fontSize: '12px', color: '#666' }}>
                     {selectedOT.actualHours} ชม. × ฿{employeeData.hourlyRate} × {getOTRate(selectedOT.type)}
                   </Text>
                 </div>
               </Col>
             )}
             {selectedOT.status === 'approved' && (
               <>
                 <Col span={12}>
                   <Text strong>อนุมัติโดย:</Text>
                   <br />
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Avatar src={employeeData.managerAvatar} size="small" />
                     <Text>{selectedOT.approvedBy}</Text>
                   </div>
                 </Col>
                 <Col span={12}>
                   <Text strong>วันที่อนุมัติ:</Text>
                   <br />
                   <Text>{dayjs(selectedOT.approvedDate).format('DD/MM/YYYY')}</Text>
                 </Col>
               </>
             )}
             {selectedOT.status === 'rejected' && (
               <>
                 <Col span={12}>
                   <Text strong>ไม่อนุมัติโดย:</Text>
                   <br />
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Avatar src={employeeData.managerAvatar} size="small" />
                     <Text>{selectedOT.rejectedBy}</Text>
                   </div>
                 </Col>
                 <Col span={12}>
                   <Text strong>วันที่ไม่อนุมัติ:</Text>
                   <br />
                   <Text>{dayjs(selectedOT.rejectedDate).format('DD/MM/YYYY')}</Text>
                 </Col>
                 <Col span={24}>
                   <Text strong>เหตุผลที่ไม่อนุมัติ:</Text>
                   <br />
                   <div style={{ 
                     background: '#fff2f0', 
                     border: '1px solid #ffccc7',
                     borderRadius: '6px',
                     padding: '12px',
                     marginTop: '8px'
                   }}>
                     <Text type="danger">{selectedOT.rejectedReason}</Text>
                   </div>
                 </Col>
               </>
             )}
             <Col span={24}>
               <Text strong>วันที่ส่งคำขอ:</Text>
               <br />
               <Text>{dayjs(selectedOT.appliedDate).format('DD/MM/YYYY HH:mm')}</Text>
             </Col>
           </Row>
         </div>
       )}
     </Modal>
   </div>
 );
}

// Section Card Component (same as previous)
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