import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";
const Product = () => {
  const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")

      .then((res) => {
        setProductData(res.data);
         setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
         setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {productData?.map((singleProduct) => {
            return (
              <ProductCard
                renderAdd={true}
                product={singleProduct}
                key={singleProduct.id}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default Product;
