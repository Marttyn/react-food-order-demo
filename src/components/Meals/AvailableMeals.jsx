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

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
