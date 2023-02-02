import React, { useState } from 'react' ;

const Adduser = (props) => {
    const initUser = {id: null, name: '', username: ''};
    const [user, setUser] = useState(initUser);
  
    const handleChange = e =>{
        const {name, value} = e.target;
        setUser({...user,[name]:value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (user.name && user.username) {
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
            <label>Username</label>
            <input className="u-full-width" type="text" value={user.username} name="username" onChange={handleChange} />
            <button className="button-primary" type="submit" onClick={handleSubmit} >Add user</button>
        </form>
    </div>
  )
}

export default Adduser;
