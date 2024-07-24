import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import LowerHeader from "./LowerHeader";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/fiirebase";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <>
      <section className={classes.fixed}>
        <section className={classes.header}>
          {/* Top nav */}
          <div className={`${classes.header__container} flex items-center`}>
            {/* Logo section */}
            <div className={classes.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                  className="cursor-pointer"
                  style={{ objectFit: "contain" }}
                />
              </Link>
              {/* Delivery section  */}

              <div className={classes.delivery}>
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>Deliver to </p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>
            {/* Search section */}

            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" placeholder="Search Amazon" />
              <BsSearch size={52} />
            </div>

            {/* Language and other section*/}
            <div className={classes.order_container}>
              <Link to="#" className={classes.language}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1024px-Flag_of_the_United_States.png"
                  alt="Flag"
                />
                <select name="language" id="language">
                  <option value="en">EN</option>
                </select>
              </Link>
              <Link to={!user && "/auth"}>
                <div>
                  {user ? (
                    <>
                      <p>Hello{user?.email?.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, Sign in</p>
                      <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </Link>
              <Link to="/orders">
                <p>Returns</p>
                <span> & Orders</span>
              </Link>
              <Link to="/cart" className={classes.cart}>
                <BiCart size={35} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;
