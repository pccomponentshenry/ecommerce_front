import { useState } from "react";
import SideDash from "../components/SideDash"
import s from "../styles/DashBoardUsers.module.css"
import { Users } from "../Data";
import DataTable from "react-data-table-component";


const columnas =[
  {
    name:'ID',
    selector: 'id',
    sortable: true
  },
  {
    name:'Nombre',
    selector: 'nombre',
    sortable: true
  },
  {
    name:'Apellido',
    selector: 'apellido',
    sortable: true
  },
  {
    name:'Email',
    selector: 'email',
    sortable: true
  },

]

export default function DashBoardUsers() {


  return (

    <div className={s.content}>
      <div className={s.sideContainer}><SideDash /></div>
      <div className={s.userContainer}><h3>Listado de Usuarios para gestionar datos</h3>

         <DataTable className={s.listaUsuarios}
          columns={columnas}
          data={Users}
          />

        
      </div>
    </div>

  );
}