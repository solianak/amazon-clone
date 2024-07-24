import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";

import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results"
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Auth from "./Pages/Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Componenets/ProtectedRoute/ProtectedRoute";


const stripePromise = loadStripe(
"pk_test_51Pf8o2Rv60N3XTvWpcgcKwxZtuTQlwpV3HQQM7EXdkXbwANFCJfqBjfJ4elXAdln7j9gQLVBV7ae8KLlY1feH8ty00TlDlwm5O"
);



const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders" element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/auth"}
              >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:CategoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default Routing;
