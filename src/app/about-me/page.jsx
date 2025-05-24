'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Tabs, Space, Tag, Divider, Avatar, Button, Statistic } from 'antd';
import { 
  CoffeeOutlined, ShoppingOutlined, WifiOutlined, LaptopOutlined,
  EnvironmentOutlined, HeartOutlined, GlobalOutlined, TeamOutlined,
  TrophyOutlined, SafetyOutlined, RiseOutlined, BankOutlined
} from '@ant-design/icons';
import { Kanit } from 'next/font/google';

const { Title, Text, Paragraph } = Typography;

// Font Loader
const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

// Business Groups Data
const businessGroups = {
  food: {
    name: 'Food Business Group',
    icon: <ShoppingOutlined />,
    color: '#52c41a',
    companies: [
      { name: 'Tosakan Food Products Co., Ltd.', description: 'Premium food manufacturing' },
      { name: 'Tosakan Fresh Market Co., Ltd.', description: 'Fresh food retail chain' },
      { name: 'Tosakan Bakery Co., Ltd.', description: 'Artisan bakery products' },
      { name: 'Tosakan Seafood Co., Ltd.', description: 'Seafood processing and export' },
      { name: 'Tosakan Organic Farm Co., Ltd.', description: 'Organic agriculture' },
      { name: 'Tosakan Frozen Foods Co., Ltd.', description: 'Frozen food manufacturing' },
      { name: 'Tosakan Snack Co., Ltd.', description: 'Snack food production' },
      { name: 'Tosakan Dairy Co., Ltd.', description: 'Dairy products' },
      { name: 'Tosakan Meat Processing Co., Ltd.', description: 'Premium meat products' },
      { name: 'Tosakan Spices Co., Ltd.', description: 'Spice and seasoning production' }
    ]
  },
  beverage: {
    name: 'Beverage Business Group',
    icon: <CoffeeOutlined />,
    color: '#1890ff',
    companies: [
      { name: 'Tosakan Beverages Co., Ltd.', description: 'Soft drinks and juices' },
      { name: 'Tosakan Coffee Co., Ltd.', description: 'Premium coffee chain' },
      { name: 'Tosakan Tea House Co., Ltd.', description: 'Traditional and modern tea' },
      { name: 'Tosakan Water Co., Ltd.', description: 'Mineral water production' },
      { name: 'Tosakan Energy Drinks Co., Ltd.', description: 'Energy and sports drinks' },
      { name: 'Tosakan Brewery Co., Ltd.', description: 'Craft beer production' },
      { name: 'Tosakan Juice Bar Co., Ltd.', description: 'Fresh juice retail' },
      { name: 'Tosakan Milk Tea Co., Ltd.', description: 'Milk tea franchise' }
    ]
  },
  telecom: {
    name: 'Telecommunications Group',
    icon: <WifiOutlined />,
    color: '#722ed1',
    companies: [
      { name: 'Tosakan Telecom Co., Ltd.', description: 'Mobile network operator' },
      { name: 'Tosakan Digital Services Co., Ltd.', description: 'Digital infrastructure' }
    ]
  },
  technology: {
    name: 'Technology Business Group',
    icon: <LaptopOutlined />,
    color: '#fa541c',
    companies: [
      { name: 'Tosakan Technology Co., Ltd.', description: 'IT solutions and consulting' },
      { name: 'Tosakan Software Co., Ltd.', description: 'Enterprise software development' },
      { name: 'Tosakan Cloud Co., Ltd.', description: 'Cloud computing services' },
      { name: 'Tosakan AI Lab Co., Ltd.', description: 'Artificial intelligence research' },
      { name: 'Tosakan Cybersecurity Co., Ltd.', description: 'Security solutions' },
      { name: 'Tosakan Fintech Co., Ltd.', description: 'Financial technology' },
      { name: 'Tosakan E-commerce Co., Ltd.', description: 'Online marketplace platform' },
      { name: 'Tosakan Gaming Co., Ltd.', description: 'Game development studio' },
      { name: 'Tosakan IoT Co., Ltd.', description: 'Internet of Things solutions' },
      { name: 'Tosakan Robotics Co., Ltd.', description: 'Robotics and automation' },
      { name: 'Tosakan Data Analytics Co., Ltd.', description: 'Big data analytics' },
      { name: 'Tosakan EdTech Co., Ltd.', description: 'Educational technology' }
    ]
  }
};

// Executive Team Data
const executives = [
  {
    name: 'Dr. Somchai Tosakan',
    position: 'Chairman of the Board',
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    bio: 'Over 40 years of business leadership experience'
  },
  {
    name: 'Khun Siriporn Tosakan',
    position: 'Vice Chairman & Chief Operating Officer',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    bio: 'Strategic operations and business transformation expert'
  },
  {
    name: 'Khun Prasert Wongsakul',
    position: 'Vice Chairman & Chief Human Resources Officer',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    bio: 'Leading HR innovation and organizational development'
  },
  {
    name: 'Khun Nattaya Sriwilai',
    position: 'Vice Chairman & Chief Financial Officer',
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    bio: 'Financial strategy and corporate governance'
  },
  {
    name: 'Khun Theerawat Pongpan',
    position: 'Chief Executive Officer',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    bio: 'Driving corporate vision and growth strategies'
  },
  {
    name: 'Khun Apinya Chaiwong',
    position: 'Deputy CEO & President, Food & Beverage Group',
    avatar: 'https://randomuser.me/api/portraits/women/38.jpg',
    bio: 'Leading F&B innovation and market expansion'
  },
  {
    name: 'Khun Kittipong Sirirat',
    position: 'Deputy CEO & President, Technology Group',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    bio: 'Digital transformation and tech innovation leader'
  }
];

// Add Managing Directors for each company
const companyMDs = [
  { company: 'Tosakan Food Products', name: 'Khun Somsri Jaidee', avatar: 'https://randomuser.me/api/portraits/women/30.jpg' },
  { company: 'Tosakan Fresh Market', name: 'Khun Narong Sukjai', avatar: 'https://randomuser.me/api/portraits/men/31.jpg' },
  { company: 'Tosakan Bakery', name: 'Khun Malee Wanit', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
  { company: 'Tosakan Seafood', name: 'Khun Prayut Thalay', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { company: 'Tosakan Organic Farm', name: 'Khun Suwanna Kaset', avatar: 'https://randomuser.me/api/portraits/women/34.jpg' },
  { company: 'Tosakan Beverages', name: 'Khun Chaiwat Namjai', avatar: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { company: 'Tosakan Coffee', name: 'Khun Sirima Aroon', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { company: 'Tosakan Telecom', name: 'Khun Thanit Digital', avatar: 'https://randomuser.me/api/portraits/men/42.jpg' },
  { company: 'Tosakan Technology', name: 'Khun Parichat Smart', avatar: 'https://randomuser.me/api/portraits/women/43.jpg' },
  { company: 'Tosakan Software', name: 'Khun Wichai Code', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
];

export default function AboutCompany() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={kanit.className}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #134e90 0%, #2973c2 100%)',
          borderRadius: '16px',
          padding: '60px 40px',
          color: 'white',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            right: '-100px',
            top: '-100px',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }} />
          
          <Row align="middle" gutter={[40, 24]}>
            <Col xs={24} lg={16}>
              <Title level={1} style={{ color: 'white', marginBottom: '16px', fontSize: '48px' }}>
                Tosakan Corporation
              </Title>
              <Paragraph style={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                fontSize: '18px',
                marginBottom: '24px',
                lineHeight: '1.8'
              }}>
                Leading Thailand's business transformation across Food, Beverage, 
                Telecommunications, and Technology sectors since 1985
              </Paragraph>
              <Space size="large">
                <Statistic 
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Companies</span>}
                  value={32}
                  valueStyle={{ color: 'white', fontSize: '32px' }}
                />
                <Statistic 
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Employees</span>}
                  value="50,000+"
                  valueStyle={{ color: 'white', fontSize: '32px' }}
                />
                <Statistic 
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Years</span>}
                  value={39}
                  valueStyle={{ color: 'white', fontSize: '32px' }}
                />
              </Space>
            </Col>
            <Col xs={24} lg={8} style={{ textAlign: 'center' }}>
              <div style={{
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                <BankOutlined style={{ fontSize: '80px', color: 'white' }} />
              </div>
            </Col>
          </Row>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          style={{ marginBottom: '32px' }}
          items={[
            { key: 'overview', label: 'Overview' },
            { key: 'businesses', label: 'Our Businesses' },
            { key: 'leadership', label: 'Leadership Team' },
            { key: 'csr', label: 'Corporate Responsibility' }
          ]}
        />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <Card style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <Title level={3} style={{ color: '#134e90', marginBottom: '24px' }}>
                    Our Story
                  </Title>
                  <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                    Founded in 1985, Tosakan Corporation has grown from a small family business 
                    into one of Thailand's most respected conglomerates. Our journey began with 
                    a single food manufacturing facility in Bangkok, driven by a vision to provide 
                    quality products to Thai consumers.
                  </Paragraph>
                  <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                    Over nearly four decades, we have expanded into multiple sectors, always 
                    maintaining our core values of integrity, innovation, and social responsibility. 
                    Today, Tosakan Corporation operates 32 companies across four major business 
                    groups, employing over 50,000 people throughout Thailand and Southeast Asia.
                  </Paragraph>
                  <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                    Our success is built on understanding local needs while embracing global 
                    standards. We continue to invest in technology, sustainability, and our people, 
                    ensuring that Tosakan Corporation remains at the forefront of Thailand's 
                    economic development.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card 
                  title={<Space><TrophyOutlined style={{ color: '#faad14' }} /> Vision</Space>}
                  style={{ borderRadius: '12px', height: '100%' }}
                >
                  <Paragraph style={{ fontSize: '15px', lineHeight: '1.8' }}>
                    To be Southeast Asia's most trusted and innovative corporation, creating 
                    sustainable value for all stakeholders while contributing to the prosperity 
                    of our communities and nation.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card 
                  title={<Space><GlobalOutlined style={{ color: '#1890ff' }} /> Mission</Space>}
                  style={{ borderRadius: '12px', height: '100%' }}
                >
                  <Paragraph style={{ fontSize: '15px', lineHeight: '1.8' }}>
                    We deliver exceptional products and services across our diverse portfolio, 
                    fostering innovation, empowering our people, and maintaining the highest 
                    standards of corporate governance and social responsibility.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        )}

{activeTab === 'businesses' && (
  <div>
    <Title level={3} style={{ color: '#134e90', marginBottom: '24px' }}>
      กลุ่มธุรกิจของเรา (Our Business Groups)
    </Title>
    <Row gutter={[24, 32]}>
      {Object.entries(businessGroups).map(([key, group]) => (
        <Col xs={24} key={key}>
          <Card
            title={
              <Space>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: group.color + '20',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {React.cloneElement(group.icon, {
                    style: { fontSize: '22px', color: group.color }
                  })}
                </div>
                <div>
                  <Title level={4} style={{ margin: 0 }}>{group.name}</Title>
                  <Text type="secondary">{group.companies.length} บริษัทในเครือ</Text>
                </div>
              </Space>
            }
            style={{ borderRadius: '14px', boxShadow: '0 3px 12px rgba(0,0,0,0.05)', padding: '16px 0' }}
          >
            <Row gutter={[16, 16]}>
              {group.companies.map((company, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #f0f0f0',
                    borderRadius: '10px',
                    padding: '16px',
                    height: '100%',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                  }}>
                    <Text strong style={{ fontSize: '15px', color: '#134e90' }}>
                      {company.name}
                    </Text>
                    <Divider style={{ margin: '10px 0' }} />
                    <Text type="secondary" style={{ fontSize: '13.5px', display: 'block' }}>
                      {company.description}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
)}


        {activeTab === 'leadership' && (
          <div>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '40px', color: '#134e90' }}>
              Executive Leadership Team
            </Title>
            
            <Row gutter={[24, 32]}>
              {executives.map((exec, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card 
                    style={{ 
                      borderRadius: '12px', 
                      textAlign: 'center',
                      height: '100%',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <Avatar 
                      src={exec.avatar} 
                      size={120}
                      style={{ marginBottom: '16px' }}
                    />
                    <Title level={5} style={{ marginBottom: '4px' }}>
                      {exec.name}
                    </Title>
                    <Text type="secondary" style={{ 
                      display: 'block', 
                      marginBottom: '12px',
                      fontSize: '14px'
                    }}>
                      {exec.position}
                    </Text>
                    <Paragraph style={{ fontSize: '13px', color: '#666' }}>
                      {exec.bio}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>

            <Divider style={{ margin: '48px 0' }} />

            <Title level={4} style={{ textAlign: 'center', marginBottom: '32px', color: '#134e90' }}>
              Managing Directors
            </Title>

            <Row gutter={[16, 16]}>
              {companyMDs.map((md, index) => (
                <Col xs={12} sm={8} md={6} key={index}>
                  <div style={{ textAlign: 'center' }}>
                    <Avatar src={md.avatar} size={64} style={{ marginBottom: '8px' }} />
                    <Text strong style={{ display: 'block', fontSize: '14px' }}>
                      {md.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      MD, {md.company}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {activeTab === 'csr' && (
          <div>
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <Card style={{ borderRadius: '12px', marginBottom: '24px' }}>
                  <Title level={3} style={{ color: '#134e90', marginBottom: '24px' }}>
                    Corporate Social Responsibility
                  </Title>
                  <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                    At Tosakan Corporation, we believe that business success and social 
                    responsibility go hand in hand. Our commitment to Thailand's sustainable 
                    development is reflected in our comprehensive CSR programs.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card 
                  title={
                    <Space>
                      <EnvironmentOutlined style={{ color: '#52c41a', fontSize: '24px' }} />
                      <span>Environmental Stewardship</span>
                    </Space>
                  }
                  style={{ borderRadius: '12px', height: '100%' }}
                >
                  <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                    <li>Carbon neutral operations by 2030</li>
                    <li>50% reduction in plastic packaging</li>
                    <li>100% renewable energy in manufacturing</li>
                    <li>Water conservation programs saving 2M liters annually</li>
                    <li>Reforestation: 1 million trees planted since 2020</li>
                  </ul>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card 
                  title={
                    <Space>
                      <HeartOutlined style={{ color: '#eb2f96', fontSize: '24px' }} />
                      <span>Community Development</span>
                    </Space>
                  }
                  style={{ borderRadius: '12px', height: '100%' }}
                >
                  <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                    <li>Education scholarships for 10,000+ students</li>
                    <li>Rural development programs in 50 provinces</li>
                    <li>Healthcare initiatives reaching 100,000+ people</li>
                    <li>Emergency relief fund for natural disasters</li>
                    <li>Support for 500+ local SMEs and farmers</li>
                  </ul>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card 
                  title={
                    <Space>
                      <SafetyOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
                      <span>National Support Initiatives</span>
                    </Space>
                  }
                  style={{ borderRadius: '12px', height: '100%' }}
                >
                  <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                    <li>COVID-19 relief: ฿500M in medical supplies</li>
                    <li>Flood relief operations nationwide</li>
                    <li>Technology education for rural schools</li>
                    <li>Supporting Thai athletes and sports development</li>
                    <li>Preserving Thai cultural heritage sites</li>
                  </ul>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card 
                  title={
                    <Space>
                      <RiseOutlined style={{ color: '#722ed1', fontSize: '24px' }} />
                      <span>Economic Development</span>
                    </Space>
                  }
                  style={{ borderRadius: '12px', height: '100%' }}
                >
                  <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                    <li>Youth employment program: 5,000 jobs annually</li>
                    <li>Digital skills training for 20,000+ people</li>
                    <li>Supporting Thai startups with ฿1B fund</li>
                    <li>Promoting Thai products globally</li>
                    <li>Innovation labs in 10 universities</li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </div>
        )}

        {/* Footer Section */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '60px',
          padding: '40px',
          background: '#f5f7fa',
          borderRadius: '12px'
        }}>
          <Title level={4} style={{ color: '#134e90', marginBottom: '16px' }}>
            Building Thailand's Future Together
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            Tosakan Corporation - Where Innovation Meets Tradition
          </Text>
        </div>
      </div>
    </div>
  );
}