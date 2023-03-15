import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
const Login = () => {
  const [state, dispatch] = useContext(LoginContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //  const handleLogin=(e) =>{
  //     e.preventDefault();

  //     const form = e.target;
  //     const user = {
  //       email: form[0].value,
  //       password: form[1].value,
  //     };
  //     // if (user.email && user.password) {
  //     try {
  //       AuthService.login(user).then((res) => {
  //         const data = res.data;
  //         if (data.message !== "success") {
  //           setErrorMessage(data.message);
  //           // Swal.fire(e.response.data.message, "", "error");
  //         } else {
  //           localStorage.setItem("token", data.token);
  //           let userData = {
  //             isLoggedIn: true,
  //             user: undefined,
  //             token: data.token,
  //           };
  //           dispatch({
  //             type: "Login",
  //             user: userData,
  //           });
  //           navigate("/");
  //         }
  //       });
  //     } catch (err) {
  //       setErrorMessage(err);
  //     }
  //     // }
  //   }

  return (
    <div className="col-md-12">
      <div className="card card-container login1">
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
          onSubmit={async(values, { setSubmitting }) => {
            const user = {
              email: values.email,
              password: values.password,
            };
            try {
              AuthService.login(user).then((res) => {
                const data = res.data;
                if (data.message !== "success") {
                  setErrorMessage(data.message);
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
              });
            } catch (err) {
              setErrorMessage(err);
            }
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">email</label>
              <Field type="email" className="form-control" name="email" />
              <span>
                <ErrorMessage name="email" />
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" className="form-control" name="password" />
              <span>
                <ErrorMessage name="password" />
              </span>
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">
                <span>Login</span>
              </button>
              {errorMessage}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

