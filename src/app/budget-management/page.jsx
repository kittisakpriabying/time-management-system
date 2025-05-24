'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, Button, Typography, Space, Form, Select, DatePicker, 
  Input, InputNumber, Table, Tag, Avatar, Divider, Modal, message, 
  Steps, Upload, Progress, Timeline, Tooltip, Badge
} from 'antd';
import { 
  DollarCircleOutlined, FileTextOutlined, PlusOutlined, UploadOutlined,
  EyeOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined,
  ClockCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined,
  UserOutlined, DownloadOutlined, CalendarOutlined, BankOutlined,
  AuditOutlined, TeamOutlined, CrownOutlined, SafetyCertificateOutlined,
  BarChartOutlined, AlertOutlined, FileProtectOutlined
} from '@ant-design/icons';
import { Kanit } from 'next/font/google';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

// Font Loader
const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

export default function BudgetRequest() {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('request');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [budgetType, setBudgetType] = useState('');

  // Employee data
  const employeeData = {
    name: 'Kittisak Priabying',
    position: 'Junior Full Stack Engineer',
    department: 'Information Technology Department',
    employeeId: '7984563211',
    email: 'kittisak.pri@tosakancorp.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  // Approval Workflow
  const approvalLevels = [
    { 
      level: 1, 
      title: 'หัวหน้างาน', 
      name: 'Somchai Jaidee',
      email: 'somchai.jai@tosakancorp.com',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      icon: <TeamOutlined />,
      color: '#52c41a'
    },
    { 
      level: 2, 
      title: 'ผู้จัดการแผนก', 
      name: 'Thanakrit Watcharapongwanich',
      email: 'thanakrit.wat@tosakancorp.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      icon: <UserOutlined />,
      color: '#1890ff'
    },
    { 
      level: 3, 
      title: 'เจ้าหน้าที่การเงิน', 
      name: 'Siriporn Thanakit',
      email: 'siriporn.tha@tosakancorp.com',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      icon: <DollarCircleOutlined />,
      color: '#faad14'
    },
    { 
      level: 4, 
      title: 'ผู้จัดการบัญชี', 
      name: 'Wanida Suksawat',
      email: 'wanida.suk@tosakancorp.com',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      icon: <AuditOutlined />,
      color: '#722ed1'
    },
    { 
      level: 5, 
      title: 'ผู้บริหาร', 
      name: 'Praphan Mongkolchai',
      email: 'praphan.mon@tosakancorp.com',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      icon: <CrownOutlined />,
      color: '#eb2f96'
    },
    { 
      level: 6, 
      title: 'กรรมการผู้จัดการ', 
      name: 'Suriya Tosakan',
      email: 'suriya.tos@tosakancorp.com',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      icon: <SafetyCertificateOutlined />,
      color: '#f5222d'
    },
    { 
      level: 7, 
      title: 'ประธานกรรมการ', 
      name: 'Chairat Siamchai',
      email: 'chairat.sia@tosakancorp.com',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
      icon: <BankOutlined />,
      color: '#13c2c2'
    }
  ];

  // Budget categories
  const budgetCategories = [
    { value: 'equipment', label: 'อุปกรณ์และเครื่องมือ', icon: '🔧', color: '#52c41a', limit: 100000 },
    { value: 'software', label: 'ซอฟต์แวร์และลิขสิทธิ์', icon: '💻', color: '#1890ff', limit: 500000 },
    { value: 'training', label: 'การฝึกอบรม', icon: '📚', color: '#faad14', limit: 50000 },
    { value: 'marketing', label: 'การตลาดและโฆษณา', icon: '📢', color: '#eb2f96', limit: 200000 },
    { value: 'travel', label: 'ค่าเดินทาง', icon: '✈️', color: '#722ed1', limit: 30000 },
    { value: 'maintenance', label: 'การบำรุงรักษา', icon: '🔨', color: '#fa8c16', limit: 150000 },
    { value: 'consulting', label: 'ค่าที่ปรึกษา', icon: '👥', color: '#13c2c2', limit: 300000 },
    { value: 'other', label: 'อื่นๆ', icon: '📋', color: '#666666', limit: 75000 }
  ];

  // Mock budget request data
  const budgetHistory = [
    {
      id: 1,
      requestNumber: 'BR-2024-001',
      title: 'ซื้อเซิร์ฟเวอร์สำหรับระบบใหม่',
      category: 'equipment',
      amount: 250000,
      requestDate: '2024-05-15',
      urgency: 'high',
      status: 'approved',
      currentLevel: 7,
      approvals: [
        { level: 1, approver: 'Somchai Jaidee', date: '2024-05-16', status: 'approved', comment: 'อนุมัติเห็นด้วยกับความจำเป็น' },
        { level: 2, approver: 'Thanakrit Watcharapongwanich', date: '2024-05-17', status: 'approved', comment: 'เป็นการลงทุนที่จำเป็น' },
        { level: 3, approver: 'Siriporn Thanakit', date: '2024-05-18', status: 'approved', comment: 'งบประมาณเพียงพอ' },
        { level: 4, approver: 'Wanida Suksawat', date: '2024-05-19', status: 'approved', comment: 'ผ่านการตรวจสอบทางบัญชี' },
        { level: 5, approver: 'Praphan Mongkolchai', date: '2024-05-20', status: 'approved', comment: 'อนุมัติตามนโยบายบริษัท' },
        { level: 6, approver: 'Suriya Tosakan', date: '2024-05-21', status: 'approved', comment: 'อนุมัติเพื่อการพัฒนาธุรกิจ' },
        { level: 7, approver: 'Chairat Siamchai', date: '2024-05-22', status: 'approved', comment: 'อนุมัติการลงทุนนี้' }
      ]
    },
    {
      id: 2,
      requestNumber: 'BR-2024-002',
      title: 'อบรมพนักงานด้าน AI และ Machine Learning',
      category: 'training',
      amount: 85000,
      requestDate: '2024-05-20',
      urgency: 'medium',
      status: 'in_progress',
      currentLevel: 3,
      approvals: [
        { level: 1, approver: 'Somchai Jaidee', date: '2024-05-21', status: 'approved', comment: 'จำเป็นสำหรับการพัฒนาทีม' },
        { level: 2, approver: 'Thanakrit Watcharapongwanich', date: '2024-05-22', status: 'approved', comment: 'สนับสนุนการพัฒนาบุคลากร' },
        { level: 3, approver: 'Siriporn Thanakit', date: null, status: 'pending', comment: null }
      ]
    },
    {
      id: 3,
      requestNumber: 'BR-2024-003',
      title: 'ซื้อซอฟต์แวร์ Design และ Development Tools',
      category: 'software',
      amount: 120000,
      requestDate: '2024-05-25',
      urgency: 'low',
      status: 'rejected',
      currentLevel: 2,
      approvals: [
        { level: 1, approver: 'Somchai Jaidee', date: '2024-05-26', status: 'approved', comment: 'เห็นด้วยกับการใช้เครื่องมือที่ดี' },
        { level: 2, approver: 'Thanakrit Watcharapongwanich', date: '2024-05-27', status: 'rejected', comment: 'งบประมาณไม่เพียงพอในไตรมาสนี้' }
      ]
    }
  ];

  // Budget summary
  const budgetSummary = {
    thisMonth: {
      requested: 455000,
      approved: 250000,
      pending: 85000,
      rejected: 120000
    },
    thisQuarter: {
      budget: 2000000,
      used: 1250000,
      remaining: 750000,
      utilization: 62.5
    },
    categories: [
      { category: 'equipment', used: 450000, budget: 800000 },
      { category: 'software', used: 300000, budget: 600000 },
      { category: 'training', used: 150000, budget: 300000 },
      { category: 'marketing', used: 200000, budget: 400000 },
      { category: 'other', used: 150000, budget: 300000 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#52c41a';
      case 'in_progress': return '#faad14';
      case 'rejected': return '#f5222d';
      case 'draft': return '#d9d9d9';
      default: return '#d9d9d9';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircleOutlined />;
      case 'in_progress': return <ClockCircleOutlined />;
      case 'rejected': return <CloseCircleOutlined />;
      case 'draft': return <EditOutlined />;
      default: return <ExclamationCircleOutlined />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'อนุมัติแล้ว';
      case 'in_progress': return 'อยู่ระหว่างอนุมัติ';
      case 'rejected': return 'ไม่อนุมัติ';
      case 'draft': return 'ร่าง';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#f5222d';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'high': return 'ด่วนมาก';
      case 'medium': return 'ปานกลาง';
      case 'low': return 'ไม่ด่วน';
      default: return 'ปกติ';
    }
  };

  const getCategoryInfo = (categoryValue) => {
    return budgetCategories.find(cat => cat.value === categoryValue);
  };

  const getApprovalProgress = (approvals, currentLevel) => {
    const completedLevels = approvals.filter(app => app.status === 'approved').length;
    return (completedLevels / 7) * 100;
  };

  const columns = [
    {
      title: 'เลขที่คำขอ',
      dataIndex: 'requestNumber',
      key: 'requestNumber',
      render: (text) => <Text strong style={{ color: '#2b6cb0' }}>{text}</Text>,
    },
    {
      title: 'รายการ',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: '500' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {getCategoryInfo(record.category)?.icon} {getCategoryInfo(record.category)?.label}
          </div>
        </div>
      ),
    },
    {
      title: 'จำนวนเงิน',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount) => (
        <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
          ฿{amount.toLocaleString()}
        </Text>
      ),
    },
    {
      title: 'ความเร่งด่วน',
      dataIndex: 'urgency',
      key: 'urgency',
      align: 'center',
      render: (urgency) => (
        <Tag color={getUrgencyColor(urgency)}>
          {getUrgencyText(urgency)}
        </Tag>
      ),
    },
    {
      title: 'ความคืบหน้า',
      key: 'progress',
      align: 'center',
      render: (_, record) => (
        <div style={{ width: '100px' }}>
          <Progress 
            percent={getApprovalProgress(record.approvals, record.currentLevel)} 
            size="small"
            status={record.status === 'rejected' ? 'exception' : 'active'}
            format={() => `${record.currentLevel}/7`}
          />
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
      title: 'วันที่ส่งคำขอ',
      dataIndex: 'requestDate',
      key: 'requestDate',
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
            onClick={() => handleViewBudget(record)}
            style={{ color: '#2b6cb0' }}
          />
          {record.status === 'draft' && (
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

  const handleViewBudget = (record) => {
    setSelectedBudget(record);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    const newRequestNumber = `BR-2024-${String(budgetHistory.length + 1).padStart(3, '0')}`;
    console.log('Budget request submitted:', {
      ...values,
      requestNumber: newRequestNumber,
      employeeData
    });
    
    message.success('ส่งคำขออนุมัติงบประมาณสำเร็จ!');
    form.resetFields();
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
              ระบบขออนุมัติงบประมาณ - {employeeData.name}
            </Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px' }}>
              {employeeData.position} | {employeeData.department}
            </Text>
          </div>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>
                ฿{budgetSummary.thisQuarter.remaining.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                งบคงเหลือไตรมาส
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>
                {budgetSummary.thisQuarter.utilization}%
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                การใช้งบประมาณ
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>
                {budgetHistory.filter(b => b.status === 'in_progress').length}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                คำขอรออนุมัติ
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
              <span>ส่งคำขอ</span>
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
              <FileTextOutlined />
              <span>ประวัติคำขอ</span>
            </div>
            <div 
              onClick={() => setActiveKey('workflow')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'workflow' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'workflow' ? '500' : 'normal',
                borderBottom: activeKey === 'workflow' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AuditOutlined />
              <span>ขั้นตอนอนุมัติ</span>
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
              <BarChartOutlined />
              <span>สรุปงบประมาณ</span>
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
                <SectionCard title="ส่งคำขออนุมัติงบประมาณ">
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: '1000px' }}
                  >
                    <Row gutter={[24, 16]}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="หมวดหมู่งบประมาณ"
                          name="category"
                          rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่' }]}
                        >
                          <Select 
                            placeholder="เลือกหมวดหมู่งบประมาณ" 
                            size="large"
                            onChange={setBudgetType}
                          >
                            {budgetCategories.map(category => (
                              <Option key={category.value} value={category.value}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div>
                                    <span style={{ marginRight: '8px' }}>{category.icon}</span>
                                    {category.label}
                                  </div>
                                  <Text style={{ fontSize: '12px', color: '#666' }}>
                                    วงเงิน ฿{category.limit.toLocaleString()}
                                  </Text>
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="ความเร่งด่วน"
                          name="urgency"
                          rules={[{ required: true, message: 'กรุณาเลือกความเร่งด่วน' }]}
                        >
                          <Select placeholder="เลือกความเร่งด่วน" size="large">
                            <Option value="low">
                              <Tag color="#52c41a">ไม่ด่วน</Tag>
                            </Option>
                            <Option value="medium">
                              <Tag color="#faad14">ปานกลาง</Tag>
                            </Option>
                            <Option value="high">
                              <Tag color="#f5222d">ด่วนมาก</Tag>
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24}>
                        <Form.Item
                          label="ชื่อรายการ/โครงการ"
                          name="title"
                          rules={[{ required: true, message: 'กรุณาระบุชื่อรายการ' }]}
                        >
                          <Input 
                            size="large"
                            placeholder="ระบุชื่อรายการหรือโครงการที่ขอจัดซื้อ..."
                          />
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="จำนวนเงินที่ขอ (บาท)"
                          name="amount"
                          rules={[
                            { required: true, message: 'กรุณาระบุจำนวนเงิน' },
                            { type: 'number', min: 1, message: 'จำนวนเงินต้องมากกว่า 0' }
                          ]}
                        >
                          <InputNumber 
                            style={{ width: '100%' }}
                            size="large"
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/฿\s?|(,*)/g, '')}
                            placeholder="0"
                          />
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="วันที่ต้องการใช้งบ"
                          name="requiredDate"
                          rules={[{ required: true, message: 'กรุณาเลือกวันที่' }]}
                        >
                          <DatePicker 
                            style={{ width: '100%' }}
                            size="large"
                            format="DD/MM/YYYY"
                            placeholder="วันที่ต้องการใช้งบ"
                          />
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24}>
                        <Form.Item
                          label="รายละเอียดและเหตุผล"
                          name="description"
                          rules={[{ required: true, message: 'กรุณาระบุรายละเอียด' }]}
                        >
                          <TextArea 
                            rows={5} 
                            placeholder="กรุณาระบุรายละเอียดการใช้งบประมาณ เหตุผลความจำเป็น และประโยชน์ที่คาดว่าจะได้รับ..."
                            maxLength={1000}
                            showCount
                          />
                        </Form.Item>
                      </Col>
                     <Col xs={24}>
                       <Form.Item
                         label="เอกสารแนบ"
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
                             รองรับไฟล์ PDF, Excel, Word, รูปภาพ ขนาดไม่เกิน 10MB ต่อไฟล์
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
                         size="large"
                         style={{ 
                           background: '#f0f0f0',
                           borderColor: '#d9d9d9'
                         }}
                       >
                         บันทึกร่าง
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
                         ส่งคำขออนุมัติ
                       </Button>
                     </Space>
                   </div>
                 </Form>
               </SectionCard>
             </div>
           )}
           
           {activeKey === 'history' && (
             <div>
               <SectionCard title="ประวัติคำขออนุมัติงบประมาณ">
                 <Table
                   columns={columns}
                   dataSource={budgetHistory}
                   rowKey="id"
                   pagination={{ pageSize: 10 }}
                   scroll={{ x: 1400 }}
                 />
               </SectionCard>
             </div>
           )}
           
           {activeKey === 'workflow' && (
             <div>
               <SectionCard title="ขั้นตอนการอนุมัติงบประมาณ">
                 <div style={{ marginBottom: '24px' }}>
                   <Text style={{ fontSize: '16px', color: '#666' }}>
                     คำขออนุมัติงบประมาณจะต้องผ่านการอนุมัติ 7 ขั้นตอนตามลำดับ
                   </Text>
                 </div>
                 
                 <Steps
                   direction="vertical"
                   size="small"
                   current={-1}
                 >
                   {approvalLevels.map((level, index) => (
                     <Step
                       key={level.level}
                       title={
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                           <div style={{ 
                             background: level.color,
                             color: 'white',
                             borderRadius: '50%',
                             width: '32px',
                             height: '32px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center'
                           }}>
                             {level.icon}
                           </div>
                           <div>
                             <div style={{ fontWeight: '600', fontSize: '16px' }}>
                               {level.title}
                             </div>
                             <div style={{ color: '#666', fontSize: '14px' }}>
                               {level.name}
                             </div>
                           </div>
                         </div>
                       }
                       description={
                         <div style={{ marginLeft: '44px' }}>
                           <Text style={{ color: '#666' }}>{level.email}</Text>
                           <div style={{ marginTop: '8px' }}>
                             <Tag color={level.color}>ขั้นที่ {level.level}</Tag>
                             {index === 0 && <Tag color="green">ขั้นแรก</Tag>}
                             {index === approvalLevels.length - 1 && <Tag color="red">ขั้นสุดท้าย</Tag>}
                           </div>
                         </div>
                       }
                     />
                   ))}
                 </Steps>
                 
                 <Divider />
                 
                 <div style={{ background: '#f6ffed', padding: '16px', borderRadius: '6px', border: '1px solid #b7eb8f' }}>
                   <Text strong style={{ color: '#52c41a' }}>📋 หมายเหตุ:</Text>
                   <ul style={{ marginTop: '8px', marginBottom: '0', color: '#666' }}>
                     <li>คำขออนุมัติจะต้องผ่านการอนุมัติครบทุกขั้นตอน</li>
                     <li>หากมีการไม่อนุมัติในขั้นตอนใดก็จะหยุดกระบวนการ</li>
                     <li>ผู้อนุมัติสามารถเพิ่มความเห็นและข้อเสนอแนะได้</li>
                     <li>ระยะเวลาในการพิจารณาแต่ละขั้นตอนคือ 3-5 วันทำการ</li>
                   </ul>
                 </div>
               </SectionCard>
             </div>
           )}
           
           {activeKey === 'summary' && (
             <div>
               <Row gutter={[24, 24]}>
                 {/* Budget Overview */}
                 <Col xs={24} lg={8}>
                   <SectionCard title="สรุปงบประมาณไตรมาส">
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '48px', color: '#2b6cb0', fontWeight: '600' }}>
                         {budgetSummary.thisQuarter.utilization}%
                       </div>
                       <div style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                         การใช้งบประมาณ
                       </div>
                       
                       <Progress 
                         percent={budgetSummary.thisQuarter.utilization} 
                         strokeColor={{
                           '0%': '#52c41a',
                           '50%': '#faad14',
                           '100%': '#f5222d',
                         }}
                         strokeWidth={12}
                       />
                       
                       <div style={{ marginTop: '16px', textAlign: 'left' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <Text>งบประมาณทั้งหมด:</Text>
                           <Text strong>฿{budgetSummary.thisQuarter.budget.toLocaleString()}</Text>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <Text>ใช้ไปแล้ว:</Text>
                           <Text strong style={{ color: '#f5222d' }}>฿{budgetSummary.thisQuarter.used.toLocaleString()}</Text>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Text>คงเหลือ:</Text>
                           <Text strong style={{ color: '#52c41a' }}>฿{budgetSummary.thisQuarter.remaining.toLocaleString()}</Text>
                         </div>
                       </div>
                     </div>
                   </SectionCard>
                 </Col>
                 
                 {/* Monthly Summary */}
                 <Col xs={24} lg={8}>
                   <SectionCard title="สรุปคำขอเดือนนี้">
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '48px', color: '#52c41a', fontWeight: '600' }}>
                         ฿{budgetSummary.thisMonth.approved.toLocaleString()}
                       </div>
                       <div style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                         ได้รับอนุมัติ
                       </div>
                       
                       <div style={{ textAlign: 'left' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <Text>ขอทั้งหมด:</Text>
                           <Text>฿{budgetSummary.thisMonth.requested.toLocaleString()}</Text>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <Text style={{ color: '#52c41a' }}>อนุมัติแล้ว:</Text>
                           <Text strong style={{ color: '#52c41a' }}>฿{budgetSummary.thisMonth.approved.toLocaleString()}</Text>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <Text style={{ color: '#faad14' }}>รออนุมัติ:</Text>
                           <Text strong style={{ color: '#faad14' }}>฿{budgetSummary.thisMonth.pending.toLocaleString()}</Text>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Text style={{ color: '#f5222d' }}>ไม่อนุมัติ:</Text>
                           <Text strong style={{ color: '#f5222d' }}>฿{budgetSummary.thisMonth.rejected.toLocaleString()}</Text>
                         </div>
                       </div>
                     </div>
                   </SectionCard>
                 </Col>
                 
                 {/* Category Breakdown */}
                 <Col xs={24} lg={8}>
                   <SectionCard title="การใช้งบตามหมวดหมู่">
                     <div>
                       {budgetSummary.categories.map(cat => {
                         const categoryInfo = getCategoryInfo(cat.category);
                         const utilization = (cat.used / cat.budget) * 100;
                         
                         return (
                           <div key={cat.category} style={{ marginBottom: '16px' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                               <Text>
                                 {categoryInfo?.icon} {categoryInfo?.label}
                               </Text>
                               <Text strong>{utilization.toFixed(1)}%</Text>
                             </div>
                             <Progress 
                               percent={utilization} 
                               size="small"
                               strokeColor={categoryInfo?.color}
                             />
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                               <span>฿{cat.used.toLocaleString()}</span>
                               <span>฿{cat.budget.toLocaleString()}</span>
                             </div>
                           </div>
                         );
                       })}
                     </div>
                   </SectionCard>
                 </Col>
               </Row>
             </div>
           )}
         </div>
       </div>
     </div>

     {/* Budget Detail Modal */}
     <Modal
       title={
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <FileProtectOutlined style={{ color: '#2b6cb0' }} />
           <span>รายละเอียดคำขออนุมัติงบประมาณ</span>
         </div>
       }
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
           ดาวน์โหลดรายงาน
         </Button>
       ]}
       width={900}
     >
       {selectedBudget && (
         <div>
           {/* Basic Information */}
           <div style={{ marginBottom: '24px' }}>
             <Row gutter={[16, 16]}>
               <Col span={12}>
                 <Text strong>เลขที่คำขอ:</Text>
                 <br />
                 <Text style={{ fontSize: '16px', color: '#2b6cb0' }}>{selectedBudget.requestNumber}</Text>
               </Col>
               <Col span={12}>
                 <Text strong>สถานะปัจจุบัน:</Text>
                 <br />
                 <Tag 
                   icon={getStatusIcon(selectedBudget.status)}
                   color={getStatusColor(selectedBudget.status)}
                   style={{ fontSize: '14px', padding: '4px 12px' }}
                 >
                   {getStatusText(selectedBudget.status)}
                 </Tag>
               </Col>
               <Col span={12}>
                 <Text strong>หมวดหมู่:</Text>
                 <br />
                 <div>
                   {getCategoryInfo(selectedBudget.category)?.icon} {getCategoryInfo(selectedBudget.category)?.label}
                 </div>
               </Col>
               <Col span={12}>
                 <Text strong>ความเร่งด่วน:</Text>
                 <br />
                 <Tag color={getUrgencyColor(selectedBudget.urgency)}>
                   {getUrgencyText(selectedBudget.urgency)}
                 </Tag>
               </Col>
               <Col span={12}>
                 <Text strong>จำนวนเงิน:</Text>
                 <br />
                 <Text style={{ fontSize: '20px', fontWeight: '600', color: '#52c41a' }}>
                   ฿{selectedBudget.amount.toLocaleString()}
                 </Text>
               </Col>
               <Col span={12}>
                 <Text strong>วันที่ส่งคำขอ:</Text>
                 <br />
                 <Text>{dayjs(selectedBudget.requestDate).format('DD/MM/YYYY')}</Text>
               </Col>
               <Col span={24}>
                 <Text strong>รายการ:</Text>
                 <br />
                 <Text style={{ fontSize: '16px' }}>{selectedBudget.title}</Text>
               </Col>
             </Row>
           </div>

           <Divider />

           {/* Approval Progress */}
           <div style={{ marginBottom: '24px' }}>
             <Title level={5} style={{ color: '#2b6cb0', marginBottom: '16px', fontStyle: 'italic' }}>
               ความคืบหน้าการอนุมัติ
             </Title>
             
             {/* <div style={{ marginBottom: '16px' }}>
               <Progress 
                 percent={getApprovalProgress(selectedBudget.approvals, selectedBudget.currentLevel)} 
                 strokeColor={{
                   '0%': '#52c41a',
                   '50%': '#1890ff',
                   '100%': '#722ed1',
                 }}
                 format={() => `${selectedBudget.approvals.filter(a => a.status === 'approved').length}/7`}
               />
             </div> */}

             <Timeline>
               {approvalLevels.map(level => {
                 const approval = selectedBudget.approvals.find(a => a.level === level.level);
                 
                 return (
                   <Timeline.Item
                     key={level.level}
                     dot={
                       <div style={{
                         background: approval?.status === 'approved' ? '#52c41a' : 
                                   approval?.status === 'rejected' ? '#f5222d' :
                                   approval?.status === 'pending' ? '#faad14' : '#d9d9d9',
                         color: 'white',
                         borderRadius: '50%',
                         width: '32px',
                         height: '32px',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         border: '2px solid white',
                         boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                       }}>
                         {approval?.status === 'approved' ? <CheckCircleOutlined /> :
                          approval?.status === 'rejected' ? <CloseCircleOutlined /> :
                          approval?.status === 'pending' ? <ClockCircleOutlined /> :
                          level.icon}
                       </div>
                     }
                     color={approval?.status === 'approved' ? '#52c41a' : 
                            approval?.status === 'rejected' ? '#f5222d' :
                            approval?.status === 'pending' ? '#faad14' : '#d9d9d9'}
                   >
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <Avatar src={level.avatar} size="small" />
                       <div style={{ flex: 1 }}>
                         <div style={{ fontWeight: '500' }}>
                           {level.title}: {level.name}
                         </div>
                         {approval?.date && (
                           <div style={{ fontSize: '12px', color: '#666' }}>
                             {dayjs(approval.date).format('DD/MM/YYYY HH:mm')}
                           </div>
                         )}
                         {approval?.comment && (
                           <div style={{ 
                             fontSize: '14px', 
                             color: '#666', 
                             marginTop: '4px',
                             fontStyle: 'italic'
                           }}>
                             💬 "{approval.comment}"
                           </div>
                         )}
                         {approval?.status === 'pending' && (
                           <Tag color="#faad14" size="small" style={{ marginTop: '4px' }}>
                             รอการพิจารณา
                           </Tag>
                         )}
                         {!approval && selectedBudget.status === 'in_progress' && level.level > selectedBudget.currentLevel && (
                           <Tag color="#d9d9d9" size="small" style={{ marginTop: '4px' }}>
                             ยังไม่ถึงขั้นตอน
                           </Tag>
                         )}
                       </div>
                     </div>
                   </Timeline.Item>
                 );
               })}
             </Timeline>
           </div>
         </div>
       )}
     </Modal>
   </div>
 );
}

// Section Card Component
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