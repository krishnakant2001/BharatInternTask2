import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            console.log(res);
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            // setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log("Error occurs");
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
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <label htmlFor="imgfile">
            <BiImageAdd className="AddImageLogo" />
            <span>Add Your Avatar</span>
          </label>
          <input style={{ display: "none" }} type="file" id="imgfile" />
          <button>Sign Up</button>
          {err && <span>Something went Wrong</span>}
        </form>
        <p>
          You do have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
