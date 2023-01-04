import React, { useEffect } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions";
import SideDash from "../components/SideDash"
import s from "../styles/DashBoardUsers.module.css"
// import { Users } from "../Data";
import DataTable from "react-data-table-component";


const columnas =[
  {
    name:'ID',
    selector: 'id',
    sortable: true
  },
  {
    name:'Username',
    selector: 'username',
    sortable: true
  },
  {
    name:'Email',
    selector: 'email',
    sortable: true
  },
  {
    name:'Status',
    selector: 'status',
    sortable: true
  },
  {
    name:'Role',
    selector: 'isAdmin',
    sortable: true
  },

]

export default function DashBoardUsers() {

  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  return (

    <div className={s.content}>
      <div className={s.sideContainer}><SideDash /></div>
      <div className={s.userContainer}><h3>Listado de Usuarios para gestionar datos</h3>

         <DataTable className={s.listaUsuarios}
          columns={columnas}
          data={users}
          />

        
      </div>
    </div>

  );
}