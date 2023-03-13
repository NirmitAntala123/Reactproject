
import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true

const API_URL = "http://localhost:4000/";

const register = (formData) => {
  // console.log("user",user);
  //   const { firstName,
  //     lastName,
  //     mobil,
  //     birthDate,
  //     profilePhoto,
  //     country,
  //     state,
  //     city,
  //     email,
  //     password,
  //     gender} = {...user};
    return axios.post(API_URL + "users/register",formData,{
         headers : {    "Content-Type": "multipart/form-data"  }
      });
  
  };

  const login = (user) => {
    const { email, password} = {...user};
    return axios
      .post(API_URL + "users/login", {
        email,
        password,
      })
  };

  const logout = () => { 
    localStorage.removeItem("user");
    return axios.get(API_URL + "users/logout")
  };

  const AuthService = {
    register,login,logout
  }
  
  export default AuthService;


