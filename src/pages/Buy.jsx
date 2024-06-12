import React from "react";
import {
  LaptopOutlined,
  SearchOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu,Pagination,Button,Image } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../components/style/BuyStyle.css';
const { Header, Content, Sider } = Layout;

const items1 = ["Home", "Buy", "Sell"].map((label, index) => ({
  key: String(index + 1),
  label: label === "Home" ? <Link to={`/`}>{label}</Link> : <Link to={`/${label.toLowerCase()}`}>{label}</Link>,
}));
  [
    { key: "1", label: <Link to="/">Home</Link> },
    { key: "2", label: <Link to="/buy">Buy</Link> },
    { key: "3", label: <Link to="/sell">Sell</Link> }
     ]

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
      <Layout className="layout">
        <Header className="header"   >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            className="menu"
          />
        <Button type="primary"  icon={<SearchOutlined />} className="search-button">
        Search
      </Button>
        </Header>
        <Content className="content"  >
          
          <Layout className="inner-layout">
            <Sider width={200} className="sider" >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                className="sider-menu"
                items={items2}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
  {currentItems.map((item) => (
    <div key={item.id} style={{ display: "flex", marginBottom: "100px" }}>
      
      <div style={{ marginRight: "100px" }}>
      <h2 className="large-bold-heading">{item.name}</h2>
        
        <Image   
           src={item.image}
           alt={item.name}
           className="item-image"
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
                className="pagination"
              />
           </Content>
          </Layout>
        </Content>            
      </Layout>
    </>
  );
}
