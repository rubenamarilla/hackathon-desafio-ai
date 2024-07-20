import { useEffect, useState } from "react";
import Card from "./Card";
import classes from "./GroupCards.module.css";
import { Carousel } from "antd";

const GroupCards = ({ cards = [] }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(cards);

    console.log(cards);
  }, [cards]);

  return (
    <div className={classes.container}>
      {data.length > 0 &&
        data.map((card) => (
          <Card
            key={card.key}
            nombre={card.key}
            tipo={card.type}
            direccion={card.address}
            descripcion={card.description}
          />
        ))}
    </div>
  );
};

export default GroupCards;
