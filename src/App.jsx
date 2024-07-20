import OpenAI from "openai";
import { useState } from "react";
import { Home } from "./pages/Home.jsx";


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getData(userMessage) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: `el usuario te pedira lugares turisticos, debes responder con lugares turisticos de ese lugar, pero en formato json, con este formato, no respondas de otra manera: {
            "key": "Nombre del lugar",
            "type": "El tipo del lugar. Categoria: Turístico",
            "description": "Una descripción con un texto devuelto por el chat-bot explicando por qué el lugar fué incluido en la lista",
            "address": "Dirección del lugar",
            "location": { "lat": xx.xxxxx, "lng": xx.xxxxx }
          }, RESPONDEME SI O SI EN ARRAY` 
        },
        { role: 'user', content: userMessage }
      ],
      model: 'gpt-4-turbo',
      response_format: { "type": "json_object" },
    });

    const responseContent = chatCompletion.choices[0].message.content;
    
    try {
      const jsonResponse = JSON.parse(responseContent);
      if (!Array.isArray(jsonResponse)) {
        throw new Error('La respuesta no es un array');
      }
      return jsonResponse;
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      return { error: 'Invalid JSON response from API' };
    }

  } catch (apiError) {
    console.error('Error calling OpenAI API:', apiError);
    return { error: 'Error calling OpenAI API' };
  }
}


const App = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const response = await getData(message);
    setLoading(false);
    setResponseMessage(JSON.stringify(response, null, 2));

    const formattedPlaces = response.map((item, index) => ({
      key: index.toString(),
      location: item.location,
      title: item.key,
    }));

    setPlaces(formattedPlaces);
  };

  return (
    <Home
      places={places}
      message={message}
      loading={loading}
      setMessage={setMessage}
      handleSend={handleSend}
      responseMessage={responseMessage}
    />
  );
};

export default App;
