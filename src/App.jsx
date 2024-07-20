import OpenAI from "openai";
import { useState } from "react";
import { Home } from "./pages/Home.jsx";
import { message } from "antd";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getData(userMessage) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `el usuario te pedira lugares turisticos, debes responder con lugares turisticos de ese lugar, pero en formato json, con este formato, no respondas de otra manera: {
            "key": "Nombre del lugar",
            "type": "El tipo del lugar. Categorias: Turístico, Comida, Desayunos y meriendas, Alojamiento, Tecnología, Compras, Otros",
            "description": "Una descripción con un texto devuelto por el chat-bot explicando por qué el lugar fué incluido en la lista",
            "address": "Dirección del lugar",
            "location": { "lat": xx.xxxxx, "lng": xx.xxxxx }
          }, RESPONDEME SI O SI EN ARRAY`,
        },
        { role: "user", content: userMessage },
      ],
      model: "gpt-4-turbo",
    });

    const responseContent = chatCompletion.choices[0].message.content;

    try {
      const jsonResponse = JSON.parse(responseContent);
      if (!Array.isArray(jsonResponse)) {
        message.error("Hubo un error, intenta de nuevo");
        throw new Error("La respuesta no es un array");
      }
      return jsonResponse;
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      message.error("Hubo un error, intenta de nuevo");
      return { error: "Invalid JSON response from API" };
    }
  } catch (apiError) {
    console.error("Error calling OpenAI API:", apiError);
    message.error("Hubo un error, intenta de nuevo");
    return { error: "Error calling OpenAI API" };
  }
}

const App = () => {
  const [places, setPlaces] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [actualMessage, setActualMessage] = useState("");

  const handleSend = async () => {
    setLoading(true);
    const response = await getData(actualMessage); // Usar actualMessage directamente
    setActualMessage("");
    setLoading(false);
    setResponseMessage(response);

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
      message={actualMessage} // Pasar actualMessage a Home
      loading={loading}
      handleSend={handleSend}
      responseMessage={responseMessage}
      setActualMessage={setActualMessage}
      actualMessage={actualMessage}
    />
  );
};

export default App;
