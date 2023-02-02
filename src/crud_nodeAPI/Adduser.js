import React, { useState } from 'react'

const Adduser = (props) => {
    const initUser = {name: '', email: '', password: ''};
    const [user, setUser] = useState(initUser);
    const handleChange = e =>{
        const {name, value} = e.target;
        setUser({...user,[name]:value});
       
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (user.name && user.email && user.password) {
            handleChange(e, props.addUser(user));
        }else{
          props.errormessage('please enter something')
        }
        setUser(initUser);
    }
  return (
    <div>
       <form>
      
      <label>Name</label>
      <input className="u-full-width" type="text" value={user.name} name="name" onChange={handleChange} />
      <label>Email</label>
      <input className="u-full-width" type="text" value={user.email} name="email" onChange={handleChange} />
      <label>password</label>
      <input className="u-full-width" type="text" value={user.password} name="password" onChange={handleChange} />
      <button className="btn btn-primary" type="submit" onClick={handleSubmit} >Add user</button>
    </form>
    </div>
  )
}

export default Adduser
