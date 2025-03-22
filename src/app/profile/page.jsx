'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Button, Tag, Typography, Space, Tabs, Divider } from 'antd';
import { 
  UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, 
  IdcardOutlined, TeamOutlined, CalendarOutlined, CrownOutlined, 
  EditOutlined, BankOutlined, ApartmentOutlined, HomeOutlined,
  GlobalOutlined, BranchesOutlined, SolutionOutlined, UsergroupAddOutlined
} from '@ant-design/icons';
import { Kanit } from 'next/font/google';

const { Title, Text } = Typography;

// Font Loader
const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

export default function Profile() {
  // Employee data
  const employeeData = {
    name: 'Kittisak Priabying',
    position: 'Junior Full Stack Engineer',
    department: 'Information Technology Department',
    employeeId: '7984563211',
    phone: '044-123-4567',
    email: 'kittisak.pri@tosakancorp.com',
    address: '123/456 Sukhumvit Road, Klongtoey, Bangkok 10110',
    startDate: 'January 1, 2022',
    manager: 'Thanakrit Watcharapongwanich',
    managerMail: 'thanakrit.wat@tosakancorp.com',
    status: 'Full-time Employee',
    hrbp: 'Somsri Suksawat',
    hrbpMail: 'somsir.su@tosakancorp.com',
    supervisor: 'Somying Mongkol',
    supervisorMail: 'somying.su@tosakancorp.com',
    location: 'Head Quarter, Bangkok',
    company: 'Tosakan Technology Co., Ltd.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    managerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    supervisorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    hrbpAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  };
  
  const [activeKey, setActiveKey] = useState('personal');
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    // Simulate image loading
    const img = new window.Image();
    img.onload = () => setAvatarLoaded(true);
    img.onerror = () => console.error('Avatar image failed to load');
    img.src = employeeData.avatar;
    
    return () => {
      // Cleanup
      img.onload = null;
      img.onerror = null;
    };
  }, [employeeData.avatar]);

  return (
    <div className={kanit.className} style={{ 
      background: '#f0f7ff', 
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        maxWidth: '1800px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 40px)'
      }}>
        {/* Profile Header */}
        <div style={{
          background: 'linear-gradient(90deg, #134e90 0%, #2973c2 100%)',
          borderRadius: '12px',
          padding: '24px 30px',
          color: 'white',
          marginBottom: '16px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Avatar */}
          <div style={{ marginRight: '24px' }}>
            {avatarLoaded ? (
              <Avatar 
                src={employeeData.avatar} 
                size={90}
                style={{
                  border: '3px solid white',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                }}
              />
            ) : (
              <Avatar 
                icon={<UserOutlined />} 
                size={90}
                style={{
                  border: '3px solid white',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#e6f0ff',
                  color: '#2b6cb0'
                }}
              />
            )}
          </div>
          
          {/* User Info */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '8px' }}>
              <Tag style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '12px'
              }}>
                ID: {employeeData.employeeId}
              </Tag>
            </div>
            <Title level={4} style={{ color: 'white', margin: '0 0 4px 0' }}>
              {employeeData.name}
            </Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', display: 'block', marginBottom: '12px' }}>
              {employeeData.position}
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PhoneOutlined style={{ marginRight: '8px' }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{employeeData.phone}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MailOutlined style={{ marginRight: '8px' }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{employeeData.email}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BankOutlined style={{ marginRight: '8px' }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{employeeData.company}</Text>
              </div>
            </div>
          </div>
          
          {/* Status Tag */}
          <div>
            <Tag style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              {employeeData.status}
            </Tag>
          </div>
        </div>
        
        {/* Tabs and Content */}
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
              onClick={() => setActiveKey('personal')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'personal' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'personal' ? '500' : 'normal',
                borderBottom: activeKey === 'personal' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <UserOutlined />
              <span>Personal</span>
            </div>
            <div 
              onClick={() => setActiveKey('organization')}
              style={{ 
                padding: '16px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                color: activeKey === 'organization' ? '#2b6cb0' : '#666',
                fontWeight: activeKey === 'organization' ? '500' : 'normal',
                borderBottom: activeKey === 'organization' ? '2px solid #2b6cb0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <TeamOutlined />
              <span>Organization</span>
            </div>
          </div>
          
          {/* Content */}
          <div style={{ 
            flex: 1,
            padding: '24px',
            overflowY: 'auto'
          }}>
            {activeKey === 'personal' && (
              <div>
                <Row gutter={[24, 24]}>
                  {/* Personal Details */}
                  <Col xs={24} md={12}>
                    <SectionCard title="Personal Details">
                      <Row gutter={[0, 20]}>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<IdcardOutlined style={{ color: '#2b6cb0' }} />}
                            label="Employee ID"
                            value={employeeData.employeeId}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<TeamOutlined style={{ color: '#2b6cb0' }} />}
                            label="Name"
                            value={employeeData.name}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<CalendarOutlined style={{ color: '#2b6cb0' }} />}
                            label="Start Date"
                            value={employeeData.startDate}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<CrownOutlined style={{ color: '#2b6cb0' }} />}
                            label="Position"
                            value={employeeData.position}
                          />
                        </Col>
                       
                      </Row>
                    </SectionCard>
                  </Col>
                  
                  {/* Contact Information */}
                  <Col xs={24} md={12}>
                    <SectionCard title="Contact Information">
                      <Row gutter={[0, 20]}>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<PhoneOutlined style={{ color: '#2b6cb0' }} />}
                            label="Phone Number"
                            value={employeeData.phone}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<MailOutlined style={{ color: '#2b6cb0' }} />}
                            label="Email"
                            value={employeeData.email}
                          />
                        </Col>
                        <Col xs={24} sm={12}>   
                          <InfoItem 
                            icon={<HomeOutlined style={{ color: '#2b6cb0' }} />}
                            label="Work Location"
                            value={employeeData.location}
                          />
                        </Col>
                        <Col xs={24}>
                          <InfoItem 
                            icon={<EnvironmentOutlined style={{ color: '#2b6cb0' }} />}
                            label="Address"
                            value={employeeData.address}
                          />
                        </Col>
                      </Row>
                    </SectionCard>
                  </Col>
                  
                  {/* Reporting Lines */}
                  <Col xs={24}>
                    <SectionCard title="Reporting Lines">
                      <Row gutter={[24, 24]}>
                        <Col xs={24} sm={8}>
                          <div style={{
                            textAlign: 'center',
                            margin: '0 auto'
                          }}>
                            <div style={{ 
                              color: '#2b6cb0', 
                              fontSize: '14px', 
                              fontWeight: '500',
                              marginBottom: '12px' 
                            }}>
                              Manager
                            </div>
                            <Avatar 
                              src={employeeData.managerAvatar} 
                              size={64}
                              style={{
                                border: '2px solid #e6f0ff',
                                marginBottom: '12px'
                              }}
                            />
                            <div style={{ fontWeight: '500', fontSize: '16px', marginBottom: '4px' }}>
                              {employeeData.manager}
                            </div>
                            <div style={{ color: '#666', fontSize: '13px' }}>
                              {employeeData.managerMail}
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={8}>
                          <div style={{
                            textAlign: 'center',
                            margin: '0 auto'
                          }}>
                            <div style={{ 
                              color: '#2b6cb0', 
                              fontSize: '14px', 
                              fontWeight: '500',
                              marginBottom: '12px' 
                            }}>
                              Supervisor
                            </div>
                            <Avatar 
                              src={employeeData.supervisorAvatar} 
                              size={64}
                              style={{
                                border: '2px solid #e6f0ff',
                                marginBottom: '12px'
                              }}
                            />
                            <div style={{ fontWeight: '500', fontSize: '16px', marginBottom: '4px' }}>
                              {employeeData.supervisor}
                            </div>
                            <div style={{ color: '#666', fontSize: '13px' }}>
                              {employeeData.supervisorMail}
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={8}>
                          <div style={{
                            textAlign: 'center',
                            margin: '0 auto'
                          }}>
                            <div style={{ 
                              color: '#2b6cb0', 
                              fontSize: '14px', 
                              fontWeight: '500',
                              marginBottom: '12px' 
                            }}>
                              HRBP
                            </div>
                            <Avatar 
                              src={employeeData.hrbpAvatar} 
                              size={64}
                              style={{
                                border: '2px solid #e6f0ff',
                                marginBottom: '12px'
                              }}
                            />
                            <div style={{ fontWeight: '500', fontSize: '16px', marginBottom: '4px' }}>
                              {employeeData.hrbp}
                            </div>
                            <div style={{ color: '#666', fontSize: '13px' }}>
                              {employeeData.hrbpMail}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </SectionCard>
                  </Col>
                </Row>
              </div>
            )}
            
            {activeKey === 'organization' && (
              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <SectionCard title="Company Structure">
                      <Row gutter={[0, 20]}>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<GlobalOutlined style={{ color: '#2b6cb0' }} />}
                            label="Company Group"
                            value="Tosakan Corporation Group"
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<BankOutlined style={{ color: '#2b6cb0' }} />}
                            label="Company"
                            value="Tosakan Technology Co., Ltd."
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<ApartmentOutlined style={{ color: '#2b6cb0' }} />}
                            label="Business Unit"
                            value="Technology"
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<TeamOutlined style={{ color: '#2b6cb0' }} />}
                            label="Department"
                            value= {employeeData.department}
                          />
                        </Col>
                      </Row>
                    </SectionCard>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <SectionCard title="Team Structure">
                      <Row gutter={[0, 20]}>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<BranchesOutlined style={{ color: '#2b6cb0' }} />}
                            label="Team"
                            value="Development"
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <InfoItem 
                            icon={<UsergroupAddOutlined style={{ color: '#2b6cb0' }} />}
                            label="Sub Team"
                            value="Frontend"
                          />
                        </Col>
                      </Row>
                    </SectionCard>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </div>
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
        <Button 
          type="text" 
          size="small" 
          icon={<EditOutlined style={{ color: '#2b6cb0' }} />}
          style={{ fontSize: '12px' }} 
        />
      </div>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({ icon, label, value }) {
  return (
    <div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '6px', 
        color: '#667085',
        fontSize: '13px'
      }}>
        {icon}
        <span style={{ marginLeft: '8px' }}>{label}</span>
      </div>
      <div style={{ 
        fontSize: '15px', 
        paddingLeft: '26px',
        color: '#344054'
      }}>
        {value}
      </div>
    </div>
  );
}