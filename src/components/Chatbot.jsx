import OpenAI from 'openai';
import { useState, useEffect } from 'react';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function main() {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Hola' }],
      model: 'gpt-4-turbo',
    });

    return chatCompletion.choices[0].message.content
}

export default function Chatbot () {
    const [message, setMessage] = useState()

    useEffect(() => {
        main()
    },[])



    return (
        <div>
            <textarea></textarea>
        </div>
    )
}