import React, { Component } from 'react'


export default class Adddata extends Component {

    constructor() {
        super();
        this.state = {
            id:null,
            name:'',
            username:''
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      changeHandler(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      } 
      handleSubmit(e) {
      e.preventDefault();
      if (this.state.name && this.state.username) {
       this.props.addUser(this.state);
       this.setState({id:null,name:'',username:''})

      }
        // console.log(this.state)
      }
  render() {
    return (
      <div>
       
        <form>
        
        <label>Name</label>
        <input className="u-full-width" type="text"  name="name" value={this.state.name} onChange={this.changeHandler} />
        <label>Username</label>
        <input className="u-full-width" type="text"  name="username" value={this.state.username}  onChange={this.changeHandler} />
        <button className="button-primary" type="submit" onClick={this.handleSubmit} >Add user</button>
        </form>
      </div>
    )
  }
}
