import React from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import useHttp from "../../hooks/use-http";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  const [meals, setMeals] = React.useState([]);

  React.useEffect(() => {
    const transformMeals = (data) => {
      const loadedMeals = [];

      for (const mealKey in data) {
        loadedMeals.push({
          id: mealKey,
          name: data[mealKey].name,
          description: data[mealKey].description,
          price: data[mealKey].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://react-http-1fadb-default-rtdb.firebaseio.com/meals.json",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformMeals
    );
  }, []);

  const mealsList = meals.map((meal) => <MealItem key={meal.id} {...meal} />);

  let content = <p style={{ textAlign: "center" }}>Found no meals!</p>;

  if (isLoading) {
    content = <p className={classes.mealsLoading}>Loading...</p>;
  }

  if (error) {
    content = <p className={classes.mealsError}>{error}</p>;
  }

  if (mealsList.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
