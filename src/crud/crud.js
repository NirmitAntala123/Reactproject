
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import Adduser from "./Adduser";
import userList from "./data";
import Edituser from "./Edituser";
import Userdatatable from "./Userdatatable";


const Crud_custom_hook = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useImmer(userList);
  const [error, seterror] = useState('');
  const addUser = (user) => {
//     const userrr=users.filter((user) => user.name !== userfe.name)
//     const Bruno = users.find((person) => person.name === userfe.name)
// if(Bruno!==undefined){
// if (Bruno.username===userfe.username) {
//   console.log('true')
//   navigate('/');
// }
// }
// console.log(Bruno)
    // console.log(userrr);
    user.id = users.length + 1;
    // setUsers([...users, user]);
    setUsers(draft => {
      draft.push(user);
    });
  };
  const errormessage = (error) => {
    seterror(error);
    setTimeout(() => {
      seterror('')
    }, 3000);
  };
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  
  const initialUser = { id: null, name: "", username: "" };
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialUser);
  const editUser = (user) => {
    setEditing(true);
   setCurrentUser(user);
  };
  const updateUser = (newUser) => {

    setUsers(
      users.map((user) => (user.id === currentUser.id ? newUser : user))
    );
    setCurrentUser(initialUser);
    setEditing(false);
  };
  return (
    <div className="container">
      <h1>React CRUD App with Hooks</h1>
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
              <Adduser addUser={addUser}
              errormessage={errormessage}/>
            </div>
          )}
          <h2>View users</h2>
          <Userdatatable users={users}
            deleteUser={deleteUser}
            editUser={editUser} />
        </div>
      </div><button type='button' id="btn" >click</button>
    </div>
  );
};

export default Crud_custom_hook;
