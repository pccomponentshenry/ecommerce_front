import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOneByOne, getUsers, getAddresses } from "../redux/actions";
import SideDash from "../components/SideDash";
import s from "../styles/DashBoardSales.module.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default function DashBoardSales() {
  const orders = useSelector(state => state.allOrdersOneByOne);
  const user = useSelector(state => state.users);
  const addresses = useSelector(state => state.addresses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOneByOne(), getUsers(), getAddresses());
  }, []);

  return (
    <div className={s.content}>
      <div className={s.sideContainer}>
        <SideDash />
      </div>
      <div className={s.header}>Sales detail</div>
      <div className={s.dashBlock}>
        <div className={s.salesContainer}>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>USER EMAIL</th>
                <th>ADDRESS</th>
                <th>PURCHASE DATE</th>
                <th>STATUS</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            {orders.map(o => (
              <tbody key={o.id}>
                <tr>
                  <td>{o.id}</td>
                  <td>{user[user.findIndex(e => e.id === o.userId)].email}</td>
                  <td>
                    {o.address.streetName} {o.address.streetNumber} -{" "}
                    {o.address.location.name}
                  </td>
                  <td>
                    {o.purchaseDate.substr(0, 10)} -{" "}
                    {o.purchaseDate.substr(11, 5)}
                  </td>
                  <td>
                    {o.status === "completed" ? (
                      <span className={s.ok}>{o.status}</span>
                    ) : (
                      <span className={s.bad}>{o.status}</span>
                    )}
                  </td>
                  <td>
                    <Link to={`id/${o.id}`}>
                      <button className={s.buttonDetails}>Details</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          {/* <MaterialReactTable className={s.tabla}
          autoResetAll={true}
          enableHiding={false}
          enableColumnFilters={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableGlobalFilter={false}
          initialState={{
            showGlobalFilter: true,          
          }}
          state={ isLoading }
          columns={columns}
          data={tableData? isLoading === true : false}
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
        /> */}
        </div>
      </div>
    </div>
  );
}
