import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Message = ({ message }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // const date = new Date(message.date.nanoseconds);
  // console.log(date.getHours());
  // console.log(date.getMinutes());

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
        {message.video && (
          <video
            width="240"
            height="160"
            controls
            src={message.video}
            type="video/*"
          />
        )}
        {message.task && (
          <p>
            <span style={{ color: "Blue" }}>Task :</span> {message.task}
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
