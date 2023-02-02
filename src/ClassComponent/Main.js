import produce from "immer";
import React, { Component } from "react";
import Adddata from "./Adddata";
import Userdatatable from "./Userdatatable";


const userList = [
  {
      id: 1,
      name: 'Frank',
      username: 'Frank Degrassi'
  },
  {
      id: 2,
      name: 'Birgit',
      username: 'Birgit Boswald'
  }
];

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList
    };
    this.addUser = this.addUser.bind(this);
    console.log(this.state);
  }

  addUser(user) {
    user.id = this.state.userList.length + 1;
    console.log(user);
    // let users= this.state.userList;
    // users.push(user)
    this.setState(produce((draft) => {
      draft.userList.push(user);
    }));
    // this.setState(users);
    // this.state.userList.push(user);
    // this.setState([...this.state.userList,[user]]);
    // console.log(user);
    // console.log(this.state);
  }
//   componentDidMount() {
//     this.addUser();
//  }
  render() {
    return (
      <div>
        <div className="container">
          <h1>React with Class Components</h1>
         
          <Adddata addUser={this.addUser} />
          <Userdatatable userList={this.state.userList} />
         
        </div>
      </div>
    );
  }
}
