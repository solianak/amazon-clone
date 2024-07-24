import React, { useState, useEffect } from "react";
import Classes from "./Results.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../Api/endPoint";
import ProductCard from "../../Componenets/Product/ProductCard";
import Loader from "../../Componenets/Loader/Loader"

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { CategoryName } = useParams();

  useEffect(() => {
    axios
      .get(`${ProductUrl}/products/category/${CategoryName}`)
      .then((res) => {
        setResults(res.data);
         setIsLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/ {CategoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={Classes.product_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Results;
