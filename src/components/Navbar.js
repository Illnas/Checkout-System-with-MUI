import React, { useState, useEffect, useRef } from "react";
import {
  MemoryRouter,
  Link,
  matchPath,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { Tab, Tabs, Box, Container } from "@mui/material";
import { StaticRouter } from "react-router-dom/server";

//Tabs Logic

function Router(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

//Component

const Navbar = ({
  cartItems,
  totalPrice,
  setTotalPrice,
  switchStateOne,
  setSwitchStateOne,
  switchStateTwo,
  setSwitchStateTwo,
  setRng,
  onAdd,
  onRemove,
  twenty,
  setTwenty,
  containerRef,
  rippleRef,
}) => {
  const [originalPrice, setOriginalPrice] = useState();
  const [disabledCheckout, setDisabledCheckout] = useState(false);
  const textRef = useRef();
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const callingIt = () => {
      setTotalPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
      setOriginalPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
      setTwenty(false);
      setSwitchStateOne(false);
      setSwitchStateTwo(false);
      if (cartItems.length !== 0) {
        setDisabledCheckout(true);
      }
      cartItems.forEach((e) => {
        if (e.name === "Smoke Sensor") {
          if (e.qty % 2 === 0) {
            let evaulated = originalPrice - (e.qty / 2) * 5;
            setTotalPrice(evaulated);
          }

          if (e.qty > 2 && (e.qty % 2 === 0) === false) {
            let saved =
              cartItems.reduce((a, c) => a + c.qty * c.price, 0) -
              Math.ceil(e.qty / 2) * 5;
            setTotalPrice(saved);
          }
        }
      });

      cartItems.forEach((e) => {
        if (e.name === "Outdoor Motion Sensor") {
          if (e.qty % 3 === 0) {
            let evaulated = originalPrice - (e.qty / 3) * 10;
            setTotalPrice(evaulated);
          }

          if (e.qty > 3 && (e.qty % 3 === 0) === false) {
            let saved =
              cartItems.reduce((a, c) => a + c.qty * c.price, 0) -
              Math.ceil(e.qty / 3) * 10;
            setTotalPrice(saved);
          }
        }
      });

      const sum = cartItems.map(e => e.qty).reduce((partialSum, a) => partialSum + a, 0);
      setQuantity(sum)
    };
    callingIt();
  }, [
    cartItems,
    setTotalPrice,
    setSwitchStateOne,
    setSwitchStateTwo,
    originalPrice,
    totalPrice,
    setTwenty,
  ]);

  const checkoutWindow = () => {
    setRng(Math.floor(Math.random() * 9999));
  };

  const addPromo = (e) => {
    if (
      textRef.current.value !== "20%OFF" &&
      textRef.current.value !== "5%OFF" &&
      textRef.current.value !== "20EUROOFF"
    ) {
      setError(true);
    }

    if (
      textRef.current.value === "20%OFF" &&
      switchStateOne === false &&
      switchStateTwo === false
    ) {
      setTwenty(true);
      setError(false);
    }

    if (
      textRef.current.value === "20%OFF" &&
      switchStateOne === true &&
      switchStateTwo === false
    ) {
      setError(true);
    }

    if (
      textRef.current.value === "20%OFF" &&
      switchStateOne === false &&
      switchStateTwo === true
    ) {
      setError(true);
    }

    if (
      textRef.current.value === "20%OFF" &&
      switchStateOne === true &&
      switchStateTwo === true
    ) {
      setError(true);
    }

    if (
      textRef.current.value === "5%OFF" &&
      switchStateOne === false &&
      switchStateTwo === false &&
      twenty === false
    ) {
      setSwitchStateOne(true);
      setError(false);
    }

    if (
      textRef.current.value === "5%OFF" &&
      switchStateOne === false &&
      switchStateTwo === true &&
      twenty === false
    ) {
      setSwitchStateOne(true);
      setError(false);
    }

    if (
      textRef.current.value === "5%OFF" &&
      switchStateOne === true &&
      switchStateTwo === false &&
      twenty === false
    ) {
      setError(true);
    }

    if (
      textRef.current.value === "5%OFF" &&
      switchStateOne === false &&
      switchStateTwo === false &&
      twenty === true
    ) {
      setError(true);
    }

    if (
      textRef.current.value === "20EUROOFF" &&
      switchStateOne === true &&
      switchStateTwo === false &&
      twenty === false
    ) {
      setSwitchStateTwo(true);
      setError(false);
    }

    if (
      textRef.current.value === "20EUROOFF" &&
      switchStateOne === false &&
      switchStateTwo === false &&
      twenty === false
    ) {
      setSwitchStateTwo(true);
      setError(false);
    }

    if (
      textRef.current.value === "20EUROOFF" &&
      switchStateOne === false &&
      switchStateTwo === true &&
      twenty === false
    ) {
      setError(true);
    }

    if (
      textRef.current.value === "20EUROOFF" &&
      switchStateOne === false &&
      switchStateTwo === false &&
      twenty === true
    ) {
      setError(true);
    }

    textRef.current.value = null;
  };

  const removingPromotions = (e) => {
    if (e.target.value === "20%OFF") {
      setTwenty(false);
    }

    if (
      e.target.value === "5%OFF" &&
      switchStateOne === true &&
      switchStateTwo === false
    ) {
      setSwitchStateOne(false);
    }

    if (
      e.target.value === "5%OFF" &&
      switchStateOne === true &&
      switchStateTwo === true
    ) {
      setSwitchStateOne(false);
    }

    if (
      e.target.value === "20EUROOFF" &&
      switchStateOne === false &&
      switchStateTwo === true
    ) {
      setSwitchStateTwo(false);
    }

    if (
      e.target.value === "20EUROOFF" &&
      switchStateOne === true &&
      switchStateTwo === true
    ) {
      setSwitchStateTwo(false);
    }
  };

  const calculatingPromoPrices = () => {
    let prices = totalPrice;
    let discountedFive = prices * 0.05;
    if (switchStateOne === true && switchStateTwo === false) {
      return (
        <p>
          {Math.ceil(prices - discountedFive)}
          {"\u20AC"}
        </p>
      );
    }

    if (switchStateOne === true && switchStateTwo === true) {
      return (
        <p>
          {Math.ceil(prices - discountedFive - 20)}
          {"\u20AC"}
        </p>
      );
    }

    if (switchStateOne === false && switchStateTwo === true) {
      return (
        <p>
          {Math.ceil(prices - 20)}
          {"\u20AC"}
        </p>
      );
    }

    if (twenty === true) {
      return (
        <p>
          {Math.ceil(prices - prices * 0.2)}
          {"\u20AC"}
        </p>
      );
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  // MUI Popover logic
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const routeMatch = useRouteMatch(["/", "/orders"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Container
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "70px",
        backgroundColor: "rgb(255, 255, 255)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      maxWidth="xl"
    >
      <Box
        sx={{
          paddingLeft: "100px",
        }}
      >
        <Tabs value={currentTab}>
          <Tab label="Home" value="/" to="/" component={Link} />
          <Tab label="Orders" value="/orders" to="/orders" component={Link} />
        </Tabs>
      </Box>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        ref={containerRef}
        sx={{
          backgroundColor: "white",
          width: "60px",
          height: "50px",
          border: "1px solid grey",
          position: "relative",
          marginRight: "100px",
        }}
      >
        <TouchRipple ref={rippleRef} center />
        <ShoppingCartOutlinedIcon />
        <p id="numberOfItems">{quantity}</p>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="cart-container">
          <div className="header">
            <h2>Item Cart</h2>
          </div>
          <div className="cart">
            <div className="item-container">
              {cartItems.length === 0 && (
                <div className="empty">
                  {" "}
                  <h4>Cart is empty!</h4>{" "}
                </div>
              )}
              {cartItems.map((item) => (
                <div key={item.id} className="item">
                  <h6>{item.name}</h6>
                  <div className="buttons">
                    <button onClick={() => onRemove(item)} className="remove">
                      -
                    </button>{" "}
                    <button onClick={() => onAdd(item)} className="add">
                      +
                    </button>
                  </div>
                  <div className="prices">
                    {item.qty} x {item.price.toFixed(2)}
                    {"\u20AC"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="promo-codes">
            {twenty === true && (
              <div className="promo">
                <div>20%OFF</div>
                <button value={"20%OFF"} onClick={(e) => removingPromotions(e)}>
                  X
                </button>
              </div>
            )}

            {switchStateOne === true && (
              <div className="promo">
                <div>5%OFF</div>

                <button value={"5%OFF"} onClick={(e) => removingPromotions(e)}>
                  X
                </button>
              </div>
            )}

            {switchStateTwo === true && (
              <div className="promo">
                <div>20EUROOFF</div>

                <button
                  value={"20EUROOFF"}
                  onClick={(e) => removingPromotions(e)}
                >
                  X
                </button>
              </div>
            )}

            <div className="errors">
              {error && (
                <div className="errors">
                  Code entered is wrong! Or entered in wrong combination!
                </div>
              )}
            </div>

            <div className="inputs">
              <input type="text" ref={textRef} />
              <button onClick={(e) => addPromo(e)}>Add Promo</button>
            </div>
          </div>
          <div className="total-price">
            <h4>Total Price:</h4>
            {switchStateOne === false &&
              switchStateTwo === false &&
              twenty === false && (
                <p>
                  {Math.ceil(totalPrice)}
                  {"\u20AC"}
                </p>
              )}
            {calculatingPromoPrices()}
          </div>
          <Link
            to={disabledCheckout ? "/checkout" : "#"}
            id="checkout"
            onClick={() => checkoutWindow()}
          >
            Checkout
          </Link>
        </div>
      </Popover>
    </Container>

    /*     </header> */
  );
};

export default Navbar;
