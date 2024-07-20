import Card from "./Card";

const GroupCards = (cards = []) => {
  console.log(cards);
  if (cards.length > 0 && typeof cards[0] === "object") {
    return cards.map((card) => (
      <Card
        key={card.key}
        nombre={card.title}
        tipo={card.type}
        direccion={card.address}
        descripcion={card.description}
      />
    ));
  }

  const data = [
    {
      nombre: "Casa de Juan",
      tipo: "Casa",
      direccion: "Calle 123",
      descripcion: "Casa de Juan",
    },
    {
      nombre: "Casa de Pedro",
      tipo: "Casa",
      direccion: "Calle 456",
      descripcion: "Casa de Pedro",
    },
  ];

  //   return (
  //     <>
  //       {cards.map((card) => (
  //         <Card
  //           key={card.nombre}
  //           nombre={card.nombre}
  //           tipo={card.tipo}
  //           direccion={card.direccion}
  //           descripcion={card.descripcion}
  //         />
  //       ))}
  //     </>
  //   );
};

export default GroupCards;
