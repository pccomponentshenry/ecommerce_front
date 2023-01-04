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
} from '@mui/material';
import { Edit } from '@mui/icons-material';


export default function DashBoardUsers() {
  const users = useSelector(state => state.users);
  const [tableData, setTableData] = useState(() => users);
  const [validationErrors, setValidationErrors] = useState({});
 
  const dispatch = useDispatch();

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
        size: 100,
      },
      {
        accessorKey: 'username',
        header: 'UserName',
        size: 180,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 210,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 10,
       
      },   
      {
        accessorKey: 'isAdmin',
        header: 'Admin',
        size: 0,
      },   
     
    ],
    [getCommonEditTextFieldProps],
  );

 


  return (


    <div className={s.content}>
      <div className={s.sideContainer}><SideDash /></div>
      <div className={s.userContainer}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableTopToolbar={true}
        initialState={{ columnVisibility: { isAdmin: false } }} //hide firstName column by default
        editingMode="modal" //default
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="Edit User">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        )}
       
      />
      </div>
     
    </div>
  );
};


