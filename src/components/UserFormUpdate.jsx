import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideDash from "../components/SideDash"
import { Link, useParams } from "react-router-dom";
import { getUser, putUser } from "../redux/actions/index";
import s from "../styles/UserFormUpdate.module.css";
import { WindowSharp } from "@mui/icons-material";

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

  let adminOp = 'true'
  if(user.isAdmin === 'true'){
    adminOp = 'true'
  }else{
    adminOp = 'false'
  }

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getUser(params.email));
  }, [dispatch]);

  useEffect(() => {
    setInput(prev => ({ ...prev, userId: user.id, username: user.username, status: user.status, isAdmin: user.isAdmin }));
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
      window.history.back();
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
                value={input.username}
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
            <div>Status</div>
           
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
                  <option value={'DEFAULT'}>Select Status</option>
                  {statusUser.map((el, i) => (
                    <option key={i} value={el}>{el}</option>
                  ))}
                </select>
             
            </div>
            <div className={s.admin}>

            <div>Admin</div>
           
           <select
            name="isAdmin"
            value={input.isAdmin}
            id="Admin"
            onBlur={e => {
              handleChange(e);
             
            }}
            onChange={e => {
              handleChange(e);
             
            }}
          >
            <option value={'DEFAULT'}>Select Role</option>
              <option value={'true'}>Yes</option>
              <option value={'false'}>No</option>
          </select>

            </div>
          <div className={s.buttonsCont}>
            <Link to='/dashboard/users'><div className={s.buttonCancel} >
            <button>Cancel </button>
             </div>
            </Link>
          <div className={s.buttonSubmit}>
            <button type="submit">
              Update User
            </button>
          </div>
          </div>
        </div>
      </form>

      </div>
    </div>
  
    
  );
}
