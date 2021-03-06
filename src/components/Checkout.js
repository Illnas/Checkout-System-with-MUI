import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Checkout = ({
  cartItems,
  totalPrice,
  switchStateOne,
  switchStateTwo,
  setBoughtItems,
  setCartItems,
  rng,
  twenty,
}) => {
  let navigate = useNavigate();

  async function boughtItems(event) {
    event.preventDefault();
    const oldObject = {
      name: cartItems.map((e) => e.name),
      price: totalPrice,
      qty: cartItems.map((e) => e.qty),
      id: rng,
      states: [switchStateOne, switchStateTwo, twenty],
    };

    setBoughtItems((oldArray) => [...oldArray, oldObject]);
    setCartItems([]);
    navigate("/");
  }

  const promotionList = () => {
    if (twenty) {
      return (
        <div className="promo-container">
          <div className="promo">
            <h5>20%OFF</h5>
            <p>20% of the first item</p>
          </div>
        </div>
      );
    }

    if (switchStateOne === true && switchStateTwo === false) {
      return (
        <div className="promo">
          <h5>5%OFF</h5>
          <p>5% of the total price</p>
        </div>
      );
    }

    if (switchStateTwo === true && switchStateOne === false) {
      return (
        <div className="promo">
          <h5>20EUROOFF</h5>
          <p>20 Euros of the total price</p>
        </div>
      );
    }

    if (switchStateOne === true && switchStateTwo === true) {
      return (
        <div className="promo-container">
          <div className="promo">
            <h5>20EUROOFF</h5>
            <p>20 Euros of the total price</p>
          </div>

          <div className="promo">
            <h5>5%OFF</h5>
            <p>5% of the total price</p>
          </div>
        </div>
      );
    }
  };


  /* Mui Date Picker Functions */
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <div className="cartItems">
          <h2>Order ID: {rng}</h2>
          <div className="items-displayed">
            {cartItems.map((e) => {
              return (
                <div className="item" key={cartItems.indexOf(e)}>
                  <h6>{e.name}</h6>
                  <p className="price">
                    {e.qty} x {e.price}
                    {"\u20AC"}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="promotions">
            <h4>Applied Promotions</h4>
            {promotionList()}
          </div>
        </div>

        <form action="#" onSubmit={boughtItems}>
          <h2>Payment Details</h2>
          <div className="form-data">
            <label htmlFor="name">Name:</label>
            <input type="text" />
          </div>

          <div className="form-data">
            <label htmlFor="surname">Surname:</label>
            <input type="text" />
          </div>

          <div className="form-data">
            <label htmlFor="email">Email:</label>
            <input type="email" required />
          </div>

          <div className="form-data">
            <label htmlFor="country">Country:</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <div className="form-data">
              <label htmlFor="City">City:</label>
              <input type="text" required />
            </div>
            <div className="form-data">
              <label htmlFor="City">Street:</label>
              <input type="text" required />
            </div>
          </div>
          <h4>Credit Card Details</h4>
          <div className="form-data">
            <label htmlFor="ccn">Credit Card Number:</label>
            <input
              id="ccn"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              autoComplete="cc-number"
              maxLength="19"
              placeholder="xxxx xxxx xxxx xxxx"
              required
            />
          </div>

          <div className=" last-group">

            <LocalizationProvider dateAdapter={AdapterDateFns} className="form-data mui-datepicker">
              <Stack spacing={3}  >
                <DesktopDatePicker
                  label="Expiration Date"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField {...params} />
                  )}
                />
              </Stack>
            </LocalizationProvider>

            <div className="form-data">
              <label htmlFor="ccv">CCV:</label>
              <input maxLength="4" type="tel" required />
            </div>
          </div>

          <h3>
            Total Price:
            {twenty === true &&
              Math.ceil(totalPrice - totalPrice * 0.2) + "\u20AC"}
            {switchStateOne === true &&
              switchStateTwo === false &&
              Math.ceil(totalPrice - totalPrice * 0.05) + "\u20AC"}
            {switchStateOne === false &&
              switchStateTwo === true &&
              Math.ceil(totalPrice - 20) + "\u20AC"}
            {switchStateOne === true &&
              switchStateTwo === true &&
              Math.ceil(totalPrice - 20 - totalPrice * 0.05) + "\u20AC"}
            {twenty === false &&
              switchStateOne === false &&
              switchStateTwo === false &&
              Math.ceil(totalPrice).toFixed(2) + "\u20AC"}
          </h3>
          <button type="submit">Buy</button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
