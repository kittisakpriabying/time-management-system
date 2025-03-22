'use client';

import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Avatar, Space, Typography, Button, Tooltip } from 'antd';
import './globals.css';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export default function RootLayout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [name, setName] = React.useState('Kittisak Priabying'); 
  const [email, setEmail] = React.useState('kittisak.pr@tosakancorp.com');
  const [code, setCode] = React.useState('7984563211');
  const [sysName, setSysName] = React.useState('Tosakan Corperation Portal');
  const [sysVersion, setSysVersion] = React.useState('1.0.0');  

  const handleLogout = () => {
    // เพิ่มโค้ดสำหรับการออกจากระบบที่นี่
    console.log('User logged out');
  };

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Layout style={{ minHeight: '100vh' }}>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(90deg, #1a365d 0%, #2b6cb0 100%)',
              padding: '0 16px',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo ชิดซ้าย */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: 500, 
                height: 32, 
                // background: 'rgba(255, 255, 255, 0.2)', 
                // margin: '16px 24px 16px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '32px',
              }}>
              {sysName}
              </div>
              
              
            </div>
            
            {/* Avatar, ข้อมูลพนักงาน และปุ่ม Logout ชิดขวา */}
            <Space>
              <Avatar size={40} icon={<UserOutlined />} />
              <div style={{ textAlign: 'left', marginRight: 10 }}>
                <Text style={{ color: 'white', display: 'block' }}>{name}</Text>
                <Text style={{ color: 'white', display: 'block', fontSize: '12px' }}>{email}</Text>
              </div>
              <Tooltip title="Logout">
                <Button 
                  type="text" 
                  icon={<LogoutOutlined />} 
                  onClick={handleLogout}
                  style={{ color: 'white' }}
                />
              </Tooltip>
            </Space>
          </Header>
          <Layout>
            {/* <Sider
              width={200}
              style={{
                background: colorBgContainer,
              }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
                items={items2}
              />
            </Sider> */}
            <Layout
              style={{
                padding: '0 24px 24px',
              }}
            >
              
              <Content
               
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}