import React, { useEffect, useState } from "react";

const Userdatatable = (props) => {
  const [data, setState] = useState([]);
  useEffect(() => {
    setState(props.users);
  }, [props]);

  const globalSearch = (e) => {
    let filtered = props.users.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // set filtered users in state
    setState(filtered);
  };

  return (
    <>
      <label htmlFor="search">
        Search:
        <input id="search" type="text" onChange={globalSearch}/>
      </label>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, index) => {
              // const { id, name, username } = user;
              return (
                <tr key={user._id}>
                  <td>{index+1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>

                  <td>
                    <button className="btn btn-danger" onClick={() => props.deleteUser(user._id)}>Delete</button>
                    <button className="btn btn-success" onClick={() => props.editUser(user, user._id)}>
                        Edit
                      </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Userdatatable;
