import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState ,useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault()

    const form = e.target
    const user = {
        name:form[0].value,
        email: form[1].value,
        password: form[2].value,
    }
    if (user.email && user.password && user.name) {
    try {
        const res =  await fetch("http://localhost:4000/users/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (data.message !== 'Success') {
          setErrorMessage(data.message);
          // Swal.fire(e.response.data.message, "", "error");
        }else{
          navigate('/Login');
        }
    } catch (err) {
        setErrorMessage(err)
    }
  }
}

// useLayoutEffect(() => {
//     fetch("http://localhost:4000/users/isUserAuth", {
//         headers: {
//             "x-access-token": localStorage.getItem("token")
//         }
//     })
//     .then(res => res.json())
//     .then(data => data.isLoggedIn ? navigate("/"): null)
//     .catch(err => setErrorMessage(err)) 
// }, [])

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik initialValues={{ name:"", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("User name field is required !"),
          email: Yup.string().required("User Email field is required !"),
          password: Yup.string().required("Password field is required !"),
        })}
        >
          <Form
         onSubmit={(e) => handleRegister(e)}
          //   ref={form}
          >
            <div className="form-group">
              <label htmlFor="name">name</label>
              <Field
                type="text"
                className="form-control"
                name="name"
                // value={username}
                // onChange={onChangeUsername}
                // validations={[required]}
              />
              <span>
                <ErrorMessage name="name" />
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="username">Email</label>
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
                <span>Register</span>
              </button>{errorMessage}
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

export default Register;
