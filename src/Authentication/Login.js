import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import * as Yup from "yup";
const Login = () => {
  const [state, dispatch] = useContext(LoginContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      email: form[0].value,
      password: form[1].value,
    };
    if (user.email && user.password) {
      try {
        const res = await fetch("http://localhost:4000/users/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        if (data.message !== "success") {
          setErrorMessage(data.message);
          // Swal.fire(e.response.data.message, "", "error");
        } else {
          localStorage.setItem("token", data.token);
          let userData = {
            isLoggedIn: true,
            user: undefined,
            token: data.token,
          };
          dispatch({
            type: "Login",
            user: userData,
          });
          navigate("/");
        }
      } catch (err) {
        setErrorMessage(err);
      }
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().required("User Email field is required !"),
            password: Yup.string().required("Password field is required !"),
          })}
        >
          <Form
            onSubmit={(e) => handleLogin(e)}
            //   ref={form}
          >
            <div className="form-group">
              <label htmlFor="username">email</label>
              <Field
                type="email"
                className="form-control"
                name="email"
                // value={username}
                // onChange={onChangeUsername}
                // validations={[required]}
              />
              <span>
                <ErrorMessage name="email" />
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                className="form-control"
                name="password"
                // value={password}
                // onChange={onChangePassword}
                // validations={[required]}
              />
              <span>
                <ErrorMessage name="password" />
              </span>
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                //   disabled={loading}
              >
                {/* {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )} */}
                <span>Login</span>
              </button>
              {errorMessage}
            </div>

            {/* {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )} */}
            {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
