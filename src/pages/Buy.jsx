// import React from "react";
// import {
//   LaptopOutlined,
//   SearchOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu,Pagination,Button,Image } from "antd";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import '../components/style/BuyStyle.css';
// const { Header, Content, Sider } = Layout;

// const items1 = ["Home", "Buy", "Sell"].map((label, index) => ({
//   key: String(index + 1),
//   label: label === "Home" ? <Link to={`/`}>{label}</Link> : <Link to={`/${label.toLowerCase()}`}>{label}</Link>,
// }));
//   [
//     { key: "1", label: <Link to="/">Home</Link> },
//     { key: "2", label: <Link to="/buy">Buy</Link> },
//     { key: "3", label: <Link to="/sell">Sell</Link> }
//      ]

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);
//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,
//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   }
// );
// const itemsPerPage = 3;
// export default function Buy() {
  
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1); 
  
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/product/buy");
//         console.log(res.data);
//         setData(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getData();
//   }, []);
//   const totalItems = data.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };
//   return (
//     <>
//       <Layout className="layout">
//         <Header className="header"   >
//           <div className="demo-logo" />
//           <Menu
//             theme="dark"
//             mode="horizontal"
//             defaultSelectedKeys={["2"]}
//             items={items1}
//             className="menu"
//           />
//         <Button type="primary"  icon={<SearchOutlined />} className="search-button">
//         Search
//       </Button>
//         </Header>
//         <Content className="content"  >
          
//           <Layout className="inner-layout">
//             <Sider width={200} className="sider" >
//               <Menu
//                 mode="inline"
//                 defaultSelectedKeys={["1"]}
//                 defaultOpenKeys={["sub1"]}
//                 className="sider-menu"
//                 items={items2}
//               />
//             </Sider>
//             <Content style={{ padding: "0 24px", minHeight: 280 }}>
//   {currentItems.map((item) => (
//     <div key={item.id} style={{ display: "flex", marginBottom: "100px" }}>
      
//       <div style={{ marginRight: "100px" }}>
//       <h2 className="large-bold-heading">{item.name}</h2>
        
//         <Image   
//            src={item.image}
//            alt={item.name}
//            className="item-image"
//         />

//       </div>
//       <div>
//         <p><strong>Discription:</strong> {item.text}</p>
//         <p><strong>Price:</strong> {item.price}</p>
//         <p><strong>Type:</strong> {item.type}</p>
//         <p><strong>DialColor:</strong> {item.dialColor}</p>
//         <p><strong>Box:</strong> {item.box.toString()}</p>
//         <p><strong>Paper:</strong> {item.papers.toString()}</p>
//         <p><strong>WaterResistance:</strong> {item.waterResistance}</p>
//         <p><strong>CaseMaterial:</strong> {item.caseMaterial}</p>
//         <p><strong>CaseSize:</strong> {item.caseSize} </p>
//         <p><strong>PastUsageTime:</strong> {item.pastUsageTime}</p>
//         <p><strong>YearOfProduction:</strong> {item.yearOfProduction}</p>
//         <p><strong>RemainingInsurance:</strong> {item.remainingInsurance}</p>
//         <p><strong>Status:</strong> {item.status}</p>
//       </div>
//     </div>
//   ))}
//               <Pagination
//                 current={currentPage}
//                 total={totalItems}
//                 pageSize={itemsPerPage}
//                 onChange={handleChangePage}
//                 className="pagination"
//               />
//            </Content>
//           </Layout>
//         </Content>            
//       </Layout>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Input, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

export default function Buy() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDialColor, setFilterDialColor] = useState('');

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product/buy');
        const products = response.data.products;  // Ensure this matches your response structure
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Failed to fetch products data', error);
      }
    };
    fetchProductsData();
  }, []);

  useEffect(() => {
    let result = products;
    
    // Filter by search term if it's not empty
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type if filterType is selected
    if (filterType) {
      result = result.filter(product => product.type === filterType);
    }

    // Filter by dial color if filterDialColor is selected
    if (filterDialColor) {
      result = result.filter(product => product.dialColor === filterDialColor);
    }

    setFilteredProducts(result);
  }, [searchTerm, filterType, filterDialColor, products]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-1/2 mb-8 my-auto">
        <Search
          placeholder="Search products"
          enterButton
          onSearch={value => setSearchTerm(value)}
          className="mb-4"
          allowClear
        />
        <Select
          placeholder="Filter by Type"
          onChange={value => setFilterType(value)}
          allowClear
          className="mb-4 w-full"
        >
          <Option value="Quazt">Quazt</Option>
          <Option value="Automatic">Automatic</Option>
          <Option value="Solar">Solar</Option>
        </Select>
        <Select
          placeholder="Filter by Dial Color"
          onChange={value => setFilterDialColor(value)}
          allowClear
          className="mb-4 w-full"
        >
          <Option value="Green">Green</Option>
          <Option value="Blue">Blue</Option>
          <Option value="Black">Black</Option>
          <Option value="Gold/Silver">Gold/Silver</Option>
          <Option value="Silver/Gold">Silver/Gold</Option>
          <Option value="Gry">Gry</Option>
          <Option value="Mltclr">Mltclr</Option>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Card
              key={product.id}
              hoverable
              cover={<img src={product.image} alt={product.name} className="w-full h-40 object-cover" />}
            >
              <Meta title={product.name} description={`Price: ${product.price}`} />
              <Link
                to={`/product/${product.id}`}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4"
              >
                View Details
              </Link>
            </Card>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
//done
