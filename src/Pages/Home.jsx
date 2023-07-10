import React, { useEffect, useState } from "react";
import Chat from "../Components/Chat";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();

      const sec = d.getSeconds();
      const ms = d.getMilliseconds();

      const sec_rotation = 6 * sec + 0.006 * ms;

      setDegree(sec_rotation);
    }, 10);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="home"
      style={{
        backgroundImage: `linear-gradient(${degree}deg, #f4959d8e 10%, #12485c8e 100%)`,
      }}
    >
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
