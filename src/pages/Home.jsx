import { useState, useEffect } from "react";
import React from "react";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Layout,
  theme,
  FloatButton,
  Input,
  Pagination,
  Row,
  Col,
  Card,
  Typography,
  Carousel,
} from "antd";
import { Link } from "react-router-dom";
import "../components/style/Home.css";

const { Content } = Layout;

const { Title, Text } = Typography;


const images = [
  "https://images.samsung.com/vn/galaxy-watch6/feature/galaxy-watch6-banner-watch6-classic-mo.jpg",
  "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-ultimate-la/video/huawei-watch-ultimate-16-structure-water-resistant-design-xs.jpg",
  "https://www.watches.com/cdn/shop/files/california-watch-co-lifestyle-2021.09-10_6a0b9a63-9e74-4db4-af49-e24dcdfb04ec_1800x.jpg",
  "https://www.telegraph.co.uk/content/dam/fashion/2022/11/11/TELEMMGLPICT000263705496_trans_NvBQzQNjv4BqwMJYxftKZExwjop9hyNEmQEwTyzLMKRxDe4NUIzb66I.jpeg",
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSearch = (value) => {
    console.log(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalProducts = products.length;
  const pageSize = 8;
  const totalPages = Math.ceil(totalProducts / pageSize);

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

      

      <Content className="content" style={{ paddingTop: 64 }}>
        <div
          className="content-inner"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: "24px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <Carousel autoplay fade arrows style={{ width: "100%" }}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`carousel-${index}`}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <Title level={2} style={{ marginTop: 48 }}>
            New
          </Title>

          <Row gutter={[8,8]}>
            {products.map((product) => (
              <Col key={product.id} span={6}>
                <Link to={'/HomePage/${product.id}'}>
                  <Card
                    hoverable
                    cover={<img alt={product.name} src={product.image} />}
                  >
                    <Card.Meta
                      title={product.name}
                      description={product.description}
                    />
                    <Text style={{ marginTop: 16 }}>
                      Price: {product.price}
                    </Text>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "24px" }}
          />
        </div>
      </Content>
    </Layout>
  );
}
