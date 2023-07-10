import React, { useContext, useState } from "react";
import { BsCameraVideo, BsImage } from "react-icons/bs";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState("");
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                task,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else if (video) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, video);

      uploadTask.on(
        (error) => {
          // setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                task,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                video: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          task,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        task,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        task,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
    setVideo(null);
    setTask("");
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Enter the Message"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <input
        type="text"
        placeholder="Enter the Task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <div className="send">
        {/* <img src="" alt="" /> */}

        <input
          type="file"
          accept="video/mp4,video/x-m4v,video/*"
          style={{
            display: "none",
          }}
          id="videoFile"
          onChange={(e) => setVideo(e.target.files[0])}
          // value={img}
        />
        <label htmlFor="videoFile">
          {/* <img src="" alt="" /> */}
          <BsCameraVideo />
        </label>

        <input
          type="file"
          style={{
            display: "none",
          }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          // value={img}
        />
        <label htmlFor="file">
          {/* <img src="" alt="" /> */}
          <BsImage />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
