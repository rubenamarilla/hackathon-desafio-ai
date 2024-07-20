import GroupCards from "../components/GroupCards";
import { Button, Card } from "antd";
import MapComponent from "../components/Map";
import { Flex, Spin } from "antd";
import { UpOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Search from "antd/es/input/Search";
import classes from './styleHome.module.css'

export const Home = ({
  places,
  message,
  setMessage,
  handleSend,
  responseMessage,
  loading,
}) => {

  return (
   <div className="flex justify-center items-center">
    <div className="w-4/5 h-[400px] justify-center m-0 p-3 bg-slate-100">
      <div>
        <Card className={classes.styleResponde}>{message}</Card>
      </div>
      <MapComponent locations={places} />
      {loading ? (
        <div className="flex w-full justify-center my-5">
          <Spin size="large" />
        </div>
      ) : null}

      <div className="flex items-center mt-5 justify-center" style={{ width: "100%" }}>
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

