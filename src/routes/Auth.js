import { authService } from "fbase";
import React, { useState } from "react";
import "./Auth.css";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);  //로그인부터시작
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email, password
        );
        //회원생성
      } else {
        data = await authService.signInWithEmailAndPassword(
          email, password
        );//로그인
      }
    } catch (error) {
      setError(error.message);
    }

  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  


  return (
    <div className="loginForm">
      <img src={logo} className="ZARI" />
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />

        {error}
      </form>
      <div className="option">
        <button onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</button>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Auth;