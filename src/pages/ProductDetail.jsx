
//TRANG NÀY RENDER DANH SÁCH CÁC PRODUCT 

//style 1
// product detail 
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Button, Descriptions } from 'antd';
// import { Link } from 'react-router-dom';

// const { Meta } = Card;

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [showMore, setShowMore] = useState(false);
//   const [visibleProducts, setVisibleProducts] = useState(8);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/product/${id}`);
//         setProduct(response.data.product);
//         setRelatedProducts(response.data.relatedProducts);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };
//     fetchProductData();
//   }, [id]);

//   const loadMore = () => {
//     setVisibleProducts(visibleProducts + 8);
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex flex-wrap w-full md:w-3/4 mb-8">
//         <div className="w-full md:w-2/5 mb-8 pr-4">
//           <Card
//             hoverable
//             cover={<img src={product.image} alt={product.name} className="w-full h-60 object-cover" />}
//             className="w-full"
//           >
//             <Meta title={product.name} description={product.description} />
//             <p className="text-lg font-bold text-center">Price: {product.price}</p>
//             <Link
//               to={`/cart`}
//               className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4"
//             >
//               Add to Cart
//             </Link>
//             <p className="text-sm text-gray-500 text-center mt-2">Free Shipping</p>
//             <p className="text-sm text-gray-500 text-center">2-Year Warranty</p>
//           </Card>
//         </div>
//         <div className="w-full md:w-3/5 mb-8 pl-4">
//           <Card title="Specification" className="w-full">
//             <Descriptions column={1}>
//               <Descriptions.Item label="Type">{product.type}</Descriptions.Item>
//               <Descriptions.Item label="Dial Color">{product.dialColor}</Descriptions.Item>
//               <Descriptions.Item label="Box">{product.box ? 'Yes' : 'No'}</Descriptions.Item>
//               <Descriptions.Item label="Papers">{product.papers ? 'Yes' : 'No'}</Descriptions.Item>
//               <Descriptions.Item label="Case Size">{product.caseSize} mm</Descriptions.Item>
//               <Descriptions.Item label="Past Usage Time">{product.pastUsageTime}</Descriptions.Item>
//               <Descriptions.Item label="Water Resistance">{product.waterResistance} m</Descriptions.Item>
//               <Descriptions.Item label="Case Material">{product.caseMaterial}</Descriptions.Item>
//               <Descriptions.Item label="Year of Production">{product.yearOfProduction}</Descriptions.Item>
//               <Descriptions.Item label="Remaining Insurance">{product.remainingInsurance} years</Descriptions.Item>
//               <Descriptions.Item label="Status">{product.status}</Descriptions.Item>
//             </Descriptions>
//           </Card>
//         </div>
//       </div>

//       <div className="mt-8 w-full md:w-3/4">
//         <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Related Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//           {relatedProducts.slice(0, visibleProducts).map((relatedProduct) => (
//             <Card
//               key={relatedProduct.id}
//               hoverable
//               cover={<img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-40 object-cover" />}
//             >
//               <Meta title={relatedProduct.name} description={`Price: ${relatedProduct.price}`} />
//               <Link
//                 to={`/product/${relatedProduct.id}`}
//                 className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4"
//               >
//                 View Details
//               </Link>
//             </Card>
//           ))}
//         </div>
//         {relatedProducts.length > visibleProducts && (
//           <div className="text-center mt-4">
//             <Button type="primary" onClick={loadMore}>Hiển thị thêm sản phẩm</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//style 2
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, message } from "antd";
import { Link } from "react-router-dom";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const { Meta } = Card;

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/withRelated/${id}`
        );
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [id]);

  const loadMore = () => {
    setVisibleProducts(visibleProducts + 8);
  };

  const handleAddToCart = () => {
    const cartSession = sessionStorage.cartList;
    if (cartSession) {
      const cart = JSON.parse(cartSession);
      const findInCart = cart.find((item) => item.id === id);
      if (findInCart) {
        messageApi.open({
          key: "addToCart",
          type: "info",
          content: (
            <p className="inline">
              This item has already been in your cart.{" "}
              <span
                className="underline text-sky-600 cursor-pointer hover:text-sky-800"
                onClick={() => window.location.replace("/cart")}
              >
                Check it out!
              </span>
            </p>
          ),
        });
      } else {
        cart.push(product);
        sessionStorage.setItem("cartList", JSON.stringify(cart));
        messageApi.open({
          key: "addToCart",
          type: "success",
          content: (
            <p className="inline">
              Added to cart.{" "}
              <span
                className="underline text-sky-600 cursor-pointer hover:text-sky-800"
                onClick={() => window.location.replace("/cart")}
              >
                Check it out!
              </span>
            </p>
          ),
        });
      }
    } else {
      sessionStorage.setItem("cartList", JSON.stringify([product]));
      messageApi.open({
        key: "addToCart",
        type: "success",
        content: (
          <p className="inline">
            Added to cart.{" "}
            <span
              className="underline text-sky-600 cursor-pointer hover:text-sky-800"
              onClick={() => window.location.replace("/cart")}
            >
              Check it out!
            </span>
          </p>
        ),
      });
    }
  };
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {contextHolder}
      <div className="flex flex-wrap w-full md:w-3/4 mb-8">
        <div className="w-full md:w-2/5 mb-8 pr-4">
          <Card
            hoverable
            cover={
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover"
              />
            }
            className="w-full"
          >
            <Meta title={product.name} description={product.description} />
            <p className="text-lg font-bold text-center">
              Price: {product.price}
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4 hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <p className="text-sm text-gray-500 text-center mt-2">
              Free Shipping
            </p>
            <p className="text-sm text-gray-500 text-center">2-Year Warranty</p>
          </Card>
        </div>
        <div className="w-full md:w-3/5 mb-8 pl-4">
          <Card title="Specification" className="w-full">
            <Card.Grid style={gridStyle}>Type: {product.type}</Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              Dial Color: {product.dialColor}
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              Box: {product.box ? "Yes" : "No"}
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              Papers: {product.papers ? "Yes" : "No"}
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              Case Size: {product.caseSize} mm
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              Past Usage Time: {product.pastUsageTime}
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              Water Resistance: {product.waterResistance} m
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              Case Material: {product.caseMaterial}
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              Year of Production: {product.yearOfProduction}
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              Remaining Insurance: {product.remainingInsurance} years
            </Card.Grid>
            <Card.Grid style={gridStyle}>Status: {product.status}</Card.Grid>
          </Card>
        </div>
      </div>

      <div className="mt-8 w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.slice(0, visibleProducts).map((relatedProduct) => (
            <Card
              key={relatedProduct.id}
              hoverable
              cover={
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-40 object-cover"
                />
              }
            >
              <Meta
                title={relatedProduct.name}
                description={`Price: ${relatedProduct.price}`}
              />
              <Link
                to={`/product/${relatedProduct.id}`}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4"
              >
                View Details
              </Link>
            </Card>
          ))}
        </div>
        {relatedProducts.length > visibleProducts && (
          <div className="text-center mt-4">
            <Button type="primary" onClick={loadMore}>
              Hiển thị thêm sản phẩm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
