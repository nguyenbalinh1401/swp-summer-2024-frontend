import { useState, useEffect } from "react";
import React from "react";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Layout,
  theme,
  FloatButton,
  Row,
  Col,
  Card,
  Typography,
  Carousel,
} from "antd";
import { Link } from "react-router-dom";
import "../components/style/Home.css";

const { Content, Sider } = Layout;

const { Title, Text } = Typography;

const images = [
  "https://images.samsung.com/vn/galaxy-watch6/feature/galaxy-watch6-banner-watch6-classic-mo.jpg",
  "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-ultimate-la/video/huawei-watch-ultimate-16-structure-water-resistant-design-xs.jpg",
  "https://www.watches.com/cdn/shop/files/california-watch-co-lifestyle-2021.09-10_6a0b9a63-9e74-4db4-af49-e24dcdfb04ec_1800x.jpg",
  "https://www.telegraph.co.uk/content/dam/fashion/2022/11/11/TELEMMGLPICT000263705496_trans_NvBQzQNjv4BqwMJYxftKZExwjop9hyNEmQEwTyzLMKRxDe4NUIzb66I.jpeg",
];

const brands = [
  {
    name: "Samsung",
    image: "https://images.samsung.com/is/image/samsung/assets/vn/galaxy-watches/kv/kv_category_kv.jpg",
    description: "Innovative and stylish watches.",
  },
  {
    name: "Huawei",
    image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-gt-3-pro/design/imgs/huawei-watch-gt-3-pro-4g-1.png",
    description: "High-performance smartwatches.",
  },
  {
    name: "California Watch Co",
    image: "https://www.watches.com/cdn/shop/products/California-Watch-Co-Lifestyle-5_1200x1200.jpg",
    description: "Classic and timeless designs.",
  },
  {
    name: "Rolex",
    image: "https://content.rolex.com/dam/2022/upright-bba-with-shadow/m126610lv-0002.png?impolicy=v6-upright&imwidth=420",
    description: "Luxury and precision timepieces.",
  },
  {
    name: "Omega",
    image: "https://www.omegawatches.com/media/catalog/product/cache/8/image/400x/040ec09b1e35df139433887a97daa66f/2/1/21032422001001.png",
    description: "Elegant and accurate watches.",
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/product/latest")
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

  return (
    <Layout>
      <Sider zeroWidthTriggerStyle className="siderStyle">
        Sider
      </Sider>
      <FloatButton.Group
        open={open}
        trigger="click"
        className="floatbutton"
        icon={open ? <CloseOutlined /> : <CustomerServiceOutlined />}
        onClick={handleClick}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <Content className="content">
        <div
          className="content-inner"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Carousel autoplay fade arrows className="carousel">
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`carousel-${index}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <Title level={2} className="title">
          New
        </Title>

        <Row gutter={[8, 8]}>
          {products.map((product) => (
            <Col key={product.id} span={6}>
              <Link to={`/product/${product.id}`}>
                <Card
                  hoverable
                  cover={<img alt={product.name} src={product.image} />}
                >
                  <Card.Meta
                    title={product.name}
                    description={product.description}
                  />
                  <Text style={{ marginTop: 16 }}>Price: {product.price}</Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <Title level={2} className="title">
          About some brand
        </Title>
        <Row gutter={[16, 16]}>
          {brands.map((brand, index) => (
            <Col key={index} span={6}>
              <Card
                hoverable
                cover={<img alt={brand.name} src={brand.image} />}
              >
                <Card.Meta
                  title={brand.name}
                  description={brand.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
}
