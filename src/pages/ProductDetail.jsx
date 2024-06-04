import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();
  return <div>{params.id}</div>;
}
