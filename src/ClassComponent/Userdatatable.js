import React, { Component } from 'react'

export default class Userdatatable extends Component {
    constructor(props) {
        super(props);
       
      }
  render() {
    return (
      <div>
        {/* <label htmlFor="search">
        Search:
        <input id="search" type="text" onChange={globalSearch} />
      </label> */}
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
          {this.props.userList.length > 0 ? (
            this.props.userList.map((user) => {
              // const { id, name, username } = user;
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  {/* <td>
                    <button onClick={() => props.deleteUser(user.id)}>
                      Delete
                    </button>
                    <button onClick={() => props.editUser(user, user.id)}>
                      Edit
                    </button>
                  </td> */}
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
      </div>
    )
  }
}
