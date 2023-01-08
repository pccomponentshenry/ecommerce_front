import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus, clearCart, updateProductsStock } from "../redux/actions";
import ProfileDetail from "../containers/ProfileDetail";

export default function OrderConfirmed() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const shouldUpdate = useRef(true);

  const updateDataBase = () => {
    // dispatch(updateProductsStock(user.id));
    dispatch(changeOrderStatus(user.id, "completed"));
    dispatch(clearCart(user.email));
  }

  useEffect(() => {
    if (shouldUpdate.current && user.id) {
      shouldUpdate.current = false;
      updateDataBase();
    }
  }, [user]);

  return (
    <>
      <ProfileDetail purchases={true} />
    </>
  );
}
