// import axios from "axios";
import React, { useEffect, useState } from "react";
import Edituser from "../crud_nodeAPI/EditUser";
import Adduser from "../crud_nodeAPI/Adduser";
import Userdatatable from "../crud_nodeAPI/Userdatatable";
import UserService from "../services/user.service";

const CrudAPI = () => {
  const initialUser = { name: "", email: "", password: "" };
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [usersArray, setUsersArray] = useState([]);

  //show users
  useEffect(() => {
    UserService.getAllUser().then((response) => {
      setUsersArray(response.data);
    });
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
  const addUser = async (user) => {
    const usercreate = await UserService.createUser(user);
    if (usercreate.status === 200) setUsersArray([...usersArray, usercreate.data]);
    else Promise.reject();
  
    // UserService.createUser(user)
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) setUsersArray([...usersArray, res.data]);
    //     else Promise.reject();
    //   })
      // .catch((err) => alert("Something went wrong"));
  };
  //edit user page
  const editUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  //update user
  const updateUser = (newUser) => {
    UserService.updateUser(newUser).then((res)=>{
      if (res.status === 200) {
              setUsersArray(
                usersArray.map((user) =>
                  user._id === currentUser._id ? newUser : user
                )
              );
            } else Promise.reject();
    }).catch((err)=>alert("Something went wrong"));
    setCurrentUser(initialUser);
    setEditing(false);
  };

  //delete User
  const deleteUser = (_id) => {
    UserService.deleteUser(_id).then((res)=>{
      if (res.status === 200) {
              setUsersArray(
                usersArray.filter((user) => user._id !== res.data.msg._id)
              );
            } else Promise.reject();
    }).catch((err) => alert("Something went wrong"));
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
