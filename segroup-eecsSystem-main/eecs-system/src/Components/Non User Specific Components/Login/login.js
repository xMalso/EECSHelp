import React from "react";
import "./login.css";

// react hook -> History - holds information about the previous page you are in.
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import currentUserManager from "./../../../Managers/CurrentUserManager";
import userRegistry from "./../../../Managers/UserRegistry";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleUsernameInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const validateUser = async (username, password) => {
    const user = userRegistry.findUserByUsername(username);
    console.log(userRegistry.findUserByUsername(username));
    if (!user === false) {
      if (user.password === password) {
        navigateUser(user);
      } else {
        if (password === "") {
          setError("Fill in all fields.");
        } else {
          setError("Incorrect Password.");
        }
        setShowErrorPopup(true);
        return error;
      }
    }
    if ((username === "") | (password === "")) {
      setError("Fill in all fields.");
    } else {
      setError(`User ${username} does not exist.`);
    }
    setShowErrorPopup(true);
    return error;
  };

  const navigateUser = async (user) => {
    console.log(user);
    await currentUserManager.setUser(user);
    console.log("Current User id:", currentUserManager.getCurrent().id);
    await navigate(`${user.userType}/home`);
  };

  const handleSubmit = async (e) => {
    const error = await validateUser(username, password);
    await console.log(error);
  };

  return (
    <div className="background-login">
      <div className="grid-login-container">
        <form action="" id="login">
          <div className="login-form">
            <h1>EECSHelp</h1>
            <div className="input-box">
              <h2>Username</h2>
              <input
                className="input-box"
                type="text"
                value={username}
                onChange={handleUsernameInputChange}
                placeholder=""
                required
              />
            </div>
            <div className="input-box">
              <h2>Password</h2>
              <input
                className="input-box"
                type="password"
                value={password}
                onChange={handlePasswordInputChange}
                placeholder=""
                required
              />
            </div>
            <button
              className="button"
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              Login
            </button>
          </div>
        </form>
        {showErrorPopup && (
          <div className="error-popup">
            <p>{error}</p>
            <button className="close" onClick={() => setShowErrorPopup(false)}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;