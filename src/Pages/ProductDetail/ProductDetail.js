import React, { useState, useEffect } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from '../../Api/endPoint'; 
import ProductCard from '../../Componenets/Product/ProductCard'; 
import Loader from "../../Componenets/Loader/Loader";



const ProductDetail = () => {
   const [product, setproduct] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const {productId} = useParams()
   useEffect(()=> {
    setIsLoading(true)
   axios.get(`${ProductUrl}/products/${productId}`)
     .then((res) => {
       setproduct(res.data)
       setIsLoading(false)
     }).catch((err) => {
       console.log(err)
       setIsLoading(false);
     })

 },[])
 
        return (
          <LayOut>
            {isLoading ? (
              <Loader />
            ) : (
              <ProductCard
                product={product}
                flex={true}
                renderDesc={true}
                renderAdd={true}
              />
            )}
          </LayOut>
        );
}

export default ProductDetail;
