'use client';

import React, { useEffect, useRef } from 'react';
import { Card, Row, Col, Typography, Tag, Progress, Button, Space } from 'antd';
import { 
  PhoneOutlined, 
  MailOutlined, 
  LinkedinOutlined, 
  GithubOutlined,
  CodeOutlined,
  DatabaseOutlined,
  LaptopOutlined,
  GlobalOutlined,
  FireOutlined
} from '@ant-design/icons';
import { Kanit } from 'next/font/google';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const kanit = Kanit({
  weight: ['300', '400', '500', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

const { Title, Text, Paragraph } = Typography;

export default function Resume() {
  // Refs for animation
  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const progressRefs = useRef([]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Header animations
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
    
    // Profile image rotation
    gsap.to(".profile-image-container", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
    
    // About section
    gsap.from(aboutRef.current, {
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%"
      },
      y: 50,
      opacity: 0,
      duration: 0.8
    });
    
    // Skills section
    gsap.from(skillsRef.current, {
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%"
      },
      x: -50,
      opacity: 0,
      duration: 0.8
    });
    
    // Progress bars animation
    progressRefs.current.forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%"
        },
        width: 0,
        duration: 1.5,
        delay: 0.2 * index,
        ease: "power2.out"
      });
    });
    
    // Experience section
    gsap.from(experienceRef.current, {
      scrollTrigger: {
        trigger: experienceRef.current,
        start: "top 80%"
      },
      x: 50,
      opacity: 0,
      duration: 0.8
    });
    
    // Projects section stagger
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%"
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8
    });
    
    // Tags animation
    gsap.from(".animated-tag", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".tag-container",
        start: "top 90%"
      }
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={kanit.className} style={{ 
      background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      color: "#fff",
      minHeight: "100vh",
      padding: "50px 20px",
      overflow: "hidden"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <div 
          ref={headerRef} 
          style={{ 
            position: "relative", 
            padding: "30px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            marginBottom: "40px",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
            overflow: "hidden"
          }}
        >
          {/* Background elements */}
          <div className="bg-element" style={{ 
            position: "absolute", 
            width: "300px", 
            height: "300px", 
            borderRadius: "50%", 
            background: "radial-gradient(circle, rgba(0,255,224,0.1) 0%, rgba(0,0,0,0) 70%)",
            top: "-150px",
            right: "-150px",
            zIndex: "0" 
          }}></div>
          
          <div className="bg-element" style={{ 
            position: "absolute", 
            width: "200px", 
            height: "200px", 
            borderRadius: "50%", 
            background: "radial-gradient(circle, rgba(103,58,183,0.1) 0%, rgba(0,0,0,0) 70%)",
            bottom: "-100px",
            left: "-100px",
            zIndex: "0" 
          }}></div>
          
          <Row align="middle" gutter={[40, 40]} style={{ position: "relative", zIndex: "1" }}>
            <Col xs={24} md={8} style={{ textAlign: "center" }}>
              <div className="profile-image-container" style={{ 
                width: "220px", 
                height: "220px", 
                margin: "0 auto",
                borderRadius: "50%", 
                padding: "10px",
                background: "linear-gradient(145deg, #00f5d4, #673ab7)",
                position: "relative"
              }}>
                <div style={{ 
                  width: "200px", 
                  height: "200px", 
                  borderRadius: "50%", 
                  overflow: "hidden",
                  position: "relative"
                }}>
                  <Image 
                    src="/profile-photo.jpg" 
                    alt="Kittisak Priabying"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </Col>
            
            <Col xs={24} md={16}>
              <Title style={{ 
                fontSize: "3.5rem", 
                margin: "0", 
                background: "linear-gradient(90deg, #00f5d4, #b967ff 70%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold"
              }}>
                KITTISAK PRIABYING
              </Title>
              
              <Title level={3} style={{ color: "#cfd8dc", margin: "10px 0 20px" }}>
                DEVELOPER, SOFTWARE ENGINEER
              </Title>
              
              <Space direction="vertical" size={15}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "rgba(255, 255, 255, 0.1)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    marginRight: "15px"
                  }}>
                    <PhoneOutlined style={{ fontSize: "18px", color: "#00f5d4" }} />
                  </div>
                  <Text style={{ color: "#fff" }}>064-4566769</Text>
                </div>
                
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "rgba(255, 255, 255, 0.1)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    marginRight: "15px"
                  }}>
                    <MailOutlined style={{ fontSize: "18px", color: "#00f5d4" }} />
                  </div>
                  <Text style={{ color: "#fff" }}>kittisak.pr@outlook.com</Text>
                </div>
                
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "rgba(255, 255, 255, 0.1)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    marginRight: "15px"
                  }}>
                    <LinkedinOutlined style={{ fontSize: "18px", color: "#00f5d4" }} />
                  </div>
                  <Text style={{ color: "#fff" }}>Kittisak Priabying</Text>
                </div>
              </Space>
              
              <div style={{ marginTop: "25px" }}>
                <Button 
                  type="primary" 
                  size="large" 
                  style={{ 
                    marginRight: "15px", 
                    background: "linear-gradient(90deg, #00f5d4, #32b4ff)",
                    border: "none",
                    boxShadow: "0 8px 15px rgba(0, 245, 212, 0.3)"
                  }}
                  className="glow-button"
                >
                  Download CV
                </Button>
                <Button 
                  size="large" 
                  style={{ 
                    background: "transparent", 
                    borderColor: "#00f5d4",
                    color: "#fff"
                  }}
                  className="outline-button"
                >
                  Contact Me
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        
        {/* About Section */}
        <div 
          ref={aboutRef}
          style={{ 
            padding: "30px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            marginBottom: "40px",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div className="section-title" style={{ marginBottom: "20px", position: "relative" }}>
            <div style={{ 
              width: "5px", 
              height: "25px", 
              background: "#00f5d4", 
              display: "inline-block",
              marginRight: "15px",
              verticalAlign: "middle"
            }}></div>
            <Title level={2} style={{ 
              display: "inline-block", 
              margin: "0",
              color: "#fff",
              verticalAlign: "middle" 
            }}>
              ABOUT ME
            </Title>
          </div>
          
          <Text style={{ fontSize: "16px", lineHeight: "1.8", color: "#cfd8dc", display: "block" }}>
            I am a new graduate looking for a job in the field of software development. My interests include 
            programming, artificial intelligence, data science, and cryptocurrency. I have some experience in web 
            application development and am always eager to learn new technologies.
          </Text>
        </div>
        
        <Row gutter={[30, 30]}>
          <Col xs={24} lg={12}>
            {/* Skills Section */}
            <div 
              ref={skillsRef}
              style={{ 
                padding: "30px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                marginBottom: "30px",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                height: "calc(100% - 30px)"
              }}
            >
              <div className="section-title" style={{ marginBottom: "30px", position: "relative" }}>
                <div style={{ 
                  width: "5px", 
                  height: "25px", 
                  background: "#00f5d4", 
                  display: "inline-block",
                  marginRight: "15px",
                  verticalAlign: "middle"
                }}></div>
                <Title level={2} style={{ 
                  display: "inline-block", 
                  margin: "0",
                  color: "#fff",
                  verticalAlign: "middle" 
                }}>
                  SKILLS
                </Title>
              </div>
              
              <div style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Text style={{ color: "#fff", fontSize: "16px" }}>Python</Text>
                  <Text style={{ color: "#00f5d4", fontSize: "16px" }}>85%</Text>
                </div>
                <div style={{ width: "100%", height: "10px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "5px" }}>
                  <div 
                    ref={el => progressRefs.current[0] = el}
                    style={{ 
                      width: "85%", 
                      height: "100%", 
                      background: "linear-gradient(90deg, #00f5d4, #32b4ff)", 
                      borderRadius: "5px" 
                    }}
                  ></div>
                </div>
              </div>
              
              <div style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Text style={{ color: "#fff", fontSize: "16px" }}>JavaScript</Text>
                  <Text style={{ color: "#00f5d4", fontSize: "16px" }}>80%</Text>
                </div>
                <div style={{ width: "100%", height: "10px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "5px" }}>
                  <div 
                    ref={el => progressRefs.current[1] = el}
                    style={{ 
                      width: "80%", 
                      height: "100%", 
                      background: "linear-gradient(90deg, #00f5d4, #32b4ff)", 
                      borderRadius: "5px" 
                    }}
                  ></div>
                </div>
              </div>
              
              <div style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Text style={{ color: "#fff", fontSize: "16px" }}>Node.js</Text>
                  <Text style={{ color: "#00f5d4", fontSize: "16px" }}>75%</Text>
                </div>
                <div style={{ width: "100%", height: "10px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "5px" }}>
                  <div 
                    ref={el => progressRefs.current[2] = el}
                    style={{ 
                      width: "75%", 
                      height: "100%", 
                      background: "linear-gradient(90deg, #00f5d4, #32b4ff)", 
                      borderRadius: "5px" 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="section-title" style={{ marginTop: "40px", marginBottom: "20px", position: "relative" }}>
                <div style={{ 
                  width: "5px", 
                  height: "25px", 
                  background: "#00f5d4", 
                  display: "inline-block",
                  marginRight: "15px",
                  verticalAlign: "middle"
                }}></div>
                <Title level={3} style={{ 
                  display: "inline-block", 
                  margin: "0",
                  color: "#fff",
                  verticalAlign: "middle" 
                }}>
                  FRAMEWORKS & TOOLS
                </Title>
              </div>
              
              <div className="tag-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "30px" }}>
                {['Django', 'React', 'NextJS', 'Numpy', 'Pandas'].map((item, index) => (
                  <Tag 
                    key={item}
                    className="animated-tag"
                    style={{ 
                      fontSize: "14px", 
                      padding: "7px 15px", 
                      background: "linear-gradient(90deg, rgba(0, 245, 212, 0.2), rgba(50, 180, 255, 0.2))", 
                      borderRadius: "20px",
                      border: "1px solid rgba(0, 245, 212, 0.5)",
                      color: "#fff"
                    }}
                  >
                    {item}
                  </Tag>
                ))}
              </div>
              
              <div className="tag-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {['SQL Server', 'VS Code', 'Git', 'Figma'].map((item, index) => (
                  <Tag 
                    key={item}
                    className="animated-tag"
                    style={{ 
                      fontSize: "14px", 
                      padding: "7px 15px", 
                      background: "linear-gradient(90deg, rgba(103, 58, 183, 0.2), rgba(185, 103, 255, 0.2))", 
                      borderRadius: "20px",
                      border: "1px solid rgba(103, 58, 183, 0.5)",
                      color: "#fff"
                    }}
                  >
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          </Col>
          
          <Col xs={24} lg={12}>
            {/* Experience Section */}
            <div 
              ref={experienceRef}
              style={{ 
                padding: "30px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                marginBottom: "30px",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className="section-title" style={{ marginBottom: "30px", position: "relative" }}>
                <div style={{ 
                  width: "5px", 
                  height: "25px", 
                  background: "#00f5d4", 
                  display: "inline-block",
                  marginRight: "15px",
                  verticalAlign: "middle"
                }}></div>
                <Title level={2} style={{ 
                  display: "inline-block", 
                  margin: "0",
                  color: "#fff",
                  verticalAlign: "middle" 
                }}>
                  EXPERIENCE
                </Title>
              </div>
              
              <div style={{ 
                padding: "20px", 
                borderLeft: "3px solid #00f5d4", 
                marginBottom: "25px",
                position: "relative",
                background: "rgba(0, 245, 212, 0.05)"
              }}>
                <div style={{ 
                  width: "15px", 
                  height: "15px", 
                  borderRadius: "50%", 
                  background: "#00f5d4",
                  position: "absolute",
                  left: "-9px",
                  top: "20px",
                  boxShadow: "0 0 10px rgba(0, 245, 212, 0.7)"
                }}></div>
                
                <Title level={4} style={{ margin: "0 0 5px", color: "#fff" }}>Information Technology (ThaiBev)</Title>
                <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>Thai Beverage Logistics | 15 June, 2023 - present</Text>
                <ul style={{ color: "#cfd8dc", marginTop: "15px", paddingLeft: "20px" }}>
                  <li>Develop a web application for solving internal problems. Using Next.js, SQL Server (Full Stack)</li>
                  <li>Project Management for business. (PO)</li>
                  <li>Data Warehouse Management System</li>
                  <li>IT Support / Helpdesk IT</li>
                </ul>
              </div>
              
              <div style={{ 
                padding: "20px", 
                borderLeft: "3px solid #673ab7", 
                position: "relative",
                background: "rgba(103, 58, 183, 0.05)"
              }}>
                <div style={{ 
                  width: "15px", 
                  height: "15px", 
                  borderRadius: "50%", 
                  background: "#673ab7",
                  position: "absolute",
                  left: "-9px",
                  top: "20px",
                  boxShadow: "0 0 10px rgba(103, 58, 183, 0.7)"
                }}></div>
                
                <Title level={4} style={{ margin: "0 0 5px", color: "#fff" }}>Full Stack Developer (Co-op)</Title>
                <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>Thai Beverage Logistics | 1 Aug, 2022 - 17 Oct, 2022 (6 month)</Text>
                <ul style={{ color: "#cfd8dc", marginTop: "15px", paddingLeft: "20px" }}>
                  <li>Training and learning about logistics processes.</li>
                  <li>Design database system by using SQL server.</li>
                  <li>Design User Interface by using Figma.</li>
                  <li>Develop web application for transportation planning by using JavaScript, python.</li>
                </ul>
              </div>
            </div>
            
            {/* Education Section */}
            <div 
              style={{ 
                padding: "30px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className="section-title" style={{ marginBottom: "30px", position: "relative" }}>
                <div style={{ 
                  width: "5px", 
                  height: "25px", 
                  background: "#00f5d4", 
                  display: "inline-block",
                  marginRight: "15px",
                  verticalAlign: "middle"
                }}></div>
                <Title level={2} style={{ 
                  display: "inline-block", 
                  margin: "0",
                  color: "#fff",
                  verticalAlign: "middle" 
                }}>
                  EDUCATION
                </Title>
              </div>
              
              <div style={{ 
                padding: "20px", 
                borderLeft: "3px solid #00f5d4", 
                position: "relative",
                background: "rgba(0, 245, 212, 0.05)"
              }}>
                <div style={{ 
                  width: "15px", 
                  height: "15px", 
                  borderRadius: "50%", 
                  background: "#00f5d4",
                  position: "absolute",
                  left: "-9px",
                  top: "20px",
                  boxShadow: "0 0 10px rgba(0, 245, 212, 0.7)"
                }}></div>
                
                <Title level={4} style={{ margin: "0 0 5px", color: "#fff" }}>Bachelor of Computer Engineering</Title>
                <Text style={{ color: "rgba(255, 255, 255, 0.7)", display: "block", marginBottom: "10px" }}>Khon Kaen University | 2019-2023</Text>
                <Text style={{ color: "#00f5d4", fontWeight: "bold" }}>GPA 3.30</Text>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Projects Section */}
       {/* Projects Section */}
<div 
  ref={projectsRef}
  style={{ 
    padding: "30px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    marginTop: "40px",
    marginBottom: "40px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)"
  }}
>
  <div className="section-title" style={{ marginBottom: "30px", position: "relative" }}>
    <div style={{ 
      width: "5px", 
      height: "25px", 
      background: "#673ab7", 
      display: "inline-block",
      marginRight: "15px",
      verticalAlign: "middle"
    }}></div>
    <Title level={2} style={{ 
      display: "inline-block", 
      margin: "0",
      color: "#fff",
      verticalAlign: "middle" 
    }}>
      PROJECTS
    </Title>
  </div>
  
  <Row gutter={[20, 20]}>
    {[
      {
        title: "Document Tracking Web Application",
        year: "2024",
        color: "#00f5d4",
        description: [
          "Developed a web application for tracking all documents used in transportation.",
          "Designed and implemented the user interface to provide a seamless document tracking experience.",
          "Using Next.js, Node.js, SQL Server"
        ]
      },
      {
        title: "Smart Eyes (PO)",
        year: "2024",
        color: "#00f5d4",
        description: [
          "To collect and analyze requirements from users, employing Agile methodology.",
          "Experienced in project management, adept at coordinating with external development teams and other stakeholders."
        ]
      },
      {
        title: "Truck Monitoring Web Application",
        year: "2023",
        color: "#32b4ff",
        description: [
          "Developed a web application for monitoring trucks using geofencing and GPS tracking technologies.",
          "Integrated geofencing and GPS tracking APIs into the application, ensuring real-time tracking of trucks.",
          "Using Next.js, Node.js, SQL Server, python"
        ]
      },
      {
        title: "Hotel Reservations Prediction",
        year: "2023",
        color: "#32b4ff",
        description: [
          "Exploratory Data Analysis Hotel Reservations.",
          "Create a classification model to predict whether a customer will cancel a reservation.",
          "Using python, Numpy, Pandas, scikit-learn"
        ]
      },
      {
        title: "ITES Web Application",
        year: "2022",
        color: "#673ab7",
        description: [
          "Develop web application for planning freight.",
          "Has been commissioned to develop UI and design database.",
          "Using HTML, CSS, python, JavaScript, React, Django, SQL Server, Bootstrap."
        ]
      },
      {
        title: "CLUB19 Web Application",
        year: "2021",
        color: "#b967ff",
        description: [
          "Develop web API get information about COVID-19, Vaccinations in the world and Thailand.",
          "Make responsive website.",
          "Using HTML, CSS, JavaScript, Bootstrap, Firebase."
        ],
        link: "https://club19-web.firebaseapp.com"
      }
    ].map((project, index) => (
      <Col xs={24} md={12} lg={8} key={index}>
        <div 
          className="project-card"
          style={{ 
            padding: "20px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(5px)",
            borderRadius: "15px",
            height: "100%",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            border: `1px solid rgba(${project.color.replace('#', '')}, 0.3)`,
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ 
            position: "absolute", 
            top: "0", 
            right: "0", 
            width: "80px", 
            height: "80px",
            background: `linear-gradient(135deg, ${project.color} 0%, transparent 100%)`,
            opacity: "0.2",
            borderRadius: "0 0 0 80px"
          }}></div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <Title level={4} style={{ margin: "0", color: "#fff" }}>{project.title}</Title>
            <Tag style={{ 
              background: project.color,
              color: "#fff",
              border: "none",
              padding: "2px 10px"
            }}>
              {project.year}
            </Tag>
          </div>
          
          <ul style={{ paddingLeft: "20px", color: "#cfd8dc", minHeight: "120px" }}>
            {project.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
          
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: project.color,
                textDecoration: "none",
                display: "inline-block",
                marginTop: "10px",
                fontWeight: "500"
              }}
              className="link-hover"
            >
              {project.link}
            </a>
          )}
        </div>
      </Col>
    ))}
  </Row>
</div>
    </div>
    
    {/* CSS Styles */}
    <style jsx global>{`
      .glow-button {
        transition: all 0.3s ease;
      }
      
      .glow-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 20px rgba(0, 245, 212, 0.4);
      }
      
      .outline-button {
        transition: all 0.3s ease;
        overflow: hidden;
        position: relative;
      }
      
      .outline-button:hover {
        color: #fff;
        border-color: #00f5d4;
        background: rgba(0, 245, 212, 0.1);
      }
      
      .link-hover {
        transition: all 0.3s ease;
        position: relative;
      }
      
      .link-hover:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -2px;
        left: 0;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }
      
      .link-hover:hover:after {
        transform: scaleX(1);
        transform-origin: left;
      }
      
      .link-hover:hover {
        text-shadow: 0 0 8px currentColor;
      }
      
      .project-card {
        transition: all 0.3s ease;
      }
      
      .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      }
      
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      .profile-image-container:before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border-radius: 50%;
        border: 3px solid transparent;
        background: linear-gradient(145deg, #00f5d4, #673ab7) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        animation: rotate 10s linear infinite;
      }
    `}</style>
  </div>
);
}