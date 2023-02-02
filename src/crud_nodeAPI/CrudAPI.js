import axios from "axios";
import React, { useEffect, useState } from "react";
import Edituser from "../crud_nodeAPI/EditUser";
import Adduser from "../crud_nodeAPI/Adduser";
import Userdatatable from "../crud_nodeAPI/Userdatatable";

const CrudAPI = () => {

const initialUser = { name: "", email: "", password: "" };
const [currentUser, setCurrentUser] = useState(initialUser);
const [editing, setEditing] = useState(false);
const [usersArray, setUsersArray] = useState([]);

//show users
useEffect(() => {
  const fetchData = async () => {
    const fetch = await axios.get(`http://localhost:4000/users/`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await fetch.data;
    setUsersArray(data);
  };
  fetchData().catch(console.error);
}, []);

//set error message
const [error, seterror] = useState("");
const errormessage = (error) => {
  seterror(error);
  setTimeout(() => {
    seterror("");
  }, 3000);
};

//Add user
const addUser = (user) => {
  axios
    .post("http://localhost:4000/users/create-user", user,{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.status === 200) setUsersArray([...usersArray, res.data]);
      else Promise.reject();
    })
    .catch((err) => alert("Something went wrong"));
};
//edit user page
const editUser = (user) => {
  setEditing(true);
  setCurrentUser(user);
};

//update user
const updateUser = (newUser) => {
  axios
    .put("http://localhost:4000/users/update-user/" + newUser._id, newUser,{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setUsersArray(
          usersArray.map((user) =>
            user._id === currentUser._id ? newUser : user
          )
        );
      } else Promise.reject();
    })
    .catch((err) => alert("Something went wrong"));

  setCurrentUser(initialUser);
  setEditing(false);
};

//delete User
const deleteUser = (_id) => {
  axios
    .delete("http://localhost:4000/users/delete-user/" + _id,{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setUsersArray(
          usersArray.filter((user) => user._id !== res.data.msg._id)
        );
      } else Promise.reject();
    })
    .catch((err) => alert("Something went wrong"));
};
  return (
    <div className="container">
      <h1>React CRUD App with MERN</h1>
      <div className="row">
        <div className="seven columns">
          <p>{error}</p>
          {editing ? (
          <div>
            <h2>Edit user</h2>
            <Edituser
              currentUser={currentUser}
              setEditing={setEditing}
              updateUser={updateUser}
              errormessage={errormessage}
            />
          </div>
        ) : (
          <div>
            <h2>Add user</h2>
            <Adduser addUser={addUser} errormessage={errormessage} />
          </div>
         )} 
          <h2>View users</h2>
          <Userdatatable
          users={usersArray}
          deleteUser={deleteUser}
          editUser={editUser}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudAPI;
