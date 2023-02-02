import React, { useEffect, useState } from "react";

const Userdatatable = (props) => {
  const [data, setState] = useState(props.users);
  useEffect(() => {
    setState(props.users);
  }, [props]);

  const globalSearch = (e) => {
    let filtered = props.users.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.id.toString().toLowerCase().includes(e.target.value) ||
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // set filtered users in state
    setState(filtered);
  };
 

  return (
    <>
      <label htmlFor="search">
        Search:
        <input id="search" type="text" onChange={globalSearch} />
      </label>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user) => {
              // const { id, name, username } = user;
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>
                    <button onClick={() => props.deleteUser(user.id)}>
                      Delete
                    </button>
                    <button onClick={() => props.editUser(user, user.id)}>
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
