import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import RegisterTest from "./Authentication/RegisterTest";

import Main from "./ClassComponent/Main";
import { LoginContext, LoginProvider } from "./Context/LoginContext";
import Crud_custom_hook from "./crud/crud";
import CrudAPI from "./crud_nodeAPI/CrudAPI";
import Layout from "./layout/layout";
import PrivateRoute from "./layout/PrivateRoute";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import TabsEx from "./pages/Tabs";
import ReducerDemo from "./ReducerDemo/ReducerDemo";
const All = () => {
  return <div>404, Page not found</div>;
};

const App = () => {
  
  return (
    <>
      <BrowserRouter>
      <LoginProvider>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='*' element={<All/>}/>
        
          <Route path="/" exact element={<Home />} />
          <Route path="/crud_custom_hook" element={<Crud_custom_hook />} />
          <Route path="/crud_nodeAPI" element={<CrudAPI />} />
          <Route path="/class_component" element={<Main />} />
          <Route path="/Page1" element={<Page1 />} />
          <Route path="/Page2" element={<Page2 />} />
          <Route path="/Page3" element={<Page3 />} />
          <Route path="/Page4" element={<Page4 />} />
          <Route path="/Tabs" element={<TabsEx />} />
          <Route path="/ReducerDemo" element={<ReducerDemo />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" exact element={<Register />} />
          {/* <Route path="/Register" exact element={<RegisterTest />} /> */}

          
        </Route>
        </Routes>
        </LoginProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
