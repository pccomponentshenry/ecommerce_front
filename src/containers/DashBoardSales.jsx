import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOneByOne, getUsers } from "../redux/actions";
import SideDash from "../components/SideDash"
import s from "../styles/DashBoardSales.module.css"
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  IconButton,
  Tooltip,
  Radio,
  FormControlLabel,
  MenuItem,
} from '@mui/material';

import { Edit } from '@mui/icons-material';


export default function DashBoardSales() {
  const orders = useSelector(state => state.allOrdersOneByOne);
  const user = useSelector(state => state.users);
  const [tableData, setTableData] = useState(() => orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOneByOne());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  // console.log(orders)


  let index = "";
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Order ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 10,
      },
      {
        accessorKey: 'userId',
        header: 'User Email',
        size: 350,
        Cell: ({ cell }) => (

          // console.log(cell.getValue())
          user[user.findIndex(users => users.id === cell.getValue())].email

        ),

      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'purchaseDate',
        header: 'Date',
      },
      {
        accessorKey: 'addressId',
        header: 'Address',
      },
      // {
      //   accessorKey: 'addressId',
      //   header: 'Address',
      //   Cell: ({ cell }) => (
      //     cell.getValue().toLocaleString() === "true" ? <FormControlLabel control={<Radio defaultChecked color="success" />} label="Yes" /> :
      //       <FormControlLabel control={<Radio color="secondary" defaultChecked />} label="No" />
      //   )
      // },


    ],
  );




  return (

    <div className={s.content}>
      <div className={s.sideContainer}><SideDash /></div>
      <div className={s.salesContainer}>

        <MaterialReactTable className={s.tabla}
          enableHiding={false}
          enableColumnFilters={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableGlobalFilter={false}
          initialState={{
            showGlobalFilter: true,
          }}
          columns={columns}
          data={tableData}
          enableTopToolbar={true}
          editingMode="modal" //default
          enableEditing
          positionActionsColumn='last'
          muiTablePaperProps={{
            elevation: 0, //change the mui box shadow
            //customize paper styles
            sx: {
              borderRadius: '5px',
              border: '2px solid #e0e0e0',
              boxShadow: '0px 0px 3px 0px #000'
            },
          }}

        />

      </div>

    </div>
  );
};


