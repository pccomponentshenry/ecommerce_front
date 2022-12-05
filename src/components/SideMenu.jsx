import React, { useEffect } from "react";
import S from "../styles/SideMenu.module.css";
import { useDispatch } from "react-redux";
import { getBrands,allProducts,orderByPriceHL,orderByPriceLH } from "../redux/actions/index";

export default function SideMenu() {
  const dispatch = useDispatch();
  //const brand = useSelector((state) => state.brand);
  //console.log(brand);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(allProducts())
  }, [dispatch]);

  const category = [
    "Keyboards",
    "Mouse",
    "Switches",
    "Mouse Pads",
    "Batteries",
    "Chargers",
  ];
  return (
    <div className={S.Container}>
      <div className={S.subContainer}>
        <div className={S.categoryContainer}>
          <hr />
          <h6>Categories</h6>
          {category.map((el, i) => (
            <>
              <div key={i}>
                <span>{el}</span>
                <br />
              </div>
            </>
          ))}

          <div className={S.filterContainer}>
            <hr />
            <h6>Filter by:</h6>
            <div className={S.select}>
              <select name="Filter" defaultValue={"DEFAULT"}>
                <option defaultValue={"DEFAULT"}>Category</option>
                {category.map((el, i) => (
                  <option key={i}>{el}</option>
                ))}
              </select>
            </div>
            <div className={S.select}>
              <select name="Filter" defaultValue={"DEFAULT"}>
                <option defaultValue={"DEFAULT"}>Brand</option>
                {category.map((el, i) => (
                  <option key={i}>{el}</option>
                ))}
              </select>
            </div>
            <div className={S.order}>
              <hr />
              <h6>Order by price</h6>
              <button onClick={()=>dispatch(orderByPriceHL())}>Higher to lower</button>
              <button onClick={()=>dispatch(orderByPriceLH())}>Lower to higher</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
