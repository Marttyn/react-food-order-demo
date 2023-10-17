import React from "react";
import PropTypes from "prop-types";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amoutIsValid, setAmoutIsValid] = React.useState(true);
  const amountInputRef = React.useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = +amountInputRef.current.value;

    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmoutIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amoutIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

MealItemForm.propTypes = {
  id: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default MealItemForm;
