'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, Button, Typography, Space, Form, Select, DatePicker, 
  Input, Table, Tag, Avatar, Divider, Modal, message, 
  TimePicker, Checkbox, Image, Calendar, Badge, Tooltip, InputNumber
} from 'antd';
import { 
    CalendarOutlined, TeamOutlined, PlusOutlined, EnvironmentOutlined,
    EyeOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined,
    ClockCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined,
    UserOutlined, DownloadOutlined, VideoCameraOutlined, 
    WifiOutlined, DesktopOutlined, PhoneOutlined, CoffeeOutlined,
    PlaySquareOutlined, SoundOutlined, 
    CloudOutlined,
    CarOutlined, SecurityScanOutlined, BankOutlined, HomeOutlined
  } from '@ant-design/icons';
import { Kanit } from 'next/font/google';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = TimePicker;

// Font Loader
const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

export default function MeetingRoomBooking() {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('booking');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Employee data
  const employeeData = {
    name: 'Kittisak Priabying',
    position: 'Junior Full Stack Engineer',
    department: 'Information Technology Department',
    employeeId: '7984563211',
    email: 'kittisak.pri@tosakancorp.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  // Meeting rooms data
  const meetingRooms = [
    {
      id: 1,
      name: 'Conference Room A',
      capacity: 12,
      floor: 'ชั้น 5',
      location: 'อาคาร A',
      type: 'conference',
      facilities: ['projector', 'whiteboard', 'ac', 'wifi', 'video', 'sound'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      hourlyRate: 500,
      description: 'ห้องประชุมใหญ่พร้อมอุปกรณ์ครบครัน เหมาะสำหรับการประชุมสำคัญ',
      availability: 'available'
    },
    {
      id: 2,
      name: 'Meeting Room B',
      capacity: 8,
      floor: 'ชั้น 3',
      location: 'อาคาร A',
      type: 'meeting',
      facilities: ['tv', 'whiteboard', 'ac', 'wifi', 'coffee'],
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400',
      hourlyRate: 300,
      description: 'ห้องประชุมขนาดกลาง เหมาะสำหรับทีมเล็ก',
      availability: 'available'
    },
    {
      id: 3,
      name: 'Executive Room',
      capacity: 6,
      floor: 'ชั้น 7',
      location: 'อาคาร B',
      type: 'executive',
      facilities: ['projector', 'tv', 'ac', 'wifi', 'video', 'sound', 'coffee'],
      image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=400',
      hourlyRate: 800,
      description: 'ห้องประชุมผู้บริหาร หรูหราพร้อมสิ่งอำนวยความสะดวกครบครัน',
      availability: 'busy'
    },
    {
      id: 4,
      name: 'Training Room',
      capacity: 20,
      floor: 'ชั้น 2',
      location: 'อาคาร A',
      type: 'training',
      facilities: ['projector', 'sound', 'ac', 'wifi', 'whiteboard'],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400',
      hourlyRate: 400,
      description: 'ห้องอบรมขนาดใหญ่ เหมาะสำหรับการฝึกอบรมและสัมมนา',
      availability: 'available'
    },
    {
      id: 5,
      name: 'Creative Space',
      capacity: 10,
      floor: 'ชั้น 4',
      location: 'อาคาร B',
      type: 'creative',
      facilities: ['tv', 'whiteboard', 'ac', 'wifi', 'coffee'],
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
      hourlyRate: 250,
      description: 'พื้นที่สร้างสรรค์ เหมาะสำหรับ Brainstorm และการทำงานแบบกลุ่ม',
      availability: 'maintenance'
    },
    {
      id: 6,
      name: 'Phone Booth',
      capacity: 2,
      floor: 'ชั้น 3',
      location: 'อาคาร A',
      type: 'phone',
      facilities: ['ac', 'wifi', 'sound'],
      image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400',
      hourlyRate: 100,
      description: 'ห้องโทรศัพท์ส่วนตัว เหมาะสำหรับการประชุมออนไลน์',
      availability: 'available'
    }
  ];

  // Facility icons
  const facilityIcons = {
    projector: { icon: <PlaySquareOutlined />, label: 'โปรเจคเตอร์', color: '#1890ff' },
    tv: { icon: <DesktopOutlined />, label: 'ทีวี', color: '#52c41a' },
    whiteboard: { icon: <EditOutlined />, label: 'ไวท์บอร์ด', color: '#faad14' },
    ac: { icon: <CloudOutlined />, label: 'แอร์', color: '#13c2c2' },
    wifi: { icon: <WifiOutlined />, label: 'Wi-Fi', color: '#722ed1' },
    video: { icon: <VideoCameraOutlined />, label: 'Video Call', color: '#eb2f96' },
    sound: { icon: <SoundOutlined />, label: 'เสียง', color: '#f5222d' },
    coffee: { icon: <CoffeeOutlined />, label: 'กาแฟ', color: '#a0471d' },
    parking: { icon: <CarOutlined />, label: 'ที่จอดรถ', color: '#666666' },
    security: { icon: <SecurityScanOutlined />, label: 'รักษาความปลอดภัย', color: '#fa8c16' }
  };

  // Room types
  const roomTypes = [
    { value: 'all', label: 'ทุกประเภท', color: '#666666' },
    { value: 'conference', label: 'ห้องประชุม', color: '#1890ff' },
    { value: 'meeting', label: 'ห้องมีติ้ง', color: '#52c41a' },
    { value: 'executive', label: 'ห้องผู้บริหาร', color: '#722ed1' },
    { value: 'training', label: 'ห้องอบรม', color: '#faad14' },
    { value: 'creative', label: 'พื้นที่สร้างสรรค์', color: '#eb2f96' },
    { value: 'phone', label: 'ห้องโทรศัพท์', color: '#13c2c2' }
  ];

  // Mock booking data
  const bookingHistory = [
    {
      id: 1,
      bookingNumber: 'MR-2024-0001',
      roomId: 1,
      roomName: 'Conference Room A',
      date: '2024-05-25',
      startTime: '09:00',
      endTime: '11:00',
      duration: 2,
      attendees: 8,
      purpose: 'ประชุมวางแผนโครงการใหม่',
      status: 'confirmed',
      bookedDate: '2024-05-20 14:30',
      cost: 1000,
      organizer: 'Kittisak Priabying',
      participants: ['John Doe', 'Jane Smith', 'Bob Johnson'],
      equipment: ['projector', 'whiteboard'],
      catering: false
    },
    {
      id: 2,
      bookingNumber: 'MR-2024-0002',
      roomId: 2,
      roomName: 'Meeting Room B',
      date: '2024-05-22',
      startTime: '14:00',
      endTime: '16:00',
      duration: 2,
      attendees: 5,
      purpose: 'สัมภาษณ์งาน',
      status: 'completed',
      bookedDate: '2024-05-18 10:15',
      cost: 600,
      organizer: 'Kittisak Priabying',
      participants: ['HR Team'],
      equipment: ['tv'],
      catering: true
    },
    {
      id: 3,
      bookingNumber: 'MR-2024-0003',
      roomId: 3,
      roomName: 'Executive Room',
      date: '2024-05-28',
      startTime: '10:00',
      endTime: '12:00',
      duration: 2,
      attendees: 4,
      purpose: 'ประชุมคณะกรรมการ',
      status: 'pending',
      bookedDate: '2024-05-23 16:45',
      cost: 1600,
      organizer: 'Kittisak Priabying',
      participants: ['Management Team'],
      equipment: ['projector', 'video'],
      catering: true
    },
    {
      id: 4,
      bookingNumber: 'MR-2024-0004',
      roomId: 1,
      roomName: 'Conference Room A',
      date: '2024-05-20',
      startTime: '13:00',
      endTime: '14:00',
      duration: 1,
      attendees: 3,
      purpose: 'ประชุมทีม Dev',
      status: 'cancelled',
      bookedDate: '2024-05-19 09:20',
      cost: 0,
      organizer: 'Kittisak Priabying',
      participants: ['Dev Team'],
      equipment: [],
      catering: false,
      cancelReason: 'เลื่อนการประชุม'
    }
  ];

  // Booking statistics
  const bookingStats = {
    thisMonth: {
      total: 24,
      confirmed: 18,
      completed: 12,
      cancelled: 3,
      pending: 6,
      totalHours: 48,
      totalCost: 18500
    },
    popular: [
      { roomId: 1, bookings: 8 },
      { roomId: 2, bookings: 6 },
      { roomId: 4, bookings: 5 },
      { roomId: 3, bookings: 3 },
      { roomId: 6, bookings: 2 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#1890ff';
      case 'completed': return '#52c41a';
      case 'pending': return '#faad14';
      case 'cancelled': return '#f5222d';
      default: return '#d9d9d9';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircleOutlined />;
      case 'completed': return <CheckCircleOutlined />;
      case 'pending': return <ClockCircleOutlined />;
      case 'cancelled': return <CloseCircleOutlined />;
      default: return <ExclamationCircleOutlined />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'ยืนยันแล้ว';
      case 'completed': return 'เสร็จสิ้น';
      case 'pending': return 'รออนุมัติ';
      case 'cancelled': return 'ยกเลิก';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return '#52c41a';
      case 'busy': return '#f5222d';
      case 'maintenance': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available': return 'ว่าง';
      case 'busy': return 'ไม่ว่าง';
      case 'maintenance': return 'ปรับปรุง';
      default: return 'ไม่ทราบ';
    }
  };

  const getRoomInfo = (roomId) => {
    return meetingRooms.find(room => room.id === roomId);
  };

  const columns = [
    {
      title: 'เลขที่จอง',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      render: (text) => <Text strong style={{ color: '#2b6cb0' }}>{text}</Text>,
    },
    {
      title: 'ห้องประชุม',
      dataIndex: 'roomName',
      key: 'roomName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: '500' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {getRoomInfo(record.roomId)?.floor} • {getRoomInfo(record.roomId)?.location}
          </div>
        </div>
      ),
    },
    {
      title: 'วันที่-เวลา',
      key: 'datetime',
      render: (_, record) => (
        <div>
          <div>{dayjs(record.date).format('DD/MM/YYYY')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.startTime} - {record.endTime}
          </div>
        </div>
      ),
    },
    {
      title: 'ระยะเวลา',
      dataIndex: 'duration',
      key: 'duration',
      align: 'center',
      render: (duration) => <Text>{duration} ชม.</Text>,
    },
    {
      title: 'จำนวนคน',
      dataIndex: 'attendees',
      key: 'attendees',
      align: 'center',
      render: (attendees) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          <TeamOutlined />
          <span>{attendees}</span>
        </div>
      ),
    },
    {
      title: 'ค่าใช้จ่าย',
      dataIndex: 'cost',
      key: 'cost',
      align: 'right',
      render: (cost) => (
        <Text strong style={{ color: cost > 0 ? '#52c41a' : '#999' }}>
          {cost > 0 ? `฿${cost.toLocaleString()}` : 'ฟรี'}
        </Text>
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
            onClick={() => handleViewBooking(record)}
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

  const handleViewBooking = (record) => {
    setSelectedBooking(record);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    const newBookingNumber = `MR-2024-${String(bookingHistory.length + 1).padStart(4, '0')}`;
    const duration = values.timeRange ? 
      dayjs(values.timeRange[1]).diff(dayjs(values.timeRange[0]), 'hour', true) : 0;
    const room = getRoomInfo(values.roomId);
    const cost = room ? duration * room.hourlyRate : 0;

    console.log('Meeting room booking submitted:', {
      ...values,
      bookingNumber: newBookingNumber,
      duration,
      cost,
      employeeData,
      bookedDate: dayjs().format('YYYY-MM-DD HH:mm')
    });
    
    message.success('จองห้องประชุมสำเร็จ!');
    form.resetFields();
  };

  const onCalendarSelect = (date) => {
    setSelectedDate(date);
    form.setFieldsValue({ date: date });
  };

  return (
    <div className={kanit.className}>
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
    <Title level={4} style={{ color: 'white', margin: '0 0 4px 0', fontFamily: "Kanit, sans-serif" }}>
      ระบบจองห้องประชุม - {employeeData.name}
    </Title>
    <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px' }}>
      {employeeData.position} | {employeeData.department}
    </Text>
  </div>
  
  <div style={{ display: 'flex', gap: '24px' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '24px', fontWeight: '600' }}>
        {bookingStats.thisMonth.confirmed + bookingStats.thisMonth.pending}
      </div>
      <div style={{ fontSize: '12px', opacity: 0.8 }}>
        การจองที่ใช้งาน
      </div>
    </div>
    
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '24px', fontWeight: '600' }}>
        {bookingStats.thisMonth.totalHours}
      </div>
      <div style={{ fontSize: '12px', opacity: 0.8 }}>
        ชั่วโมงใช้งาน
      </div>
    </div>
    
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '24px', fontWeight: '600' }}>
        ฿{bookingStats.thisMonth.totalCost.toLocaleString()}
      </div>
      <div style={{ fontSize: '12px', opacity: 0.8 }}>
        ค่าใช้จ่ายรวม
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
              onClick={() => setActiveKey('booking')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'booking' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'booking' ? '500' : 'normal',
                borderBottom: activeKey === 'booking' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PlusOutlined />
              <span>จองห้องประชุม</span>
            </div>
            <div 
              onClick={() => setActiveKey('rooms')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'rooms' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'rooms' ? '500' : 'normal',
                borderBottom: activeKey === 'rooms' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <HomeOutlined />
              <span>ห้องประชุม</span>
            </div>
            <div 
              onClick={() => setActiveKey('schedule')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'schedule' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'schedule' ? '500' : 'normal',
                borderBottom: activeKey === 'schedule' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CalendarOutlined />
              <span>ตารางการจอง</span>
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
              <TeamOutlined />
              <span>ประวัติการจอง</span>
            </div>
          </div>
          
          {/* Content */}
          <div style={{ 
            flex: 1,
            padding: '24px',
            overflowY: 'auto'
          }}>
            {activeKey === 'booking' && (
              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <SectionCard title="จองห้องประชุม">
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                      >
                        <Row gutter={[24, 16]}>
                          <Col xs={24} sm={12}>
                            <div style={{ marginBottom: '24px' }}>
                              <div style={{ 
                                marginBottom: '8px', 
                                fontSize: '14px',
                                fontWeight: '500',
                                color: 'rgba(0, 0, 0, 0.85)'
                              }}>
                                ห้องประชุม <span style={{ color: '#ff4d4f' }}>*</span>
                              </div>
                              <Select 
                                placeholder="เลือกห้องประชุม" 
                                size="large"
                                style={{ width: '100%' }}
                                onChange={(value) => setSelectedRoom(getRoomInfo(value))}
                              >
                                {meetingRooms.map(room => (
                                  <Option key={room.id} value={room.id} disabled={room.availability !== 'available'}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <div>
                                        <div style={{ fontWeight: '500' }}>{room.name}</div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                         
                                        </div>
                                      </div>
                                      <Tag color={getAvailabilityColor(room.availability)} size="small">
                                        {getAvailabilityText(room.availability)}
                                      </Tag>
                                    </div>
                                  </Option>
                                ))}
                              </Select>
                            </div>
                          </Col>
                          
                          <Col xs={24} sm={12}>
                            <div style={{ marginBottom: '24px' }}>
                              <div style={{ 
                                marginBottom: '8px', 
                                fontSize: '14px',
                                fontWeight: '500',
                                color: 'rgba(0, 0, 0, 0.85)'
                              }}>
                                วันที่ <span style={{ color: '#ff4d4f' }}>*</span>
                              </div>
                              <DatePicker 
                                style={{ width: '100%' }}
                                size="large"
                                format="DD/MM/YYYY"
                                placeholder="เลือกวันที่"
                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                                value={selectedDate}
                                onChange={setSelectedDate}
                              />
                            </div>
                          </Col>
                          
                          <Col xs={24} sm={12}>
                            <div style={{ marginBottom: '24px' }}>
                              <div style={{ 
                                marginBottom: '8px', 
                                fontSize: '14px',
                                fontWeight: '500',
                                color: 'rgba(0, 0, 0, 0.85)'
                              }}>
                                เวลาเริ่มต้น <span style={{ color: '#ff4d4f' }}>*</span>
                              </div>
                              <TimePicker 
                                style={{ width: '100%' }}
                                size="large"
                                format="HH:mm"
                                placeholder="เลือกเวลาเริ่มต้น"
                                minuteStep={15}
                                disabledTime={() => {
                                  const hours = [];
                                  for (let i = 0; i < 8; i++) hours.push(i);
                                  for (let i = 22; i < 24; i++) hours.push(i);
                                  return hours;
                                }}
                              />
                            </div>
                          </Col>
                          
                          <Col xs={24} sm={12}>
                            <div style={{ marginBottom: '24px' }}>
                              <div style={{ 
                                marginBottom: '8px', 
                                fontSize: '14px',
                                fontWeight: '500',
                                color: 'rgba(0, 0, 0, 0.85)'
                              }}>
                               เวลาสิ้นสุด <span style={{ color: '#ff4d4f' }}>*</span>
                             </div>
                             <TimePicker 
                               style={{ width: '100%' }}
                               size="large"
                               format="HH:mm"
                               placeholder="เลือกเวลาสิ้นสุด"
                               minuteStep={15}
                               disabledTime={() => {
                                 const hours = [];
                                 for (let i = 0; i < 8; i++) hours.push(i);
                                 for (let i = 22; i < 24; i++) hours.push(i);
                                 return hours;
                               }}
                             />
                           </div>
                         </Col>
                         
                         <Col xs={24} sm={12}>
                           <div style={{ marginBottom: '24px' }}>
                             <div style={{ 
                               marginBottom: '8px', 
                               fontSize: '14px',
                               fontWeight: '500',
                               color: 'rgba(0, 0, 0, 0.85)'
                             }}>
                               จำนวนผู้เข้าร่วม <span style={{ color: '#ff4d4f' }}>*</span>
                             </div>
                             <InputNumber 
                               style={{ width: '100%' }}
                               size="large"
                               min={1}
                               max={selectedRoom?.capacity || 50}
                               placeholder="จำนวนคน"
                               addonAfter="คน"
                             />
                           </div>
                         </Col>
                         
                         <Col xs={24} sm={12}>
                           <div style={{ marginBottom: '24px' }}>
                             <div style={{ 
                               marginBottom: '8px', 
                               fontSize: '14px',
                               fontWeight: '500',
                               color: 'rgba(0, 0, 0, 0.85)'
                             }}>
                               ประเภทการประชุม
                             </div>
                             <Select 
                               placeholder="เลือกประเภทการประชุม" 
                               size="large"
                               style={{ width: '100%' }}
                             >
                               <Option value="internal">ประชุมภายใน</Option>
                               <Option value="external">ประชุมลูกค้า</Option>
                               <Option value="training">การฝึกอบรม</Option>
                               <Option value="interview">สัมภาษณ์งาน</Option>
                               <Option value="presentation">นำเสนอผลงาน</Option>
                               <Option value="workshop">Workshop</Option>
                               <Option value="other">อื่นๆ</Option>
                             </Select>
                           </div>
                         </Col>
                         
                         <Col xs={24}>
                           <div style={{ marginBottom: '24px' }}>
                             <div style={{ 
                               marginBottom: '8px', 
                               fontSize: '14px',
                               fontWeight: '500',
                               color: 'rgba(0, 0, 0, 0.85)'
                             }}>
                               หัวข้อการประชุม <span style={{ color: '#ff4d4f' }}>*</span>
                             </div>
                             <Input 
                               size="large"
                               placeholder="ระบุหัวข้อหรือวัตถุประสงค์ของการประชุม..."
                               maxLength={100}
                             />
                           </div>
                         </Col>
                         
                         <Col xs={24}>
                           <div style={{ marginBottom: '24px' }}>
                             <div style={{ 
                               marginBottom: '8px', 
                               fontSize: '14px',
                               fontWeight: '500',
                               color: 'rgba(0, 0, 0, 0.85)'
                             }}>
                               รายละเอียดเพิ่มเติม
                             </div>
                             <TextArea 
                               rows={4} 
                               placeholder="ระบุรายละเอียดเพิ่มเติม เช่น วาระการประชุม, ความต้องการพิเศษ..."
                               maxLength={500}
                               showCount
                             />
                           </div>
                         </Col>
                         
                         <Col xs={24}>
                           <div style={{ marginBottom: '24px' }}>
                             <div style={{ 
                               marginBottom: '12px', 
                               fontSize: '14px',
                               fontWeight: '500',
                               color: 'rgba(0, 0, 0, 0.85)'
                             }}>
                               อุปกรณ์ที่ต้องการ
                             </div>
                             <Checkbox.Group style={{ width: '100%' }}>
                               <Row gutter={[16, 8]}>
                                 {selectedRoom?.facilities.map(facility => {
                                   const facilityInfo = facilityIcons[facility];
                                   return (
                                     <Col xs={12} sm={8} md={6} key={facility}>
                                       <Checkbox value={facility}>
                                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                           <span style={{ color: facilityInfo?.color }}>
                                             {facilityInfo?.icon}
                                           </span>
                                           <span style={{ fontSize: '13px' }}>
                                             {facilityInfo?.label}
                                           </span>
                                         </div>
                                       </Checkbox>
                                     </Col>
                                   );
                                 })}
                               </Row>
                             </Checkbox.Group>
                           </div>
                         </Col>
                         
                         <Col xs={24}>
                           <div style={{ marginBottom: '24px' }}>
                             <Checkbox>
                               <span style={{ fontSize: '14px' }}>
                                 ต้องการบริการอาหารและเครื่องดื่ม (+฿200/คน)
                               </span>
                             </Checkbox>
                           </div>
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
                             จองห้องประชุม
                           </Button>
                         </Space>
                       </div>
                     </Form>
                   </SectionCard>
                 </Col>
                 
                 <Col xs={24} lg={8}>
                   {/* Room Preview */}
                   {selectedRoom && (
                     <SectionCard title="ข้อมูลห้องที่เลือก">
                       <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                         <Image
                           width="100%"
                           height={150}
                           src={selectedRoom.image}
                           style={{ borderRadius: '8px', objectFit: 'cover' }}
                         />
                       </div>
                       
                       <div style={{ marginBottom: '16px' }}>
                         <Title level={5} style={{ margin: '0 0 8px 0' }}>
                           {selectedRoom.name}
                         </Title>
                         <Text style={{ color: '#666', fontSize: '13px' }}>
                           {selectedRoom.description}
                         </Text>
                       </div>
                       
                       <div style={{ marginBottom: '16px' }}>
                         <Row gutter={[8, 8]}>
                           <Col span={12}>
                             <Text strong>ความจุ:</Text>
                             <br />
                             <Text>👥 {selectedRoom.capacity} คน</Text>
                           </Col>
                           <Col span={12}>
                             <Text strong>ค่าเช่า:</Text>
                             <br />
                             <Text style={{ color: '#52c41a' }}>฿{selectedRoom.hourlyRate}/ชม.</Text>
                           </Col>
                           <Col span={12}>
                             <Text strong>ที่ตั้ง:</Text>
                             <br />
                             <Text>{selectedRoom.floor}</Text>
                           </Col>
                           <Col span={12}>
                             <Text strong>อาคาร:</Text>
                             <br />
                             <Text>{selectedRoom.location}</Text>
                           </Col>
                         </Row>
                       </div>
                       
                       <div>
                         <Text strong style={{ marginBottom: '8px', display: 'block' }}>
                           สิ่งอำนวยความสะดวก:
                         </Text>
                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                           {selectedRoom.facilities.map(facility => {
                             const facilityInfo = facilityIcons[facility];
                             return (
                               <Tooltip key={facility} title={facilityInfo?.label}>
                                 <Tag 
                                   color={facilityInfo?.color}
                                   style={{ margin: 0, cursor: 'help' }}
                                 >
                                   {facilityInfo?.icon} {facilityInfo?.label}
                                 </Tag>
                               </Tooltip>
                             );
                           })}
                         </div>
                       </div>
                     </SectionCard>
                   )}
                   
                   {/* Booking Tips */}
                   <SectionCard title="คำแนะนำการจอง">
                     <div style={{ marginBottom: '16px' }}>
                       <Text strong style={{ color: '#2b6cb0' }}>💡 เคล็ดลับการจอง:</Text>
                     </div>
                     
                     <div style={{ marginBottom: '12px' }}>
                       <Text strong style={{ color: '#52c41a', fontSize: '13px' }}>
                         ⏰ เวลาทำการ:
                       </Text>
                       <div style={{ fontSize: '12px', color: '#666' }}>
                         จันทร์-ศุกร์: 08:00-22:00<br />
                         เสาร์-อาทิตย์: 09:00-18:00
                       </div>
                     </div>
                     
                     <div style={{ marginBottom: '12px' }}>
                       <Text strong style={{ color: '#1890ff', fontSize: '13px' }}>
                         📅 การจองล่วงหน้า:
                       </Text>
                       <div style={{ fontSize: '12px', color: '#666' }}>
                         - ห้องทั่วไป: 1-30 วัน<br />
                         - ห้องผู้บริหาร: 1-14 วัน<br />
                         - การยกเลิก: ก่อน 2 ชม.
                       </div>
                     </div>
                     
                     <div style={{ marginBottom: '12px' }}>
                       <Text strong style={{ color: '#faad14', fontSize: '13px' }}>
                         💰 ค่าใช้จ่าย:
                       </Text>
                       <div style={{ fontSize: '12px', color: '#666' }}>
                         - ห้องประชุม: ฿300-800/ชม.<br />
                         - บริการอาหาร: ฿200/คน<br />
                         - ยกเลิกช้า: ฿500 ค่าปรับ
                       </div>
                     </div>
                     
                     <Divider />
                     
                     <div style={{ background: '#f6ffed', padding: '12px', borderRadius: '6px', border: '1px solid #b7eb8f' }}>
                       <Text strong style={{ color: '#52c41a' }}>📞 ติดต่อสอบถาม:</Text>
                       <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                         Admin: 02-123-4567 ต่อ 100<br />
                         Email: facility@tosakancorp.com
                       </div>
                     </div>
                   </SectionCard>
                 </Col>
               </Row>
             </div>
           )}
           
           {activeKey === 'rooms' && (
             <div>
               <Row gutter={[24, 24]}>
                 {meetingRooms.map(room => (
                   <Col xs={24} md={12} lg={8} key={room.id}>
                     <SectionCard title={room.name}>
                       <div style={{ position: 'relative', marginBottom: '16px' }}>
                         <Image
                           width="100%"
                           height={180}
                           src={room.image}
                           style={{ borderRadius: '8px', objectFit: 'cover' }}
                         />
                         <div style={{
                           position: 'absolute',
                           top: '8px',
                           right: '8px'
                         }}>
                           <Tag color={getAvailabilityColor(room.availability)}>
                             {getAvailabilityText(room.availability)}
                           </Tag>
                         </div>
                       </div>
                       
                       <div style={{ marginBottom: '12px' }}>
                         <Text style={{ color: '#666', fontSize: '13px' }}>
                           {room.description}
                         </Text>
                       </div>
                       
                       <Row gutter={[8, 8]} style={{ marginBottom: '16px' }}>
                         <Col span={12}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <TeamOutlined style={{ color: '#1890ff' }} />
                             <Text style={{ fontSize: '13px' }}>{room.capacity} คน</Text>
                           </div>
                         </Col>
                         <Col span={12}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <EnvironmentOutlined style={{ color: '#52c41a' }} />
                             <Text style={{ fontSize: '13px' }}>{room.floor}</Text>
                           </div>
                         </Col>
                         <Col span={12}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <BankOutlined style={{ color: '#722ed1' }} />
                             <Text style={{ fontSize: '13px' }}>{room.location}</Text>
                           </div>
                         </Col>
                         <Col span={12}>
                           <Text style={{ fontSize: '16px', fontWeight: '600', color: '#52c41a' }}>
                             ฿{room.hourlyRate}/ชม.
                           </Text>
                         </Col>
                       </Row>
                       
                       <div style={{ marginBottom: '16px' }}>
                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                           {room.facilities.slice(0, 4).map(facility => {
                             const facilityInfo = facilityIcons[facility];
                             return (
                               <Tooltip key={facility} title={facilityInfo?.label}>
                                 <Tag 
                                   color={facilityInfo?.color}
                                   size="small"
                                   style={{ margin: 0, cursor: 'help' }}
                                 >
                                   {facilityInfo?.icon}
                                 </Tag>
                               </Tooltip>
                             );
                           })}
                           {room.facilities.length > 4 && (
                             <Tag size="small">+{room.facilities.length - 4}</Tag>
                           )}
                         </div>
                       </div>
                       
                       <Button 
                         type="primary" 
                         block
                         disabled={room.availability !== 'available'}
                         onClick={() => {
                           setSelectedRoom(room);
                           setActiveKey('booking');
                           form.setFieldsValue({ roomId: room.id });
                         }}
                         style={{ 
                           background: room.availability === 'available' ? 
                             'linear-gradient(90deg, #134e90 0%, #2973c2 100%)' : '#d9d9d9',
                           border: 'none'
                         }}
                       >
                         {room.availability === 'available' ? 'จองห้องนี้' : 
                          room.availability === 'busy' ? 'ไม่ว่าง' : 'ปรับปรุง'}
                       </Button>
                     </SectionCard>
                   </Col>
                 ))}
               </Row>
             </div>
           )}
           
           {activeKey === 'schedule' && (
             <div>
               <Row gutter={[24, 24]}>
                 <Col xs={24} lg={8}>
                   <SectionCard title="ปฏิทิน">
                     <Calendar 
                       fullscreen={false}
                       value={selectedDate}
                       onSelect={onCalendarSelect}
                       dateCellRender={(date) => {
                         const bookingsOnDate = bookingHistory.filter(booking => 
                           dayjs(booking.date).isSame(date, 'day') && 
                           (booking.status === 'confirmed' || booking.status === 'pending')
                         );
                         
                         return (
                           <div>
                             {bookingsOnDate.map(booking => (
                               <Badge 
                                 key={booking.id}
                                 status={booking.status === 'confirmed' ? 'success' : 'warning'}
                                 text={
                                   <span style={{ fontSize: '11px' }}>
                                     {booking.startTime}
                                   </span>
                                 }
                               />
                             ))}
                           </div>
                         );
                       }}
                     />
                   </SectionCard>
                 </Col>
                 
                 <Col xs={24} lg={16}>
                   <SectionCard title={`ตารางการจอง - ${selectedDate.format('DD/MM/YYYY')}`}>
                     <div style={{ marginBottom: '16px' }}>
                       <Text style={{ color: '#666' }}>
                         การจองทั้งหมดในวันที่เลือก
                       </Text>
                     </div>
                     
                     {/* Time slots */}
                     <div style={{ background: '#fafafa', borderRadius: '8px', padding: '16px' }}>
                       {[8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20].map(hour => {
                         const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
                         const bookingsAtTime = bookingHistory.filter(booking => 
                           dayjs(booking.date).isSame(selectedDate, 'day') && 
                           parseInt(booking.startTime.split(':')[0]) <= hour &&
                           parseInt(booking.endTime.split(':')[0]) > hour &&
                           (booking.status === 'confirmed' || booking.status === 'pending')
                         );
                         
                         return (
                           <div key={hour} style={{ 
                             display: 'flex', 
                             alignItems: 'center',
                             padding: '8px 0',
                             borderBottom: '1px solid #f0f0f0'
                           }}>
                             <div style={{ 
                               width: '80px', 
                               fontSize: '14px', 
                               fontWeight: '500',
                               color: '#666'
                             }}>
                               {timeSlot}
                             </div>
                             <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                               {bookingsAtTime.length > 0 ? (
                                 bookingsAtTime.map(booking => (
                                   <Tag 
                                     key={booking.id}
                                     color={getStatusColor(booking.status)}
                                     style={{ margin: 0, cursor: 'pointer' }}
                                     onClick={() => handleViewBooking(booking)}
                                   >
                                     {booking.roomName} - {booking.purpose}
                                   </Tag>
                                 ))
                               ) : (
                                 <Text style={{ color: '#ccc', fontSize: '13px' }}>ว่าง</Text>
                               )}
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
           
           {activeKey === 'history' && (
             <div>
               <SectionCard title="ประวัติการจองห้องประชุม">
                 <Table
                   columns={columns}
                   dataSource={bookingHistory}
                   rowKey="id"
                   pagination={{ pageSize: 10 }}
                   scroll={{ x: 1200 }}
                 />
               </SectionCard>
             </div>
           )}
         </div>
       </div>
     </div>
     

     {/* Booking Detail Modal */}
     <Modal
       title={
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <CalendarOutlined style={{ color: '#2b6cb0' }} />
           <span>รายละเอียดการจองห้องประชุม</span>
         </div>
       }
       open={isModalVisible}
       onCancel={() => setIsModalVisible(false)}
       footer={[
         <Button key="close" onClick={() => setIsModalVisible(false)}>
           ปิด
         </Button>,
         selectedBooking?.status === 'pending' && (
           <Button 
             key="cancel" 
             danger
             onClick={() => message.info('ยกเลิกการจอง')}
           >
             ยกเลิกการจอง
           </Button>
         ),
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
       width={800}
     >
       {selectedBooking && (
         <div>
           {/* Booking Header */}
           <div style={{ marginBottom: '24px' }}>
             <Row gutter={[16, 16]}>
               <Col span={12}>
                 <Text strong>เลขที่จอง:</Text>
                 <br />
                 <Text style={{ fontSize: '18px', color: '#2b6cb0', fontWeight: '600' }}>
                   {selectedBooking.bookingNumber}
                 </Text>
               </Col>
               <Col span={12}>
                 <Text strong>สถานะ:</Text>
                 <br />
                 <Tag 
                   icon={getStatusIcon(selectedBooking.status)}
                   color={getStatusColor(selectedBooking.status)}
                   style={{ fontSize: '14px', padding: '4px 12px' }}
                 >
                   {getStatusText(selectedBooking.status)}
                 </Tag>
               </Col>
               <Col span={24}>
                 <Text strong>หัวข้อ:</Text>
                 <br />
                 <Text style={{ fontSize: '16px' }}>{selectedBooking.purpose}</Text>
               </Col>
             </Row>
           </div>

           <Divider />

           {/* Room & Time Details */}
           <div style={{ marginBottom: '24px' }}>
             <Title level={5} style={{ color: '#2b6cb0', marginBottom: '16px' }}>
               รายละเอียดห้องและเวลา
             </Title>
             <Row gutter={[16, 16]}>
               <Col span={12}>
                 <Text strong>ห้องประชุม:</Text>
                 <br />
                 <Text>{selectedBooking.roomName}</Text>
               </Col>
               <Col span={12}>
                 <Text strong>ที่ตั้ง:</Text>
                 <br />
                 <Text>{getRoomInfo(selectedBooking.roomId)?.floor} • {getRoomInfo(selectedBooking.roomId)?.location}</Text>
               </Col>
               <Col span={8}>
                 <Text strong>วันที่:</Text>
                 <br />
                 <Text>{dayjs(selectedBooking.date).format('DD/MM/YYYY')}</Text>
               </Col>
               <Col span={8}>
                 <Text strong>เวลา:</Text>
                 <br />
                 <Text>{selectedBooking.startTime} - {selectedBooking.endTime}</Text>
               </Col>
               <Col span={8}>
                 <Text strong>ระยะเวลา:</Text>
                 <br />
                 <Text>{selectedBooking.duration} ชั่วโมง</Text>
               </Col>
             </Row>
           </div>

           {/* Participants & Cost */}
           <Row gutter={[24, 16]}>
             <Col span={12}>
               <Text strong>จำนวนผู้เข้าร่วม:</Text>
               <br />
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                 <TeamOutlined style={{ color: '#1890ff' }} />
                 <Text style={{ fontSize: '16px', fontWeight: '500' }}>{selectedBooking.attendees} คน</Text>
               </div>
             </Col>
             <Col span={12}>
               <Text strong>ค่าใช้จ่าย:</Text>
               <br />
               <Text style={{ 
                 fontSize: '20px', 
                 fontWeight: '600', 
                 color: selectedBooking.cost > 0 ? '#52c41a' : '#999',
                 marginTop: '8px',
                 display: 'block'
               }}>
                 {selectedBooking.cost > 0 ? `฿${selectedBooking.cost.toLocaleString()}` : 'ฟรี'}
               </Text>
             </Col>
           </Row>

           <Divider />

           {/* Equipment & Services */}
           <div style={{ marginBottom: '24px' }}>
             <Title level={5} style={{ color: '#2b6cb0', marginBottom: '16px' }}>
               อุปกรณ์และบริการ
             </Title>
             <div style={{ marginBottom: '12px' }}>
               <Text strong>อุปกรณ์ที่ใช้:</Text>
               <br />
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                 {selectedBooking.equipment.length > 0 ? (
                   selectedBooking.equipment.map(equipment => {
                     const facilityInfo = facilityIcons[equipment];
                     return (
                       <Tag 
                         key={equipment}
                         color={facilityInfo?.color}
                       >
                         {facilityInfo?.icon} {facilityInfo?.label}
                       </Tag>
                     );
                   })
                 ) : (
                   <Text style={{ color: '#999' }}>ไม่มีอุปกรณ์เพิ่มเติม</Text>
                 )}
               </div>
             </div>
             
             <div>
               <Text strong>บริการอาหาร:</Text>
               <br />
               <Tag color={selectedBooking.catering ? '#52c41a' : '#d9d9d9'}>
                 {selectedBooking.catering ? '✓ มีบริการอาหาร' : '✗ ไม่มีบริการอาหาร'}
               </Tag>
             </div>
           </div>

           {/* Cancel Reason */}
           {selectedBooking.status === 'cancelled' && selectedBooking.cancelReason && (
             <div style={{ 
               background: '#fff2f0', 
               padding: '16px', 
               borderRadius: '8px',
               border: '1px solid #ffccc7',
               marginBottom: '16px'
             }}>
               <Text strong style={{ color: '#f5222d' }}>เหตุผลการยกเลิก:</Text>
               <br />
               <Text>{selectedBooking.cancelReason}</Text>
             </div>
           )}

           {/* Booking Info */}
           <div style={{ 
             background: '#f6ffed', 
             padding: '16px', 
             borderRadius: '8px',
             border: '1px solid #b7eb8f'
           }}>
             <Row gutter={[16, 8]}>
               <Col span={12}>
                 <Text strong>ผู้จอง:</Text>
                 <br />
                 <Text>{selectedBooking.organizer}</Text>
               </Col>
               <Col span={12}>
                 <Text strong>วันที่จอง:</Text>
                 <br />
                 <Text>{selectedBooking.bookedDate}</Text>
               </Col>
             </Row>
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