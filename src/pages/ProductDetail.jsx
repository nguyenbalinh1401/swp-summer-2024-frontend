import React, { useEffect, useState } from "react";
import ProductDetailComponent from "../components/productDetail/ProductDetailComponent";
import RelatedProductList from "../components/productDetail/RelatedProductList";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loading/Loading";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProduct = async () => {
    await axios
      .get(`http://localhost:3000/product/withRelated/${id}`)
      .then((res) => {
        console.log("Product: ", res.data.product);
        setProduct(res.data.product);
        setRelatedProducts(res.data.relatedProducts);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return !product ? (
    <Loading />
  ) : (
    <div className="w-full min-h-[70vh] flex flex-col items-center gap-16 py-8">
      <div className="w-2/3">
        <ProductDetailComponent product={product} />
      </div>
      <RelatedProductList list={relatedProducts} />
    </div>
  );
}
