const Card = ({ nombre, tipo, direccion, descripcion }) => {
  console.log("llega a card", nombre, tipo, direccion, descripcion);
  return (
    <div style={{ minWidth: "250px" }} className="rounded shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{nombre}</div>
        <div className="font-bold text-sm mb-2">{tipo}</div>
        <p className="text-gray-700 text-base">{descripcion}</p>
        <p className="font-bold text-slate-700 text-sm">{direccion}</p>
      </div>
    </div>
  );
};

export default Card;
