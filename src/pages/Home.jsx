import GroupCards from "../components/GroupCards";
import { Button } from "antd";
import MapComponent from "../components/Map";
import { Flex, Spin } from "antd";
import { UpOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Search from "antd/es/input/Search";

export const Home = ({
  places,
  message,
  setMessage,
  handleSend,
  responseMessage,
  loading,
}) => {
  return (
    <div className="w-screen h-screen m-0 p-3 bg-slate-500">
      <MapComponent locations={places} />
      {/* <LocationList locations={responseMessage} /> */}
      {loading ? (
        <div className="flex w-full justify-center my-5">
          <Spin size="large" />
        </div>
      ) : null}

      <div className="flex gap-2 items-center">
        <textarea
          className="w-full h-32 p-2 mb-2 bg-slate-400 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí"
        />
        <button
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
          onClick={handleSend}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

