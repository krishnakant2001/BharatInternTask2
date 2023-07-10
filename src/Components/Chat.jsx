import React, { useContext } from "react";
// import { BsCameraVideoFill } from "react-icons/bs";
// import { BsPersonPlusFill } from "react-icons/bs";
// import { FiMoreHorizontal } from "react-icons/fi";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <img src={data.user?.photoURL} alt="" />
        &nbsp;
        &nbsp;
        <span>{data.user?.displayName}</span>
        
        {/* <div className="chatIcons">
          <BsCameraVideoFill />
          <BsPersonPlusFill />
          <FiMoreHorizontal />
        </div> */}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
