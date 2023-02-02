import React, { useEffect, useState } from 'react'
const Edituser = (props) => {
      useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    const [user, setUser] = useState(props.currentUser);  
    
      const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
      }
      const handleSubmit = e => {
        if (user.name && user.username) {
          props.updateUser(user);
        } else {
          props.errormessage("please enter something");
        }
      }
  return (
        <form>
            <label>Name</label>
            <input className="u-full-width" type="text" value={user.name} name="name" onChange={handleChange} />
            <label>Username</label>
            <input className="u-full-width" type="text" value={user.username} name="username" onChange={handleChange} />
            <button className="button-primary" type="button" onClick={handleSubmit} >Edit user</button>
            <button type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
  )
}

export default Edituser;
