import { useState } from "react";

import React from "react";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Avatar,
  List,
  Space,
  FloatButton,
  
} from "antd";
import { Link } from "react-router-dom";
import "../components/style/BuyStyle.css";

const { Header, Content } = Layout;
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const items = ["Home", "Buy", "Sell"].map((label, index) => ({
  key: String(index + 1),
  label:
    label === "Home" ? (
      <Link to={`/`}>{label}</Link>
    ) : (
      <Link to={`/${label.toLowerCase()}`}>{label}</Link>
    ),
}));
[
  { key: "1", label: <Link to="/">Home</Link> },
  { key: "2", label: <Link to="/buy">Buy</Link> },
  { key: "3", label: <Link to="/sell">Sell</Link> },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <FloatButton.Group
        open={open}
        trigger="click"
        style={{ right: 24 }}
        icon={open ? <CloseOutlined /> : <CustomerServiceOutlined />}
        onClick={handleClick}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>

      <Header className="layout-header">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[1]}
          items={items}
          className="menu"
        />
      </Header>
      <Content className="content">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
            <Link to="/">New</Link>
          </Breadcrumb.Item>
        </Breadcrumb>

        <div
          className="content-inner"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={data}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
              
            )}
            
          />
        </div>
        
      </Content>
    </Layout>
  );
}
