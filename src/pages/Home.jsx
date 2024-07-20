import MapComponent from "../components/Map";

export const Home = ({
  places,
  message,
  setMessage,
  handleSend,
  responseMessage,
}) => {
  return (
    <div className="w-screen h-screen m-0 p-3 bg-slate-500">
      <MapComponent locations={places} />
      {/* <LocationList locations={responseMessage} /> */}
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí"
        />
        <button onClick={handleSend}>Enviar</button>
        <textarea
          value={responseMessage}
          readOnly
          placeholder="Respuesta de la IA"
        />
      </div>
    </div>
  );
};
