import MapComponent from './components/Map.jsx';
import OpenAI from 'openai';
import { useState } from 'react';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function getData(userMessage) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { 
        role: 'system', 
        content: `el usuario te pedira lugares turisticos, debes responder con lugares turisticos de ese lugar, pero en formato json, con este formato, no respondas de otra manera: {
          "key": "Nombre del lugar",
          "type": "El tipo del lugar. Categorias: Turístico, Comida, Desayunos y meriendas, Alojamiento, Tecnología, Compras, Otros",
          "description": "Una descripción con un texto devuelto por el chat-bot explicando por qué el lugar fué incluido en la lista",
          "address": "Dirección del lugar",
          "location": { "lat": xx.xxxxx, "lng": xx.xxxxx }
        },` 
      },
      { role: 'user', content: userMessage }
    ],
    model: 'gpt-4-turbo',
  });

  return JSON.parse(chatCompletion.choices[0].message.content);
}

const App = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSend = async () => {
    const response = await getData(message);
    setResponseMessage(JSON.stringify(response, null, 2));

    const formattedPlaces = response.map((item, index) => ({
      key: index.toString(),
      location: item.location,
      title: item.key
    }));

    setPlaces(formattedPlaces);
  };

  return (
    <>
      <div className="w-screen h-screen m-0 p-3 bg-slate-500">
        <MapComponent locations={places} />
        <LocationList locations={responseMessage} />
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
    </>
  );
};

export default App;
