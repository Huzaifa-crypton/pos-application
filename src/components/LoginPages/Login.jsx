import React, { useState, useEffect } from "react";
import "./Login.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { AlertTitle, Grid, Link } from "@mui/material";
import Alert from '@mui/material/Alert'
import ViewProducts from "../ViewProducts/ViewProducts";
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../states/actionCreators/actions"
import Navbar from "../NavBar/Navbar";
import { Routes, Route, useMatch } from 'react-router-dom';
import AddProduct from "../ViewProducts/ViewProducts";


const Login = () => {

  // Variables
  const [isLoginPage, setLoginPage] = useState(true);  // state for changing between login page and signup page

  //----------------------------------
  //Login + Signup form variables

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //-----------------------------------
  const dispatch = useDispatch();  // for dispatching an action for changing central state



  useEffect(() => {
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
  }, [isLoginPage]);



  async function fetchLoginData(email, password) {
    try {
      const req = await axios.get(`/users/${email}/${password}`);
      if (req.data.length !== 0) {
        dispatch(actions.loginUser(req.data[0]));
      }
      else {
        console.log("Not found")
        alert("Account not found.")
      }
    }
    catch (err) {
      console.log(err);
    }

  }
  const Login = () => {
    (email === "" || password === "")
      ? alert("Fill in the credentials")
      : fetchLoginData(email, password)
  };
  async function Signup() {
    if (name !== "" || phone !== "" || email !== "" || password !== "") {
      let user = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        admin: false
      };

      // dispatch(actions.addUser(user))
      await axios.post("/users", user);
      setLoginPage(true);
      alert("Account Succesfully Created");


    }
    else {

      alert("Fill in the details completely")
    }



  };


  // console.log(user);



  return (
    <div className="loginPanel">
      <h1>DevShop!👋</h1>
      <Grid
        container
        className="loginGrid"
        sx={{ p: 5 }}
        spacing={5}
        rowSpacing={{ xs: 2, sm: 5 }}
        columnSpacing={{ xs: 0, sm: 0, md: 5 }}
      >

        <Grid className="spacingItem" item xs md></Grid>
        <Grid className="imageItem" item xs={12} sm={12} md={4}>
          <img
            className="loginImage"
            src="https://source.unsplash.com/1600x900/?Shop"
            alt="LoginPicture"
            loading="lazy"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {isLoginPage === false ? (
            <>
              <TextField
                id="Name"
                value={name}
                label="Name"
                variant="standard"
                size="normal"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <TextField
                id="Phone"
                value={phone}
                label="Phone Number"
                variant="standard"
                size="normal"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <br />
              <TextField
                id="Email"
                value={email}
                label="Email"
                variant="standard"
                size="normal"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <TextField
                id="Password"
                value={password}
                label="Password"
                variant="standard"
                size="normal"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <Button
                variant="contained"
                className="login-btn"
                onClick={Signup}
              >
                Create Account
              </Button>
              <br />
              {/* <GoogleLogin
                    clientId={clientId}
                    buttonText="Signup with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  /> */}
              <br />
              <Typography>
                Already have an account?{" "}
                <Link
                  onClick={() => {
                    setLoginPage(true);
                  }}
                >
                  Login
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <TextField
                id="Email"
                value={email}
                label="Email"
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
                size="normal"
                required
              />
              <br />
              <TextField
                id="Password"
                value={password}
                label="Password"
                variant="standard"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                size="normal"
                required
              />
              <br />
              <Button variant="contained" className="login-btn" onClick={Login}>
                Login
              </Button>
              <br />
              {/* <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  /> */}
              <br />
              <Typography>
                Create account?{" "}
                <Link
                  onClick={() => {
                    setLoginPage(false);
                  }}
                >
                  Signup
                </Link>
              </Typography>
            </>
          )}
        </Grid>
        <Grid item xs md className="spacingGrid"></Grid>
      </Grid>
    </div>

  );

}
export default Login;
