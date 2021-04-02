import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from 'react';
import { Button, Form, Image } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import googleImage from '../../images/icons/Group 573.png';
import Header from '../Header/Header';
import firebaseConfig from './firebase.config';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
//const fbProvider = new firebase.auth.FacebookAuthProvider();
const Login = () => {
    const [loginUser, setLoginUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
      isSignedIn: "false",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      success: "",
    });
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const inputStyle = {
        width: "350px",
      };
      const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === "email") {
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password" || "confirmPassword") {
          const isPasswordValid = e.target.value.length > 6;
          const hasNumber = /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && hasNumber;
          console.log("password", isFieldValid);
        }
        if (e.target.name === "name") {
          // const newUserName = e.target.value;
          // console.log(newUserName)
          isFieldValid = e.target.value;
        }
        if (isFieldValid) {
          const newUserInfo = { ...user };
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
      };
      const handleSubmit = (e) => {
        //newUser &&
        if (newUser && user.email && user.password && user.confirmPassword) {
          if (user.confirmPassword === user.password) {
            console.log("con", user.confirmPassword);
            console.log("pass", user.password);
            firebase
              .auth()
              .createUserWithEmailAndPassword(user.email, user.password)
              .then((res) => {
                const newUserInfo = { ...user };
                newUserInfo.error = "";
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
                const loginUser = {
                  email: user.email,
                };
                setLoginUser(loginUser);
                history.replace(from);
              })
              .catch((err) => {
                console.log(err.message);
                const newUserInfo = { ...user };
                newUserInfo.error = err.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
              });
          }
        }
    
        if (!newUser && user.email && user.password) {
          firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((res) => {
              // Signed in
              const newUserInfo = { ...user };
              newUserInfo.error = "";
              newUserInfo.success = true;
              setUser(newUserInfo);
            })
            .catch((err) => {
              const newUserInfo = { ...user };
              newUserInfo.error = err.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
        }
        e.preventDefault();
      };
      const handleGoogleSignIn = () => {
        firebase
          .auth()
          .signInWithPopup(googleProvider)
          .then((result) => {
            const {  email } = result.user;
            const signInUser = {
              isSignedIn: true,
              email,
            };
            setUser(signInUser);
            setLoginUser(signInUser);
            history.replace(from);
            //console.log(result.user);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      };
  
      const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
    
        user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            // Update successful.
            console.log("user name updated successfully");
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
          });
      };
    return (
        <div>
        <Header/>
        <h6 className="text-center pt-4" style={{ color: "red" }}>
        {user.error}
      </h6>
      {user.success && (
        <h6 className="text-center pt-4" style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged in"} Successfully!!{" "}
          <ThumbUpIcon fontSize={"small"} htmlColor={"green"} />{" "}
        </h6>
      )}
      <div className="container d-flex justify-content-center align-items-center">
        <Form className="border mt-4 p-5">
          <h5 className="mb-4 font-weight-bold">
            {newUser ? "Create an account" : "Login"}
          </h5>
          {newUser && (
            <div>
              <input
                style={inputStyle}
                className="mb-4"
                type="text"
                name="name"
                onBlur={handleBlur}
                placeholder="Name"
                required
              />
            </div>
          )}
          <div>
            <input
              style={inputStyle}
              className="mb-4"
              type="text"
              name="email"
              onBlur={handleBlur}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              style={inputStyle}
              className="mb-4"
              type="password"
              name="password"
              onBlur={handleBlur}
              placeholder="Password"
              required
            />
          </div>
          {newUser && (
            <div>
              <input
                style={inputStyle}
                className="mb-4"
                type="password"
                name="confirmPassword"
                onBlur={handleBlur}
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
          {newUser ? (
            ""
          ) : (
            <div>
              <input type="checkbox" name="rememberMe" id="" />
              <label className="ml-2" htmlFor="rememberMe">
                Remember Me
              </label>
              <Link style={{ color: "#8A2BE2" }} className="ml-5 pl-5">
                Forgot Password
              </Link>
            </div>
          )}
          <br />

          {newUser ? (
            <Link to={`/home`}>
              <input
                onClick={handleSubmit}
                className="p-2"
                style={{
                  backgroundColor: "#8A2BE2",
                  border: "none",
                  width: "350px",
                  color: "white",
                }}
                type="submit"
                value="Create an account"
              />
            </Link>
          ) : (
            <input
              onClick={handleSubmit}
              className="p-2"
              style={{
                backgroundColor: "#8A2BE2",
                border: "none",
                width: "350px",
                color: "white",
              }}
              type="submit"
              value="Login"
            />
          )}

          {newUser === false && (
            <div className="d-flex justify-content-center">
              <p>Don't have an account?</p>
              <Link
                to={`/login`}
                style={{ color: "#8A2BE2" }}
                onClick={() => setNewUser(true)}
              >
                Create an account
              </Link>
            </div>
          )}
          {newUser && (
            <div className="d-flex justify-content-center">
              <p>Already have an account?</p>
              <Link
                to={`/login`}
                onClick={() => {
                  history.go(0);
                }}
                style={{ color: "#8A2BE2" }}
              >
                Login
              </Link>
            </div>
          )}
        </Form>
      </div>
      <div className="container d-flex flex-column justify-content-center align-items-center pt-2">
      
        <Button
          onClick={handleGoogleSignIn}
          style={inputStyle}
          className="d-block mb-3 bg-white text-dark rounded-pill border"
        >
          <Image src={googleImage} width={18} className="mr-4" />
          Continue with Google
        </Button>
        </div>
        </div>
    );
};

export default Login;