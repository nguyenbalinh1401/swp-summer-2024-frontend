import React, { useEffect, useState } from "react";
import ProductDetailComponent from "../components/productDetail/ProductDetailComponent";
import RelatedProductList from "../components/productDetail/RelatedProductList";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loading/Loading";
import MoreFromOwner from "../components/productDetail/MoreFromOwner";

export default function ProductDetail() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [moreOwnerProducts, setMoreOwnerProducts] = useState([]);
  const [isInWishList, setIsInWishList] = useState(false);

  const wishList = sessionStorage.wishList
    ? JSON.parse(sessionStorage.wishList)
    : [];

  const fetchProduct = async () => {
    await axios
      .get(`http://localhost:3000/product/withRelated/${id}`)
      .then(async (res) => {
        setProduct(res.data.product);
        const check = wishList.some((item) => item.id === res.data.product.id);
        setIsInWishList(check);
        setRelatedProducts(res.data.relatedProducts);

        await axios
          .get(
            `http://localhost:3000/product/user-available/${res.data.product.owner.id}`
          )
          .then((res) => {
            setMoreOwnerProducts(res.data.slice(0, 10));
          })
          .catch((err) => console.log(err));
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
        <ProductDetailComponent
          user={user}
          product={product}
          isInWishList={isInWishList}
        />
      </div>
      <MoreFromOwner list={moreOwnerProducts} owner={product.owner.username} />
      <RelatedProductList list={relatedProducts} />
    </div>
  );
}
