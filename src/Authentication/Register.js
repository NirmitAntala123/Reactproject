import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [gender, setGender] = useState();

  function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    let formData = new FormData();
    // console.log("event", e.target[6].files[0]);
    formData.append('firstName', form[0].value)
    formData.append('lastName', form[4].value)
    formData.append('mobile', form[9].value)
    formData.append('birthDate', form[2].value)
    formData.append('profilePhoto', e.target[6].files[0])
      formData.append('country', form[3].value)
      formData.append('state', form[7].value)
      formData.append('city', form[12].value)
      formData.append('email', form[8].value)
      formData.append('password', form[1].value)
      formData.append('gender', gender)

   
    // const user = {
    //   firstName: form[0].value,
    //   lastName: form[4].value,
    //   mobile: form[9].value,
    //   birthDate: form[2].value,
    //   profilePhoto: form[6].value,
    //   country: form[3].value,
    //   state: form[7].value,
    //   city: form[12].value,
    //   email: form[8].value,
    //   password: form[1].value,
    //   gender: gender,
    // };
      if(form[1].value  !==  form[5].value){
      return false;
      }
      try {
        AuthService.register(formData).then((res) => {
          const data = res.data;
          if (data.message !== "Success") {
            setErrorMessage(data.message);
          } else {
            navigate("/Login");
          }
        });
      } catch (err) {
        setErrorMessage(err);
      }
    
  }

  return (
    <div className="col-lg-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            birthDate: "",
            profilePhoto: "",
            country: "",
            state: "",
            city: "",
            password: "",
            gender:""
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("firstName field is required !"),
            lastName: Yup.string().required("lastName field is required !"),
            mobile: Yup.string().required("mobile field is required !"),
            birthDate: Yup.string().required("birthDate field is required !"),
            profilePhoto: Yup.string().required("profilePhoto field is required !"),
            country: Yup.string().required("country field is required !"),
            state: Yup.string().required("state field is required !"),
            city: Yup.string().required("city name field is required !"),
            email: Yup.string().required("User Email field is required !"),
            password: Yup.string().required("Password field is required !"),
            confirmPassword: Yup.string()
              .required('Confirm password is required!')
              .test('passwords-match', 'Passwords do not match', function(value) {
                return this.parent.password === value;
              })
          })}
        >
          <Form
            onSubmit={(e) => handleRegister(e)}
            //   ref={form}
          //   encType="multipart/form-data"
          //  method=""
          >
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="firstName">FirstName</label>
                  <Field
                    type="text"
                    className="form-control"
                    name="firstName"
                    // value={username}
                    // onChange={onChangeUsername}
                    // validations={[required]}
                  />
                  <span>
                    <ErrorMessage name="firstName" />
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                  />
                  <span>
                    <ErrorMessage name="password" />
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="birthDate">Birth Date</label>
                  <Field
                    type="date"
                    className="form-control"
                    name="birthDate"
                  />
                  <span>
                    <ErrorMessage name="birthDate" />
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select className="form-control" name="country">
                    <option value="">Select Country</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="canada">Canada</option>
                  </select>
                  <span>
                    <ErrorMessage name="country" />
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="lastName">lastName</label>
                  <Field type="text" className="form-control" name="lastName" />
                  <span>
                    <ErrorMessage name="lastName" />
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">confirm Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                  />
                  <span>
                    <ErrorMessage name="confirmPassword" />
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="profilePhoto">Profile Photo</label>
                  <Field
                    type="file"
                    className="form-control-file"
                    name="profilePhoto"
                  />
                  <span>
                    <ErrorMessage name="profilePhoto" />
                  </span>
                </div>
                <div className="form-group" style={{padding: "7px 0 0 0"}}>
                  <label htmlFor="state">State</label>
                  <select className="form-control" name="state">
                    <option value="">Select State</option>
                    <option value="Alaska">Alaska</option>
                    <option value="California">California</option>
                    <option value="Washington">Washington</option>
                  </select>
                  <span>
                    <ErrorMessage name="state" />
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <Field type="email" className="form-control" name="email" />
                  <span>
                    <ErrorMessage name="email" />
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">mobile</label>
                  <Field type="number" className="form-control" name="mobile" />
                  <span>
                    <ErrorMessage name="mobile" />
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <Field type="radio" name="gender" value='Male' onChange={()=>setGender('Male')} checked={gender === "Male"}/>
                  Male
                  <Field type="radio" name="gender" value='Female' onChange={()=>setGender('Female')} checked={gender === "Female"}/>
                  Female
                  <span>
                    <ErrorMessage name="gender" />
                  </span>
                </div>
                <div className="form-group" style={{padding: "12px 0 0 0"}}>
                  <label htmlFor="city">City</label>
                  <select className="form-control" name="city">
                    <option value="">Select City</option>
                    <option value="Amreli">Amreli</option>
                    <option value="Jamnagar">Jamnagar</option>
                    <option value="Rajkot">Rajkot</option>
                  </select>
                  <span>
                    <ErrorMessage name="city" />
                  </span>
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  <span>Register</span>
                </button>
                {errorMessage}
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
