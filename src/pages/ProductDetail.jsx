
//gốc


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Card } from 'antd';
// import { Link } from 'react-router-dom';

// //khai bao cai card gridStyle
// const gridStyle = {
//   width: '25%',
//   textAlign: 'center',
// };
// const { Meta } = Card;//khai bao cai card

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/product/${id}`);
//         console.log(response);
//         setProduct(response.data);


//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchProductData();
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex">
//       <div className="w-full md:w-1/2">
//         <Card
//           hoverable
//           cover={<img src={product.image} alt={product.name} className="w-full h-60 object-cover" />}
//           className="w-full"
//         >
//           <Meta title={product.name} description={product.description} />
//           <p className="text-lg font-bold text-center">Price: {product.price}</p>
//           <Link
//             to={`/cart`}
//             className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4"
//           >
//             Add to Cart
//           </Link>
//           <p className="text-sm text-gray-500 text-center mt-2">Free Shipping</p>
//           <p className="text-sm text-gray-500 text-center">2-Year Warranty</p>
//         </Card>
//       </div>
//         <Card title="Specification">
//           <Card.Grid style={gridStyle}>Type: {product.type}</Card.Grid>
//           <Card.Grid hoverable={false} style={gridStyle}>Dial Color: {product.dialColor}</Card.Grid>
//           <Card.Grid style={gridStyle}>Box: {product.box ? 'Yes' : 'No'}</Card.Grid>
//           <Card.Grid style={gridStyle}>Papers: {product.papers ? 'Yes' : 'No'}</Card.Grid>
//           <Card.Grid style={gridStyle}>Case Size: {product.caseSize} mm</Card.Grid>
//           <Card.Grid style={gridStyle}>Past Usage Time: {product.pastUsageTime}</Card.Grid>
//           <Card.Grid style={gridStyle}>Water Resistance: {product.waterResistance} m</Card.Grid>
//           <Card.Grid style={gridStyle}>Case Material: {product.caseMaterial}</Card.Grid>
//           <Card.Grid style={gridStyle}>Year of Production: {product.yearOfProduction}</Card.Grid>
//           <Card.Grid style={gridStyle}>Remaining Insurance: {product.remainingInsurance} years</Card.Grid>
//           <Card.Grid style={gridStyle}>Status: {product.status}</Card.Grid>
//         </Card>

//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const { Meta } = Card;

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts);
      } catch (error) {
        console.error("have an error i'm sorry :((");
      }
    };
    fetchProductData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-1/2 mb-8">
        <Card
          hoverable
          cover={<img src={product.image} alt={product.name} className="w-full h-60 object-cover" />}
          className="w-full"
        >
          <Meta title={product.name} description={product.description} />
          <p className="text-lg font-bold text-center">Price: {product.price}</p>
          <Link
            to={`/cart`}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4"
          >
            Add to Cart
          </Link>
          <p className="text-sm text-gray-500 text-center mt-2">Free Shipping</p>
          <p className="text-sm text-gray-500 text-center">2-Year Warranty</p>
        </Card>
      </div>

      <Card title="Specification" className="w-full md:w-1/2 mb-8">
        <Card.Grid style={gridStyle}>Type: {product.type}</Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>Dial Color: {product.dialColor}</Card.Grid>
        <Card.Grid style={gridStyle}>Box: {product.box ? 'Yes' : 'No'}</Card.Grid>
        <Card.Grid style={gridStyle}>Papers: {product.papers ? 'Yes' : 'No'}</Card.Grid>
        <Card.Grid style={gridStyle}>Case Size: {product.caseSize} mm</Card.Grid>
        <Card.Grid style={gridStyle}>Past Usage Time: {product.pastUsageTime}</Card.Grid>
        <Card.Grid style={gridStyle}>Water Resistance: {product.waterResistance} m</Card.Grid>
        <Card.Grid style={gridStyle}>Case Material: {product.caseMaterial}</Card.Grid>
        <Card.Grid style={gridStyle}>Year of Production: {product.yearOfProduction}</Card.Grid>
        <Card.Grid style={gridStyle}>Remaining Insurance: {product.remainingInsurance} years</Card.Grid>
        <Card.Grid style={gridStyle}>Status: {product.status}</Card.Grid>
      </Card>

      <div className="mt-8 w-full">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <Card
              key={relatedProduct.id}
              hoverable
              cover={<img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-40 object-cover" />}
            >
              <Meta title={relatedProduct.name} description={`Price: ${relatedProduct.price}`} />
              <Link
                to={`/product/${relatedProduct.id}`}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4"
              >
                View Details
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
