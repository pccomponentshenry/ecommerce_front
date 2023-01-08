import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideDash from "../components/SideDash"
import { Link, useParams } from "react-router-dom";
import { getUser, putUser } from "../redux/actions/index";
import s from "../styles/UserFormUpdate.module.css";

export default function UserFormUpdate() {
  const user = useSelector(state => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    userId: "",
    username: "",   
    status: "",
    isAdmin: "",   
  });
  const initialState = {
    userId: user.id,
    username: user.username,  
    status: user.status,
    isAdmin: user.isAdmin,   
  };

  const statusUser = ['active', 'inactive', 'banned', 'deleted']

  if(user.isAdmin == true) {
     const adminUser = 'Yes'
  } else {
    const adminUser = 'No'
  }

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getUser(params.email));
  }, [dispatch]);

  useEffect(() => {
    setInput(prev => ({ ...prev, userId: user.id }));
  }, [user]);

  function clearForm() {
    setInput({ ...initialState });
  }

  // const errorSetting = e => {
  //   setError(
  //     handleValidate({
  //       ...input,
  //       [e.target.name]: e.target.value,
  //     })
  //   );
  // };

  // const handleValidate = input => {
  //   const errors = {};

  //   if (!input.username) {
  //     errors.username = "*Name is required";
  //   }
  //   if (!input.email) {
  //     errors.email = "*Email is required";
  //   }
  //   return errors;
  // };

    
  const handleChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    
      e.preventDefault();
      dispatch(putUser(user.id, input));
      alert('User updated succesfully!')

      clearForm();
      setError({});
    
  };

  return (

<div className={s.content}>
      <div className={s.sideContainer}><SideDash /></div>
      <div className={s.userContainer}>

        <form onSubmit={e => handleSubmit(e)} autoComplete="off">
          
        <div className={s.formContainer}>
          <div>
            <div className={s.name}>
              <label>Username: </label>
              <input
                value={input.username || ""}
                type="text"
                name="username"
                placeholder={user.username}
                onChange={e => {
                  handleChange(e);
                 
                }}
              />
              <div>{error.username && <span>{error.username}</span>}</div>
            </div>
          </div>
          <div>
           
          </div>
          <div className={s.status}>
            <div>
              <div className={s.brand}>
                <select
                  name="status"
                  value={input.status}
                  id="Status"
                  onBlur={e => {
                    handleChange(e);
                   
                  }}
                  onChange={e => {
                    handleChange(e);
                   
                  }}
                >
                  <option defaultValue={user.status}>{user.status}</option>
                  {statusUser.map((el, i) => (
                    <option key={i} value={el}>{el}</option>
                  ))}
                </select>
               
              </div>
            </div>

            <div className={s.admin}>

           
           <input 
            type="checkbox"
            name="noAdmin"
            value={input.isAdmin}
            defaultChecked={user.isAdmin=== true}
            />        
            <label value={false} for="isAdmin">Admin</label>
            
            <input 
            type="checkbox"
            name="isAdmin"
            value={input.isAdmin}
            defaultChecked={user.isAdmin=== false}
            />
            <label value={true} for="isAdmin">No Admin</label>



              {/* <select
                name="isAdmin"              
                value={input.isAdmin}
                onBlur={e => {
                  handleChange(e);                  
                }}
                onChange={e => {
                  handleChange(e);                 
                }}
              >
                <option defaultValue={user.isAdmin}>{user.isAdmin.toString()}</option>
               
                    <option>{user.isAdmin.toString() === 'true' ? 'false' : ""}</option>
                
              </select>               */}
            </div>
          </div>
          
          <div className={s.buttonSubmit}>
            <button
              type="submit"
              // className={disable === false ? s.activeBtn : s.disabledBtn}
              // onClick={e => {
              //   disable && e.preventDefault();
              // }}
            >
              Update User
            </button>
          </div>
        </div>
      </form>

      </div>
    </div>
  
    
  );
}
