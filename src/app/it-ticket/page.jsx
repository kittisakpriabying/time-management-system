"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Form,
  Select,
  DatePicker,
  Input,
  InputNumber,
  Table,
  Tag,
  Avatar,
  Divider,
  Modal,
  message,
  Steps,
  Upload,
  Progress,
  Timeline,
  Tooltip,
  Badge,
  Rate,
  Image,
} from "antd";
import {
  BugOutlined,
  ToolOutlined,
  PlusOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  DownloadOutlined,
  CalendarOutlined,
  DesktopOutlined,
  MobileOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  WifiOutlined,
  PrinterOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  FireOutlined,
  AlertOutlined,
  InfoCircleOutlined,
  SyncOutlined,
  MessageOutlined,
  PhoneOutlined,
  TeamOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Kanit } from "next/font/google";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const formItemStyle = {
  "& .ant-form-item-label": {
    width: "100%",
    textAlign: "left",
    paddingBottom: "8px",
  },
  "& .ant-form-item-control": {
    width: "100%",
  },
};

// Font Loader
const kanit = Kanit({
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
  subsets: ["thai", "latin"],
  display: "swap",
});

export default function ITTicketSystem() {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("create");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketType, setTicketType] = useState("");

  // Employee data
  const employeeData = {
    name: "Kittisak Priabying",
    position: "Junior Full Stack Engineer",
    department: "Information Technology Department",
    employeeId: "7984563211",
    email: "kittisak.pri@tosakancorp.com",
    phone: "044-123-4567",
    location: "Head Quarter, Bangkok",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  // IT Support Team
  const supportTeam = [
    {
      id: 1,
      name: "Somchai Techsupport",
      role: "IT Support Level 1",
      speciality: "Hardware, Network",
      email: "somchai.tech@tosakancorp.com",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      status: "online",
    },
    {
      id: 2,
      name: "Wanida Sysadmin",
      role: "System Administrator",
      speciality: "Server, Database",
      email: "wanida.sys@tosakancorp.com",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      status: "online",
    },
    {
      id: 3,
      name: "Praphan Security",
      role: "Security Specialist",
      speciality: "Security, VPN",
      email: "praphan.sec@tosakancorp.com",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      status: "busy",
    },
  ];

  // Ticket Categories
  const ticketCategories = [
    {
      value: "hardware",
      label: "ฮาร์ดแวร์ (Hardware)",
      icon: <DesktopOutlined />,
      color: "#52c41a",
      sla: 4, // hours
      examples: "คอมพิวเตอร์เสีย, เมาส์-คีย์บอร์ด, จอภาพ, เครื่องพิมพ์",
    },
    {
      value: "software",
      label: "ซอฟต์แวร์ (Software)",
      icon: <ToolOutlined />,
      color: "#1890ff",
      sla: 2,
      examples: "โปรแกรมขัดข้อง, ลิขสิทธิ์ซอฟต์แวร์, อัปเดตโปรแกรม",
    },
    {
      value: "network",
      label: "เครือข่าย (Network)",
      icon: <WifiOutlined />,
      color: "#faad14",
      sla: 1,
      examples: "อินเทอร์เน็ตช้า, เชื่อมต่อ Wi-Fi ไม่ได้, VPN",
    },
    {
      value: "email",
      label: "อีเมล (Email)",
      icon: <MessageOutlined />,
      color: "#722ed1",
      sla: 2,
      examples: "ส่งอีเมลไม่ได้, รับอีเมลไม่ได้, Outlook ขัดข้อง",
    },
    {
      value: "security",
      label: "ความปลอดภัย (Security)",
      icon: <SecurityScanOutlined />,
      color: "#f5222d",
      sla: 1,
      examples: "ไวรัส, การโจมตี, รหัสผ่าน, สิทธิ์การเข้าถึง",
    },
    {
      value: "mobile",
      label: "อุปกรณ์เคลื่อนที่",
      icon: <MobileOutlined />,
      color: "#13c2c2",
      sla: 4,
      examples: "มือถือบริษัท, แท็บเล็ต, โมเด็ม 4G",
    },
    {
      value: "website",
      label: "เว็บไซต์/ระบบ",
      icon: <GlobalOutlined />,
      color: "#eb2f96",
      sla: 2,
      examples: "เว็บไซต์ล่ม, ระบบช้า, เข้าระบบไม่ได้",
    },
    {
      value: "other",
      label: "อื่นๆ",
      icon: <SettingOutlined />,
      color: "#666666",
      sla: 6,
      examples: "ปัญหาอื่นๆ ที่ไม่อยู่ในหมวดข้างต้น",
    },
  ];

  // Priority levels
  const priorityLevels = [
    {
      value: "low",
      label: "ต่ำ (Low)",
      color: "#52c41a",
      icon: <InfoCircleOutlined />,
      description: "ไม่กระทบการทำงาน",
      response: "24 ชม.",
    },
    {
      value: "medium",
      label: "ปานกลาง (Medium)",
      color: "#faad14",
      icon: <ExclamationCircleOutlined />,
      description: "กระทบการทำงานบางส่วน",
      response: "8 ชม.",
    },
    {
      value: "high",
      label: "สูง (High)",
      color: "#ff7a45",
      icon: <AlertOutlined />,
      description: "กระทบการทำงานอย่างมาก",
      response: "2 ชม.",
    },
    {
      value: "critical",
      label: "วิกฤต (Critical)",
      color: "#f5222d",
      icon: <FireOutlined />,
      description: "ระบบล่มทั้งหมด",
      response: "30 นาที",
    },
  ];

  // Mock ticket data
  const ticketHistory = [
    {
      id: 1,
      ticketNumber: "IT-2024-0001",
      title: "คอมพิวเตอร์เปิดไม่ติด",
      category: "hardware",
      priority: "high",
      status: "resolved",
      assignee: "Somchai Techsupport",
      createdDate: "2024-05-20 09:15",
      resolvedDate: "2024-05-20 11:30",
      responseTime: "15 นาที",
      resolutionTime: "2 ชม. 15 นาที",
      satisfaction: 5,
      description:
        "คอมพิวเตอร์เปิดไม่ติดหลังจากไฟดับเมื่อวาน หน้าจอดำ ไฟ LED ไม่ติด",
      solution:
        "ตรวจสอบพบว่าสายไฟหลวม เสียบสายไฟให้แน่น และเปลี่ยน Power Supply ใหม่",
      updates: [
        {
          time: "2024-05-20 09:15",
          action: "สร้างรายการแจ้ง",
          user: "Kittisak Priabying",
        },
        {
          time: "2024-05-20 09:30",
          action: "รับเรื่องแล้ว",
          user: "Somchai Techsupport",
        },
        {
          time: "2024-05-20 10:00",
          action: "เริ่มดำเนินการ",
          user: "Somchai Techsupport",
        },
        {
          time: "2024-05-20 11:30",
          action: "แก้ไขเสร็จสิ้น",
          user: "Somchai Techsupport",
        },
      ],
    },
    {
      id: 2,
      ticketNumber: "IT-2024-0002",
      title: "อินเทอร์เน็ตช้ามาก ไม่สามารถทำงานได้",
      category: "network",
      priority: "critical",
      status: "in_progress",
      assignee: "Wanida Sysadmin",
      createdDate: "2024-05-22 14:20",
      responseTime: "10 นาที",
      description:
        "อินเทอร์เน็ตช้ามากตั้งแต่เช้า เว็บไซต์โหลดไม่ขึ้น ส่งอีเมลไม่ได้",
      updates: [
        {
          time: "2024-05-22 14:20",
          action: "สร้างรายการแจ้ง",
          user: "Kittisak Priabying",
        },
        {
          time: "2024-05-22 14:30",
          action: "รับเรื่องแล้ว",
          user: "Wanida Sysadmin",
        },
        {
          time: "2024-05-22 15:00",
          action: "กำลังตรวจสอบ Switch หลัก",
          user: "Wanida Sysadmin",
        },
      ],
    },
    {
      id: 3,
      ticketNumber: "IT-2024-0003",
      title: "ขอติดตั้งโปรแกรม Adobe Creative Suite",
      category: "software",
      priority: "low",
      status: "open",
      assignee: null,
      createdDate: "2024-05-23 10:45",
      description:
        "ขอติดตั้ง Adobe Photoshop และ Illustrator สำหรับงาน Marketing",
      updates: [
        {
          time: "2024-05-23 10:45",
          action: "สร้างรายการแจ้ง",
          user: "Kittisak Priabying",
        },
      ],
    },
    {
      id: 4,
      ticketNumber: "IT-2024-0004",
      title: "เครื่องพิมพ์ Canon ชั้น 3 พิมพ์ไม่ออก",
      category: "hardware",
      priority: "medium",
      status: "pending",
      assignee: "Somchai Techsupport",
      createdDate: "2024-05-24 16:30",
      responseTime: "1 ชม.",
      description:
        "เครื่องพิมพ์ Canon imageRUNNER ชั้น 3 แสดงข้อความ Error E000020-0001",
      updates: [
        {
          time: "2024-05-24 16:30",
          action: "สร้างรายการแจ้ง",
          user: "Kittisak Priabying",
        },
        {
          time: "2024-05-24 17:30",
          action: "รับเรื่องแล้ว - รอจัดหา Toner",
          user: "Somchai Techsupport",
        },
      ],
    },
  ];

  // Ticket statistics
  const ticketStats = {
    thisMonth: {
      total: 45,
      open: 12,
      inProgress: 8,
      resolved: 22,
      closed: 3,
      avgResolutionTime: "4.2 ชม.",
      satisfaction: 4.3,
    },
    byCategory: [
      { category: "hardware", count: 18, percentage: 40 },
      { category: "software", count: 12, percentage: 27 },
      { category: "network", count: 8, percentage: 18 },
      { category: "email", count: 4, percentage: 9 },
      { category: "security", count: 2, percentage: 4 },
      { category: "other", count: 1, percentage: 2 },
    ],
    byPriority: [
      { priority: "critical", count: 3 },
      { priority: "high", count: 8 },
      { priority: "medium", count: 22 },
      { priority: "low", count: 12 },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "#1890ff";
      case "in_progress":
        return "#faad14";
      case "pending":
        return "#722ed1";
      case "resolved":
        return "#52c41a";
      case "closed":
        return "#666666";
      default:
        return "#d9d9d9";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <ExclamationCircleOutlined />;
      case "in_progress":
        return <SyncOutlined spin />;
      case "pending":
        return <ClockCircleOutlined />;
      case "resolved":
        return <CheckCircleOutlined />;
      case "closed":
        return <CloseCircleOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "open":
        return "เปิดใหม่";
      case "in_progress":
        return "กำลังดำเนินการ";
      case "pending":
        return "รอดำเนินการ";
      case "resolved":
        return "แก้ไขแล้ว";
      case "closed":
        return "ปิดแล้ว";
      default:
        return "ไม่ทราบสถานะ";
    }
  };

  const getCategoryInfo = (categoryValue) => {
    return ticketCategories.find((cat) => cat.value === categoryValue);
  };

  const getPriorityInfo = (priorityValue) => {
    return priorityLevels.find((pri) => pri.value === priorityValue);
  };

  const columns = [
    {
      title: "Ticket #",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
      render: (text) => (
        <Text strong style={{ color: "#2b6cb0" }}>
          {text}
        </Text>
      ),
    },
    {
      title: "หัวเรื่อง",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "500", marginBottom: "4px" }}>{text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {getCategoryInfo(record.category)?.icon}{" "}
            {getCategoryInfo(record.category)?.label}
          </div>
        </div>
      ),
    },
    {
      title: "ความสำคัญ",
      dataIndex: "priority",
      key: "priority",
      align: "center",
      render: (priority) => {
        const priorityInfo = getPriorityInfo(priority);
        return (
          <Tag icon={priorityInfo?.icon} color={priorityInfo?.color}>
            {priorityInfo?.label}
          </Tag>
        );
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "ผู้รับผิดชอบ",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee) =>
        assignee ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar
              size="small"
              src={supportTeam.find((t) => t.name === assignee)?.avatar}
            />
            <Text style={{ fontSize: "12px" }}>{assignee}</Text>
          </div>
        ) : (
          <Text style={{ color: "#999", fontSize: "12px" }}>
            ยังไม่ได้มอบหมาย
          </Text>
        ),
    },
    {
      title: "เวลาตอบสนอง",
      dataIndex: "responseTime",
      key: "responseTime",
      render: (time) =>
        time ? <Text style={{ fontSize: "12px" }}>{time}</Text> : "-",
    },
    {
      title: "วันที่สร้าง",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => (
        <div style={{ fontSize: "12px" }}>
          <div>{dayjs(date).format("DD/MM/YYYY")}</div>
          <div style={{ color: "#666" }}>{dayjs(date).format("HH:mm")}</div>
        </div>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewTicket(record)}
            style={{ color: "#2b6cb0" }}
          />
          {record.status === "open" && (
            <>
              <Button
                type="text"
                icon={<EditOutlined />}
                style={{ color: "#faad14" }}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                style={{ color: "#f5222d" }}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleViewTicket = (record) => {
    setSelectedTicket(record);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    const newTicketNumber = `IT-2024-${String(
      ticketHistory.length + 1
    ).padStart(4, "0")}`;
    console.log("IT Ticket submitted:", {
      ...values,
      ticketNumber: newTicketNumber,
      employeeData,
      createdDate: dayjs().format("YYYY-MM-DD HH:mm"),
    });

    message.success("สร้าง IT Ticket สำเร็จ!");
    form.resetFields();
  };

  return (
    <div
      className={kanit.className}
      
    >
      <div
        style={{
          maxWidth: "1800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 40px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(90deg, #134e90 0%, #2973c2 100%)",
            borderRadius: "12px",
            padding: "24px 30px",
            color: "white",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ marginRight: "24px" }}>
            <Avatar
              src={employeeData.avatar}
              size={70}
              style={{
                border: "3px solid white",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Title level={4} style={{ color: "white", margin: "0 0 4px 0", fontFamily: "Kanit, sans-serif" }}>
              ระบบแจ้งปัญหา IT - {employeeData.name}
            </Title>
            <Text
              style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "15px" }}
            >
              {employeeData.position} | {employeeData.department}
            </Text>
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "600" }}>
                {ticketStats.thisMonth.open + ticketStats.thisMonth.inProgress}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                Ticket เปิดอยู่
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "600" }}>
                {ticketStats.thisMonth.avgResolutionTime}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                เวลาเฉลี่ยการแก้ไข
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "24px", fontWeight: "600" }}>
                  {ticketStats.thisMonth.satisfaction}
                </div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>
                  ความพึงพอใจ
                </div>
              </div>
              <Rate
                disabled
                defaultValue={ticketStats.thisMonth.satisfaction}
                style={{ fontSize: "14px" }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              borderBottom: "1px solid #e8e8e8",
              padding: "0 16px",
              display: "flex",
            }}
          >
            <div
              onClick={() => setActiveKey("create")}
              style={{
                padding: "16px 20px",
                fontSize: "15px",
                cursor: "pointer",
                color: activeKey === "create" ? "#2b6cb0" : "#666",
                fontWeight: activeKey === "create" ? "500" : "normal",
                borderBottom:
                  activeKey === "create" ? "2px solid #2b6cb0" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <PlusOutlined />
              <span>แจ้งปัญหา</span>
            </div>
            <div
              onClick={() => setActiveKey("tickets")}
              style={{
                padding: "16px 20px",
                fontSize: "15px",
                cursor: "pointer",
                color: activeKey === "tickets" ? "#2b6cb0" : "#666",
                fontWeight: activeKey === "tickets" ? "500" : "normal",
                borderBottom:
                  activeKey === "tickets" ? "2px solid #2b6cb0" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <BugOutlined />
              <span>Ticket ของฉัน</span>
            </div>
            <div
              onClick={() => setActiveKey("knowledge")}
              style={{
                padding: "16px 20px",
                fontSize: "15px",
                cursor: "pointer",
                color: activeKey === "knowledge" ? "#2b6cb0" : "#666",
                fontWeight: activeKey === "knowledge" ? "500" : "normal",
                borderBottom:
                  activeKey === "knowledge" ? "2px solid #2b6cb0" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ToolOutlined />
              <span>คู่มือแก้ปัญหา</span>
            </div>
            <div
              onClick={() => setActiveKey("contact")}
              style={{
                padding: "16px 20px",
                fontSize: "15px",
                cursor: "pointer",
                color: activeKey === "contact" ? "#2b6cb0" : "#666",
                fontWeight: activeKey === "contact" ? "500" : "normal",
                borderBottom:
                  activeKey === "contact" ? "2px solid #2b6cb0" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <PhoneOutlined />
              <span>ติดต่อ IT</span>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: "24px",
              overflowY: "auto",
            }}
          >
            {activeKey === "create" && (
              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <SectionCard title="แจ้งปัญหา IT">
                      <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Row gutter={[24, 16]}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="category"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณาเลือกประเภทปัญหา",
                                },
                              ]}
                              style={{ marginBottom: "24px" }}
                            >
                              <div
                                style={{
                                  marginBottom: "8px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "rgba(0, 0, 0, 0.85)",
                                }}
                              >
                                ประเภทปัญหา{" "}
                                <span style={{ color: "#ff4d4f" }}>*</span>
                              </div>
                              <Select
                                placeholder="เลือกประเภทปัญหา"
                                size="large"
                                onChange={setTicketType}
                                style={{ width: "100%" }}
                              >
                                {ticketCategories.map((category) => (
                                  <Option
                                    key={category.value}
                                    value={category.value}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                      }}
                                    >
                                      <span style={{ color: category.color }}>
                                        {category.icon}
                                      </span>
                                      <div>
                                        <div>{category.label}</div>
                                        
                                      </div>
                                    </div>
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12}>
                            <Form.Item
                              label="ความสำคัญ"
                              name="priority"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณาเลือกความสำคัญ",
                                },
                              ]}
                            >
                              <Select placeholder="เลือกความสำคัญ" size="large">
                                {priorityLevels.map((priority) => (
                                  <Option
                                    key={priority.value}
                                    value={priority.value}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                      }}
                                    >
                                      <span style={{ color: priority.color }}>
                                        {priority.icon}
                                      </span>
                                      <div>
                                        <div>{priority.label}</div>
                                        
                                      </div>
                                    </div>
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col xs={24}>
                            <Form.Item
                              label="หัวเรื่อง"
                              name="title"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณาระบุหัวเรื่อง",
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                placeholder="ระบุหัวเรื่องปัญหาที่พบ..."
                                maxLength={100}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24}>
                            <Form.Item
                              label="รายละเอียดปัญหา"
                              name="description"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณาระบุรายละเอียดปัญหา",
                                },
                              ]}
                            >
                              <TextArea
                                rows={6}
                                placeholder="กรุณาระบุรายละเอียดปัญหาที่พบอย่างละเอียด เช่น:
  - อาการที่เกิดขึ้น
  - เมื่อไหร่ที่เริ่มเกิดปัญหา
  - สิ่งที่ทำก่อนเกิดปัญหา
  - ข้อความ Error (ถ้ามี)
  - ผลกระทบที่เกิดขึ้น"
                                maxLength={1000}
                                showCount
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12}>
                            <Form.Item
                              label="สถานที่/ตำแหน่ง"
                              name="location"
                              rules={[
                                { required: true, message: "กรุณาระบุสถานที่" },
                              ]}
                            >
                              <Input
                                size="large"
                                placeholder="เช่น ห้อง IT-301, โต๊ะที่ 15, ชั้น 3"
                                defaultValue={employeeData.location}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12}>
                            <Form.Item
                              label="เบราะติดต่อกลับ"
                              name="contactInfo"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณาระบุเบอร์ติดต่อ",
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                placeholder="เบอร์โทรศัพท์หรือ Extension"
                                defaultValue={employeeData.phone}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24}>
                            <Form.Item
                              label="ขั้นตอนที่ได้ลองแก้ไขแล้ว"
                              name="troubleshooting"
                            >
                              <TextArea
                                rows={3}
                                placeholder="ระบุสิ่งที่ได้ลองทำแล้ว เช่น รีสตาร์ทเครื่อง, ตรวจสอบสายไฟ, ล็อกอินใหม่..."
                                maxLength={500}
                                showCount
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24}>
                            <Form.Item
                              label="รูปภาพ/ไฟล์แนบ"
                              name="attachments"
                            >
                              <Upload.Dragger
                                multiple
                                beforeUpload={() => false}
                                accept="image/*,.pdf,.doc,.docx,.txt"
                                style={{ background: "#fafbfd" }}
                              >
                                <p className="ant-upload-drag-icon">
                                  <UploadOutlined
                                    style={{ color: "#2b6cb0" }}
                                  />
                                </p>
                                <p className="ant-upload-text">
                                  คลิกหรือลากไฟล์มาวางที่นี่
                                </p>
                                <p className="ant-upload-hint">
                                  รองรับ รูปภาพ, PDF, Word, Text ขนาดไม่เกิน
                                  10MB
                                  <br />
                                  แนะนำ: แนบรูป Error Message หรือ Screenshot
                                </p>
                              </Upload.Dragger>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Divider />

                        <div style={{ textAlign: "right" }}>
                          <Space>
                            <Button
                              size="large"
                              onClick={() => form.resetFields()}
                            >
                              ล้างข้อมูล
                            </Button>
                            <Button
                              type="primary"
                              size="large"
                              htmlType="submit"
                              style={{
                                background:
                                  "linear-gradient(90deg, #134e90 0%, #2973c2 100%)",
                                border: "none",
                              }}
                            >
                              ส่งรายการแจ้ง
                            </Button>
                          </Space>
                        </div>
                      </Form>
                    </SectionCard>
                  </Col>

                  <Col xs={24} lg={8}>
                    {/* Quick Help */}
                    <SectionCard title="วิธีแก้ปัญหาเบื้องต้น">
                      <div style={{ marginBottom: "16px" }}>
                        <Text strong style={{ color: "#2b6cb0" }}>
                          💡 ก่อนแจ้ง IT ลองทำดู:
                        </Text>
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            marginBottom: "8px",
                            color: "#52c41a",
                          }}
                        >
                          🖥️ ปัญหาคอมพิวเตอร์:
                        </div>
                        <ul
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            margin: 0,
                            paddingLeft: "20px",
                          }}
                        >
                          <li>รีสตาร์ทเครื่องคอมพิวเตอร์</li>
                          <li>ตรวจสอบสายไฟและสาย LAN</li>
                          <li>ปิดโปรแกรมที่ไม่จำเป็น</li>
                        </ul>
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            marginBottom: "8px",
                            color: "#1890ff",
                          }}
                        >
                          🌐 ปัญหาอินเทอร์เน็ต:
                        </div>
                        <ul
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            margin: 0,
                            paddingLeft: "20px",
                          }}
                        >
                          <li>ตรวจสอบ Wi-Fi Connection</li>
                          <li>รีสตาร์ท Router/Modem</li>
                          <li>ลอง Clear Browser Cache</li>
                        </ul>
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            marginBottom: "8px",
                            color: "#faad14",
                          }}
                        >
                          📧 ปัญหาอีเมล:
                        </div>
                        <ul
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            margin: 0,
                            paddingLeft: "20px",
                          }}
                        >
                          <li>ลอง Log out และ Log in ใหม่</li>
                          <li>ตรวจสอบ Password</li>
                          <li>เช็ค Spam/Junk Folder</li>
                        </ul>
                      </div>

                      <Divider />

                      <div
                        style={{
                          background: "#f6ffed",
                          padding: "12px",
                          borderRadius: "6px",
                          border: "1px solid #b7eb8f",
                        }}
                      >
                        <Text strong style={{ color: "#52c41a" }}>
                          📞 Emergency:
                        </Text>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "4px",
                          }}
                        >
                          กรณีเร่งด่วน โทร IT Hotline:
                          <br />
                          <Text strong style={{ color: "#f5222d" }}>
                            02-123-4567 ต่อ 911
                          </Text>
                        </div>
                      </div>
                    </SectionCard>
                  </Col>
                </Row>
              </div>
            )}

            {activeKey === "tickets" && (
              <div>
                <SectionCard title="รายการ IT Tickets ของฉัน">
                  <Table
                    columns={columns}
                    dataSource={ticketHistory}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1200 }}
                  />
                </SectionCard>
              </div>
            )}

            {activeKey === "knowledge" && (
              <div>
                <Row gutter={[24, 24]}>
                  {ticketCategories.map((category) => (
                    <Col xs={24} md={12} lg={8} key={category.value}>
                      <SectionCard title={category.label}>
                        <div
                          style={{ textAlign: "center", marginBottom: "16px" }}
                        >
                          <div
                            style={{
                              fontSize: "48px",
                              color: category.color,
                              marginBottom: "12px",
                            }}
                          >
                            {category.icon}
                          </div>
                          <Text style={{ fontSize: "13px", color: "#666" }}>
                            {category.examples}
                          </Text>
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            color: "#999",
                            textAlign: "center",
                          }}
                        >
                          SLA: {category.sla} ชั่วโมง
                        </div>

                        <Divider />

                        <Button
                          block
                          size="small"
                          style={{
                            borderColor: category.color,
                            color: category.color,
                          }}
                        >
                          ดูคู่มือแก้ปัญหา
                        </Button>
                      </SectionCard>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {activeKey === "contact" && (
              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={12}>
                    <SectionCard title="ทีม IT Support">
                      {supportTeam.map((member) => (
                        <div
                          key={member.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "12px",
                            border: "1px solid #f0f0f0",
                            borderRadius: "8px",
                            marginBottom: "12px",
                          }}
                        >
                          <Badge
                            status={
                              member.status === "online"
                                ? "success"
                                : member.status === "busy"
                                ? "warning"
                                : "default"
                            }
                            offset={[-8, 45]}
                          >
                            <Avatar src={member.avatar} size={50} />
                          </Badge>
                          <div style={{ marginLeft: "16px", flex: 1 }}>
                            <div
                              style={{ fontWeight: "500", fontSize: "16px" }}
                            >
                              {member.name}
                            </div>
                            <div style={{ color: "#666", fontSize: "13px" }}>
                              {member.role}
                            </div>
                            <div style={{ color: "#1890ff", fontSize: "12px" }}>
                              📧 {member.email}
                            </div>
                            <Tag
                              size="small"
                              color="#f0f0f0"
                              style={{ fontSize: "11px", marginTop: "4px" }}
                            >
                              {member.speciality}
                            </Tag>
                          </div>
                          <div>
                            <Button
                              type="primary"
                              size="small"
                              disabled={member.status !== "online"}
                              style={{ fontSize: "12px" }}
                            >
                              ติดต่อ
                            </Button>
                          </div>
                        </div>
                      ))}
                    </SectionCard>
                  </Col>

                  <Col xs={24} lg={12}>
                    <SectionCard title="ช่องทางติดต่อ IT">
                      <div style={{ marginBottom: "20px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "16px",
                          }}
                        >
                          <div
                            style={{
                              background: "#f5222d",
                              color: "white",
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <PhoneOutlined />
                          </div>
                          <div>
                            <div style={{ fontWeight: "500" }}>
                              IT Hotline (Emergency)
                            </div>
                            <div
                              style={{
                                color: "#f5222d",
                                fontSize: "18px",
                                fontWeight: "600",
                              }}
                            >
                              02-123-4567 ต่อ 911
                            </div>
                            <div style={{ fontSize: "12px", color: "#666" }}>
                              24/7 สำหรับปัญหาเร่งด่วน
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "16px",
                          }}
                        >
                          <div
                            style={{
                              background: "#1890ff",
                              color: "white",
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <MessageOutlined />
                          </div>
                          <div>
                            <div style={{ fontWeight: "500" }}>
                              IT Support Email
                            </div>
                            <div style={{ color: "#1890ff", fontSize: "16px" }}>
                              itsupport@tosakancorp.com
                            </div>
                            <div style={{ fontSize: "12px", color: "#666" }}>
                              ตอบกลับภายใน 2 ชั่วโมง
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "16px",
                          }}
                        >
                          <div
                            style={{
                              background: "#52c41a",
                              color: "white",
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TeamOutlined />
                          </div>
                          <div>
                            <div style={{ fontWeight: "500" }}>
                              LINE Official
                            </div>
                            <div style={{ color: "#52c41a", fontSize: "16px" }}>
                              @tosakan-it
                            </div>
                            <div style={{ fontSize: "12px", color: "#666" }}>
                              ติดตามสถานะ Ticket
                            </div>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      <div
                        style={{
                          background: "#fff7e6",
                          padding: "16px",
                          borderRadius: "8px",
                          border: "1px solid #ffd591",
                        }}
                      >
                        <Text strong style={{ color: "#d48806" }}>
                          ⏰ เวลาทำการ:
                        </Text>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "8px",
                          }}
                        >
                          <div>จันทร์ - ศุกร์: 08:00 - 18:00</div>
                          <div>เสาร์: 08:00 - 12:00</div>
                          <div style={{ color: "#f5222d" }}>
                            Emergency: 24/7
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

      {/* Ticket Detail Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <BugOutlined style={{ color: "#2b6cb0" }} />
            <span>รายละเอียด IT Ticket</span>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            ปิด
          </Button>,
          selectedTicket?.status === "resolved" && (
            <Button
              key="rate"
              type="primary"
              style={{
                background: "#52c41a",
                borderColor: "#52c41a",
              }}
            >
              ให้คะแนน
            </Button>
          ),
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            style={{
              background: "linear-gradient(90deg, #134e90 0%, #2973c2 100%)",
              border: "none",
            }}
          >
            ดาวน์โหลด
          </Button>,
        ]}
        width={800}
      >
        {selectedTicket && (
          <div>
            {/* Ticket Header */}
            <div style={{ marginBottom: "24px" }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Ticket Number:</Text>
                  <br />
                  <Text
                    style={{
                      fontSize: "18px",
                      color: "#2b6cb0",
                      fontWeight: "600",
                    }}
                  >
                    {selectedTicket.ticketNumber}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong>สถานะ:</Text>
                  <br />
                  <Tag
                    icon={getStatusIcon(selectedTicket.status)}
                    color={getStatusColor(selectedTicket.status)}
                    style={{ fontSize: "14px", padding: "4px 12px" }}
                  >
                    {getStatusText(selectedTicket.status)}
                  </Tag>
                </Col>
                <Col span={12}>
                  <Text strong>ประเภท:</Text>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        color: getCategoryInfo(selectedTicket.category)?.color,
                      }}
                    >
                      {getCategoryInfo(selectedTicket.category)?.icon}
                    </span>
                    <span>
                      {getCategoryInfo(selectedTicket.category)?.label}
                    </span>
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>ความสำคัญ:</Text>
                  <br />
                  <Tag
                    icon={getPriorityInfo(selectedTicket.priority)?.icon}
                    color={getPriorityInfo(selectedTicket.priority)?.color}
                  >
                    {getPriorityInfo(selectedTicket.priority)?.label}
                  </Tag>
                </Col>
                <Col span={24}>
                  <Text strong>หัวเรื่อง:</Text>
                  <br />
                  <Text style={{ fontSize: "16px" }}>
                    {selectedTicket.title}
                  </Text>
                </Col>
              </Row>
            </div>

            <Divider />

            {/* Ticket Details */}
            <div style={{ marginBottom: "24px" }}>
              <Title
                level={5}
                style={{ color: "#2b6cb0", marginBottom: "16px" }}
              >
                รายละเอียดปัญหา
              </Title>
              <div
                style={{
                  background: "#fafafa",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #f0f0f0",
                }}
              >
                <Text>{selectedTicket.description}</Text>
              </div>
            </div>

            {/* Assignment & Timeline */}
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <Text strong>ผู้รับผิดชอบ:</Text>
                <br />
                {selectedTicket.assignee ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "8px",
                    }}
                  >
                    <Avatar
                      src={
                        supportTeam.find(
                          (t) => t.name === selectedTicket.assignee
                        )?.avatar
                      }
                    />
                    <div>
                      <div style={{ fontWeight: "500" }}>
                        {selectedTicket.assignee}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {
                          supportTeam.find(
                            (t) => t.name === selectedTicket.assignee
                          )?.role
                        }
                      </div>
                    </div>
                  </div>
                ) : (
                  <Text style={{ color: "#999" }}>ยังไม่ได้มอบหมาย</Text>
                )}
              </Col>
              <Col span={12}>
                <Text strong>เวลา:</Text>
                <br />
                <div style={{ marginTop: "8px" }}>
                  <div style={{ fontSize: "13px", marginBottom: "4px" }}>
                    <Text style={{ color: "#666" }}>สร้าง:</Text>{" "}
                    {selectedTicket.createdDate}
                  </div>
                  {selectedTicket.responseTime && (
                    <div style={{ fontSize: "13px", marginBottom: "4px" }}>
                      <Text style={{ color: "#666" }}>ตอบสนอง:</Text>{" "}
                      {selectedTicket.responseTime}
                    </div>
                  )}
                  {selectedTicket.resolutionTime && (
                    <div style={{ fontSize: "13px", marginBottom: "4px" }}>
                      <Text style={{ color: "#666" }}>แก้ไข:</Text>{" "}
                      {selectedTicket.resolutionTime}
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            <Divider />

            {/* Updates Timeline */}
            <div style={{ marginBottom: "24px" }}>
              <Title
                level={5}
                style={{ color: "#2b6cb0", marginBottom: "16px" }}
              >
                ประวัติการดำเนินการ
              </Title>
              <Timeline>
                {selectedTicket.updates?.map((update, index) => (
                  <Timeline.Item
                    key={index}
                    color={index === 0 ? "#1890ff" : "#52c41a"}
                    dot={
                      index === selectedTicket.updates.length - 1 ? (
                        <ClockCircleOutlined />
                      ) : undefined
                    }
                  >
                    <div>
                      <Text strong>{update.action}</Text>
                      <br />
                      <Text style={{ fontSize: "12px", color: "#666" }}>
                        โดย {update.user} • {update.time}
                      </Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>

            {/* Solution */}
            {selectedTicket.solution && (
              <div style={{ marginBottom: "24px" }}>
                <Title
                  level={5}
                  style={{ color: "#52c41a", marginBottom: "16px" }}
                >
                  วิธีการแก้ไข
                </Title>
                <div
                  style={{
                    background: "#f6ffed",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #b7eb8f",
                  }}
                >
                  <Text>{selectedTicket.solution}</Text>
                </div>
              </div>
            )}

            {/* Satisfaction Rating */}
            {selectedTicket.satisfaction && (
              <div
                style={{
                  background: "#fff7e6",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #ffd591",
                  textAlign: "center",
                }}
              >
                <Text strong style={{ color: "#d48806" }}>
                  คะแนนความพึงพอใจ
                </Text>
                <br />
                <Rate
                  disabled
                  defaultValue={selectedTicket.satisfaction}
                  style={{ fontSize: "20px", marginTop: "8px" }}
                />
                <br />
                <Text style={{ fontSize: "14px", color: "#666" }}>
                  {selectedTicket.satisfaction}/5 ดาว
                </Text>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

// Section Card Component
function SectionCard({ title, children }) {
  return (
    <div
      style={{
        borderRadius: "12px",
        border: "1px solid #eaedf2",
        overflow: "hidden",
        height: "100%",
        background: "white",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #eaedf2",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fafbfd",
        }}
      >
        <Text strong style={{ fontSize: "15px", color: "#2b6cb0" }}>
          {title}
        </Text>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}
