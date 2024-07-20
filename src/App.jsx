import OpenAI from "openai";
import { useState } from "react";
import { Home } from "./pages/Home.jsx";
import { message } from "antd";
import lugares from '../src/assets/lugares.json';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getData(userMessage) {
  const lugaresContext = JSON.stringify(lugares);
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `El usuario te pedirá lugares turísticos. Debes responder con lugares turísticos de esa lista en formato JSON. Lista de lugares: ${lugaresContext}, ten en cuenta, que siempre debes responder con un array de posibles respuestas`
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
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [actualMessage, setActualMessage] = useState("");

  const handleSend = async () => {
    setMessage(actualMessage);
    setLoading(true);
    setActualMessage("");
    const response = await getData(message);
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
      message={message}
      loading={loading}
      setMessage={setMessage}
      handleSend={handleSend}
      responseMessage={responseMessage}
      setActualMessage={setActualMessage}
      actualMessage={actualMessage}
    />
  );
};

export default App;
