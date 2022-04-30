import React from "react";
import Button from '@mui/material/Button';


const Product = (props) => {
  const { product, onAdd } = props;
  return (
    <div className="box-container">
      <h4>{product.name}</h4>
      <img className="small" src={product.image} alt={product.name} />
      <p>{product.p}</p>
      <div className="random-price">
        <p className="priceText">Price:</p>
        <p className="priceNumber">
          {product.price}
          {"\u20AC"}
        </p>
      </div>
      <div>
      <Button sx={{ border: "1px solid black", marginBottom: "10px", color: "black"}} onClick={() => onAdd(product)}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default Product;
