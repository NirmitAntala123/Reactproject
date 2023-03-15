import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet, Link, Navigate, useLocation, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import AuthService from "../services/auth.service";
import Footer from "./Footer";
const All = () => {
  const location = useLocation();

  // The current location.
  // console.log(location);

  return <div>{location.pathname}</div>;
};
const Layout = () => {
  const location = useLocation();
  // console.log(location);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useContext(LoginContext);
   const logout = () => {
      let userData = {
        isLoggedIn: false, user: undefined 
      };
      dispatch({
        type: "logout",
        user: userData,
      });
      AuthService.logout().then((res)=>{
        const data = res.data;
      console.log(data);
      })
    //  navigate("/Login");
  }
  if (<Route path='*'/>) {
    // console.log('asdf');

  }
  useEffect(() => {
    const fetchData = async () => {
      const fetch = await axios.get(`http://localhost:4000/users/isUserAuth`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = await fetch.data;
      setusername(data.name);
      let userData = {
        isLoggedIn: data.isLoggedIn, user: data.name 
      };
      dispatch({
        type: "Login",
        user: userData,
      });
    };
    fetchData().catch(console.error);
  },[]);


  if(!state.isLoggedIn && window.location.pathname !== "/Login" && window.location.pathname !== "/Register"){
    // navigate("/Login")
    return <Navigate to = "/Login"/>
  }

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-md">
          <Link className="navbar-brand" to="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
               {state.isLoggedIn ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crud_custom_hook">
                    crud_custom_hook
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crud_nodeAPI">
                    crud_nodeAPI
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/class_component">
                  Class_Component
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    to=""
                  >
                    Pages
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/Page1">
                        Page1
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/Page2">
                        Page2
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/Page3">
                        Page3
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/Page4">
                        Page4
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/ReducerDemo">
                      ReducerDemo
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/Tabs">
                      Tabs
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
             ) : (  
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
              </ul>
             )} 
              {state.isLoggedIn ? ( 
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={""} className="nav-link">
                    Welcome, {username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={logout} className="nav-link">
                    Logout
                  </Link>
                </li>
              </div>
           ) : ( 
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/Login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/Register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
              )} 
            {/* <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> */}
          </div>
        </div>
      </nav>
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default Layout;
