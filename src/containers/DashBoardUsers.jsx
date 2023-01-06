import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions";
import SideDash from "../components/SideDash"
import s from "../styles/DashBoardUsers.module.css"
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


export default function DashBoardUsers() {
  const users = useSelector(state => state.users);
  const [tableData, setTableData] = useState(() => users);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const optionsAdmin = [{id:0, text:'Yes', value:true }, {id:1, text:'No', value:false }];
  const optionsStatus = [{id:0, text:'Active', value:'active' }, {id:1, text:'Inactive', value:'inactive' }];


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };
  
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
                : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,        
      },
      {
        accessorKey: 'username',
        header: 'UserName',      
      },
      {
        accessorKey: 'email',
        header: 'Email',       
      },
      {
        accessorKey: 'status',
        header: 'Status',   
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: optionsStatus.map((o) => (
            <MenuItem key={o.id} value={o.value}>
              {o.text}
            </MenuItem>
          )),
        },     
        Cell: ({ cell }) => (
         cell.getValue() === "active" ?  <FormControlLabel control={<Radio defaultChecked color="success"/>} label="Active" />
           : <FormControlLabel control={<Radio color="secondary" defaultChecked/>} label="Inactive" />
          )    
      },   
      {
        accessorKey: 'isAdmin',
        header: 'Admin', 
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: optionsAdmin.map((o) => (
            <MenuItem key={o.id} value={o.value}>
              {o.text}
            </MenuItem>
          )),
        },     
        Cell: ({ cell }) => (
           cell.getValue().toLocaleString() === "true" ? <FormControlLabel control={<Radio defaultChecked color="success"/>} label="Yes" /> : 
           <FormControlLabel control={<Radio color="secondary" defaultChecked/>} label="No" />
          )        
      },   
     
    ],
    [getCommonEditTextFieldProps],
  );

 
  return (

    <div className={s.content}>
      <div className={s.sideContainer}><SideDash /></div>
      <div className={s.userContainer}>
      <MaterialReactTable className={s.tabla}
        enableHiding={false}
        enableColumnFilters={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableGlobalFilter={true}
        initialState={{
          showGlobalFilter:true,          
        }}        
        columns={columns}
        data={tableData}
        enableTopToolbar={true}
        editingMode="modal" //default
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        positionActionsColumn='last'
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="Edit User">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        )}
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


