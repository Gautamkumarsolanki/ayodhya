import React, { useState, useContext } from "react";
import "./SignIn.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

export default function SignIn() {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }
    // Sending data to server
    fetch("http://localhost:2000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };

  return (
    // <div className="signIn">
    //   <div>
    //     <div className="loginForm">
    //       <img className="signUpLogo" src={logo} alt="" />
    //       <div>
    //         <input
    //           type="email"
    //           name="email"
    //           id="email"
    //           value={email}
    //           placeholder="Email"
    //           onChange={(e) => {
    //             setEmail(e.target.value);
    //           }}
    //         />
    //       </div>
    //       <div>
    //         <input
    //           type="password"
    //           name="password"
    //           id="password"
    //           placeholder="Password"
    //           value={password}
    //           onChange={(e) => {
    //             setPassword(e.target.value);
    //           }}
    //         />
    //       </div>
    //       <input
    //         type="submit"
    //         id="login-btn"
    //         onClick={() => {
    //           postData();
    //         }}
    //         value="Sign In"
    //       />
    //     </div>
    //     <div className="loginForm2">
    //       Don't have an account ?
    //       <Link to="/signup">
    //         <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <>
      <div class="container flex">
        <div class="facebook-page flex"></div>
        <div class="text">
          <h1 className="singh1">Socialify</h1>
          <p className="signp">
            Connect with friends and the world around you on Socialify.
          </p>
        </div>
        <div>
          <div className="formsection">
            <input
              className="inputsingin"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="inputsingin"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div class="link">
              <input
                type="submit"
                className="inputsingin"
                style={{ backgroundColor: "#0d65d9" }}
                id="login-btn"
                onClick={() => {
                  postData();
                }}
                value="Sign In"
              />
              <a href="#" class="forgot">
                Forgot password?
              </a>
            </div>
          </div>
          <hr />
          <div className="loginForm2">
            Don't have an account ?
            <Link to="/signup">
              <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
