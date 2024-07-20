import OpenAI from 'openai';
import { useState, useEffect } from 'react';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function getData(userMessage) {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: `el usuario te pedira lugares turisticos, debes responder con lugares turisticos de ese lugar, pero en formato json, con este formato, no respondas de otra manera: {
        "key": "Nombre del lugar",
        "type": "El tipo del lugar. Catgorias: Turístico, Comida, Desayunos y meriendas, Alojamiento, Tecnología, Compras, Otros",
        "description": "Una descripción con un texto devuelto por 
        el chat-bot explicando por qué el lugar fué incluido en la lista",
        "address": "Dirección del lugar"
        "location": { "lat": xx.xxxxx. Debe ser un valor numérico, "lng": xx.xxxxx. Debe ser un valor numérico }
    },` },
        { role: 'user', content: userMessage }
      ],
      model: 'gpt-4-turbo',
    });

    return chatCompletion.choices[0].message.content
}

export default function Chatbot () {
    const [message, setMessage] = useState()
    const [responseMessage, setResponseMessage] = useState()


    const handleSend = async () => {
        const response = await getData(message)
        setResponseMessage(response)
    }


    return (
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

    )
}