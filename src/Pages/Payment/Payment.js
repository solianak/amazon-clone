import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { DataContext } from "../../Componenets/DataProvider/DataProvider";
import ProductCard from "../../Componenets/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Componenets/CurrencyFormat/CurrencyForamt";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../Utility/fiirebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type"

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
 

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const [cardError, setcardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    // console.log(e);
    setcardError(e.error ? e.error.message : "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
      try {
        setProcessing(true);
        //1.backend||functions ---conatct the client secret

        const response = await axiosInstance({
          method: "POST",
          url: `payment/create?total=${total * 100}`,
        });
        // console.log(response.data);

        const clientSecret = response.data?.clientSecret;
        //2.client side (react side confirmation)
        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
    
        //3.after the confirmation--order firestore database save, clear basket
         const userDoc = doc(collection(db, "users"), user.uid);
         const orderDoc = doc(collection(userDoc, "orders"), paymentIntent.id);
         await setDoc(orderDoc, {
           basket: basket,
           amount: paymentIntent.amount,
           created: paymentIntent.created,
         });
          
    //  empty the basket
    dispatch({ type:Type.EMPTY_BASKET });
     setProcessing(false);
         navigate("/orders", { state: {msg: "you have placed new order" } });
      } catch (error) {
     console.error(error);
     setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment_header}>Checkout({totalItem}) items</div>
      {/* payment method */}

      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            {user ? (
              <>
                <div>{user?.email}</div>
                <div>2345 Sage Road</div>
                <div>Miami, FL</div>
              </>
            ) : (
              <div>Please log in to see your delivery address.</div>
            )}
          </div>
        </div>

        <hr />

        {/* Product Review */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
