import React from "react";
import ProductCard from "./ProductCard";

export default function MoreFromOwner({ list, owner }) {
  return (
    <div className="w-full flex flex-col items-start gap-8 px-8">
      <h2 className="text-2xl font-semibold">
        More from <span className="font-bold text-sky-950">{owner}</span>
      </h2>
      <div className="max-w-[95vw] flex flex-row items-center justify-start gap-4 overflow-auto mx-auto">
        {list.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </div>
  );
}
