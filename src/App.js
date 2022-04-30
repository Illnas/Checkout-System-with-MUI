import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import CartItems from "./components/CartItems";
import data from "./data";





function App() {
  const [boughtItems, setBoughtItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [switchStateOne, setSwitchStateOne] = useState(false);
  const [switchStateTwo, setSwitchStateTwo] = useState(false);
  const [rng, setRng] = useState();
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const [twenty, setTwenty] = useState(false);

  const rippleRef = useRef(null);
  const containerRef = useRef(null);

  
  const onAdd = (product) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();


    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }

    rippleRef.current.start(
      {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      },
      { center: false }, // when center is true, the ripple doesn't travel to the border of the container
    );

    setTimeout(() => rippleRef.current.stop({}), 320);
  };



  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      rippleRef.current.start(
        {
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
        },
        { center: false }, // when center is true, the ripple doesn't travel to the border of the container
      );
  
      setTimeout(() => rippleRef.current.stop({}), 320);
    }

    

  };

  return (
    <Routes>
      
      <Route
        path="/"
        element={
          <>
            <Main
              setCartItems={setCartItems}
              cartItems={cartItems}
              products={products}
              onAdd={onAdd}
            />
          
            <Navbar
              setCartItems={setCartItems}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              switchStateOne={switchStateOne}
              setSwitchStateOne={setSwitchStateOne}
              switchStateTwo={switchStateTwo}
              setSwitchStateTwo={setSwitchStateTwo}
              setRng={setRng}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              twenty={twenty}
              setTwenty={setTwenty}
              rippleRef={rippleRef}
              containerRef={containerRef}
            />
          </>
        }
      />
      <Route
        path="orders"
        element={
          <>
            <Navbar
              cartItems={cartItems}
              setCartItems={setCartItems}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              switchStateOne={switchStateOne}
              setSwitchStateOne={setSwitchStateOne}
              switchStateTwo={switchStateTwo}
              setSwitchStateTwo={setSwitchStateTwo}
              setRng={setRng}
              twenty={twenty}
              setTwenty={setTwenty}
            />

             
            <CartItems boughtItems={boughtItems} />
          </>
        }
      />

      <Route
        path="checkout"
        element={
          <Checkout
            cartItems={cartItems}
            totalPrice={totalPrice}
            switchStateTwo={switchStateTwo}
            switchStateOne={switchStateOne}
            setBoughtItems={setBoughtItems}
            setCartItems={setCartItems}
            rng={rng}
            twenty={twenty}
          />
        }
      />
    </Routes>
  );
}

export default App;
