import React, { useEffect, useState } from 'react'
const EditUser = (props) => {
      useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    const [user, setUser] = useState(props.currentUser);  
    
      const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
      }
      const handleSubmit = e => {
    
        if (user.name && user.email && user.password) {
          props.updateUser(user);
        } else {
          props.errormessage("please enter something");
        }
      }
  return (
        <form>
            <label>Name</label>
            <input className="u-full-width" type="text" value={user.name} name="name" onChange={handleChange} />
            <label>Email</label>
            <input className="u-full-width" type="text" value={user.email} name="email" onChange={handleChange} />
            <label>password</label>
            <input className="u-full-width" type="text" value={user.password} name="password" onChange={handleChange} />
            <button className="btn btn-primary" type="button" onClick={handleSubmit} >Edit user</button>
            <button className="btn btn-secondary"type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
  )
}

export default EditUser;
