// import React from 'react';
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const RegisterTest = () => {
  const [state, dispatch] = useContext(LoginContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="col-md-12">
      <div className="card card-container login1">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
  initialValues={{ state: "" }}
  validationSchema={Yup.object({
    state: Yup.string().required("State field is required!"),
  })}
  onSubmit={(values, { setSubmitting }) => {
    console.log(values);
  }}
>
  {({ errors, touched,handleBlur, handleChange}) => (
    <Form>
      <Field
        as="select"
        name="state"
        className={errors.state && touched.state ? 'form-control is-invalid' : 'form-control'}
        onBlur={handleBlur}
        onChange={handleChange}
      >
        <option value="">Select State</option>
        <option value="Alaska">Alaska</option>
        <option value="California">California</option>
        <option value="Washington">Washington</option>
      </Field>
      <ErrorMessage
        name="state"
        component="div"
        className="invalid-feedback"
      />

      <div className="form-group">
        <button className="btn btn-primary btn-block">
          <span>Login</span>
        </button>
       

              {errorMessage}
            </div>
          </Form>)}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterTest;
