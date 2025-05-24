'use client';

import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Avatar, Space, Typography, Button, Tooltip } from 'antd';
import './globals.css';
import { useRouter } from 'next/navigation';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const permissions = {
  create: true,
  view: false,
  edit: false,
  delete: false,
  export: true,
  import: false,
  approve: true,
  reject: false,
  publish: true,
  archive: false,
  manageUsers: true,
  manageSettings: false,
  viewReports: true,
  manageContent: false,
  manageNotifications: true,
  manageRoles: false,
  managePermissions: true,
}


const menu = [
  {
    key: 'sub1',
    icon: React.createElement(UserOutlined),
    label: 'สำหรับพนักงาน',
    children: [
      { key: 'employee-info', label: permissions.view ? 'ข้อมูลส่วนตัว' : 'ข้อมูลพนักงาน', path: '/profile' },
      { key: 'employee-time', label: 'ขออนุมัติการลา', path: '/leave-management' },
      { key: 'ot-management', label: 'ขออนุมัติทำงานล่วงเวลา', path: '/ot-management' },
      { key: 'budget-management', label: 'ขออนุมัติงบประมาณ', path: '/budget-management' },
      { key: 'it-ticket', label: 'IT Ticket', path: '/it-ticket' },
      { key: 'meeting-management', label: 'ระบบจองห้องประชุม', path: '/meeting-management' },
      
    ],
  },
  {
    key: 'sub2',
    icon: React.createElement(LaptopOutlined),
    label: 'เกี่ยวกับ Tosakan Corporation', 
    children: [
      { key: 'about-me', label: 'Tosakan Corporation', path: '/about-me' },
    ],
  },
  // {
  //   key: 'sub3',
  //   icon: React.createElement(NotificationOutlined),
  //   label: 'การแจ้งเตือน',
  //   children: [
  //     { key: '9', label: 'ข้อความใหม่' },
  //     { key: '10', label: 'การแจ้งเตือน' },
  //     { key: '11', label: 'กิจกรรม' },
  //     { key: '12', label: 'ประกาศ' },
  //   ],
  // },
];

export default function RootLayout({ children }) {
  const router = useRouter();
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

  const handleMenuClick = (e) => {
    for (let i = 0; i < menu.length; i++) {
      const subMenu = menu[i];
      const child = subMenu.children.find((child) => child.key === e.key);
      if (child) {
        console.log('Redirecting to:', child.path);
        router.push(child.path);
        return;
      }
    }
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: 500, 
                height: 32, 
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
            {/* Sidebar - เอาคอมเมนต์ออกและปรับปรุง */}
            <Sider
              width={250}
              style={{
                background: colorBgContainer,
                boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
              }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                onClick={handleMenuClick}
                style={{
                  height: '100%',
                  borderRight: 0,
                  paddingTop: 16,
                }}
                items={menu}
              />
            </Sider>
            <Layout
              style={{
                padding: '24px',
              }}
            >
              <Content
                style={{
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  padding: 24,
                  minHeight: 280,
                }}
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