import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [err, setErr] = useState(false);
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
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div
      className="formContainer"
      style={{
        backgroundImage: `linear-gradient(${degree}deg, #89CFF0 10%, #fff 100%)`,
      }}
    >
      <div className="formWrapper">
        <span className="logo">Konvo App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>Sign In</button>
          {err && <span>Something went Wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
