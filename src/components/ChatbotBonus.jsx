// BonusChatbot.jsx
import OpenAI from 'openai';
import { useState } from 'react';
import lugares from '././../assets/lugares.json';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function getData(userMessage) {
    const lugaresContext = JSON.stringify(lugares);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `El usuario te pedirá lugares turísticos. Debes responder con lugares turísticos de esa lista en formato JSON. Lista de lugares: ${lugaresContext}`
        },
        { role: 'user', content: userMessage }
      ],
      model: 'gpt-4-turbo',
    });

    return chatCompletion.choices[0].message.content;
}

export default function BonusChatbot() {
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSend = async () => {
        const response = await getData(message);
        setResponseMessage(response);
    };

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
    );
}
