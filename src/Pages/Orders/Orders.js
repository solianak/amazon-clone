import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { db } from "../../Utility/fiirebase";
import { DataContext } from "../../Componenets/DataProvider/DataProvider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Componenets/Product/ProductCard";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersCollectionRef = collection(db, "users", user.uid, "orders");

      const q = query(ordersCollectionRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length==0 && <div style={{padding:"20px"}}> you don't have orders yet.</div>
          }

          {/* ordered items */}
          <div>
            {orders?.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
