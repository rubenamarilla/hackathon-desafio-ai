import { Button } from "antd";
import MapComponent from "../components/Map";
import { UpOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Search from "antd/es/input/Search";

export const Home = ({
  places,
  message,
  setMessage,
  handleSend,
  responseMessage,
}) => {
  return (
    <div className="w-screen h-screen m-0 p-3 bg-slate-100">
    <MapComponent locations={places} />
    {/* <LocationList locations={responseMessage} /> */}
   
    <div className="w-screen h-screen m-0 p-3 bg-slate-100 flex justify-center items-center">
  <div className="flex items-center" style={{ width: "80%" }}>
    <textarea
      style={{ width: "100%", height: "50px" }}
      className="p-2 mb-2 bg-white text-black rounded-lg shadow-lg border border-gray-300"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Escribe tu mensaje aquí"
    />
    <Button
      shape="circle"
      icon={<UpOutlined />}
      onClick={handleSend}
      className="ml-2"
    ></Button>
  </div>
</div>

  </div>
  
  );
};

