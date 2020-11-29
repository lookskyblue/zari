import { authService } from "fbase";
import React, { useState } from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const history = useHistory();
    const [error, setError] = useState("");
    const onChange = (event) => {
      const {
        target: { name, value },
      } = event;
      if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        
      }
    };
    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        let data;
        if (email) {
          data = await authService.sendPasswordResetEmail(
            email
          );
         
        } 
      } catch (error) {
        setError(error.message);
      }
      alert("전송되었습니다. 이메일을 확인해주세요");
      history.push("/");
    }
    return (
        <div className="loginForm">
          <img src={logo} className="ZARI" />
          <h2>Password Reset</h2>
          <form>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
            />
            
    
          </form>
          <div className="option">
          <button onClick={onSubmit}>Send</button>
          <Link to="/">Login</Link>
          </div>
        </div>
      );
    };
    
    export default ForgotPassword;