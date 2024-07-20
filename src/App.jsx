import { useState } from 'react'
import MapComponent from './components/Map.jsx'
import Chatbot from './components/Chatbot.jsx';

const App = () => {
  let [places, setPlaces] = useState([]);

  return (
    <>
      <div className="w-screen h-screen m-0 p-3 bg-slate-500">
        <MapComponent locations={places}/>
        <Chatbot />
      </div>
    </>
  );
};

export default App;