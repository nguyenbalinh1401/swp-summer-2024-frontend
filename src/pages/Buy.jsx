import React from "react";
import {
  LaptopOutlined,
  SearchOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme,Pagination,Button } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const { Header, Content, Sider } = Layout;

const items1 = ["Home", "Buy", "Sell"].map((label, index) => ({
  key: String(index + 1),
  label,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const itemsPerPage = 3;
export default function Buy() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/product");
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        <Button type="primary"  icon={<SearchOutlined />}>
        Search
      </Button>
        </Header>
        <Content
          style={{
            padding: "0 48px",
            flex: 1,
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/list">List</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/app">App</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider
              style={{
                background: colorBgContainer,
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                }}
                items={items2}
              />
            </Sider>
            <Content
  style={{
    padding: "0 24px",
    minHeight: 280,
  }}
>
  {currentItems.map((item) => (
    <div key={item.id} style={{ display: "flex", marginBottom: "100px" }}>
      
      <div style={{ marginRight: "100px" }}>
      <h2>{item.name}</h2>
        <img
          src={item.image}
          alt={item.name}
          style={{ Width: "700px", height: "700px" }}
        />

      </div>
      <div>
        <p><strong>Discription:</strong> {item.text}</p>
        <p><strong>Price:</strong> {item.price}</p>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>DialColor:</strong> {item.dialColor}</p>
        <p><strong>Box:</strong> {item.box.toString()}</p>
        <p><strong>Paper:</strong> {item.papers.toString()}</p>
        <p><strong>WaterResistance:</strong> {item.waterResistance}</p>
        <p><strong>CaseMaterial:</strong> {item.caseMaterial}</p>
        <p><strong>CaseSize:</strong> {item.caseSize} </p>
        <p><strong>PastUsageTime:</strong> {item.pastUsageTime}</p>
        <p><strong>YearOfProduction:</strong> {item.yearOfProduction}</p>
        <p><strong>RemainingInsurance:</strong> {item.remainingInsurance}</p>
        <p><strong>Status:</strong> {item.status}</p>
      </div>
    </div>
  ))}
  <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handleChangePage}
                style={{ textAlign: "center", marginTop: "20px" }}
              />
</Content>
          </Layout>
        </Content>            
      </Layout>
    </>
  );
}
