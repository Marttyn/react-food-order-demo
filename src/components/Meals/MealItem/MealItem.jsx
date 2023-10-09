import React from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import classes from "./MealItem.module.css";

const MealItem = ({ id, name, description, price }) => {
  const cartCtx = React.useContext(CartContext);

  const priceString = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{priceString}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
