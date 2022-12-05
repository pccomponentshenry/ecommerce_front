import React, { useEffect } from "react";
import S from "../styles/SideMenu.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategories,
  getFiltered,
  clearState,
  filterCategories,
  filterBrands
} from "../redux/actions/index";

export default function SideMenu(props) {
  const dispatch = useDispatch();
  const brand = useSelector(state => state.brands);
  const products = useSelector(state => state.products);
  const cat = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  return (
    <div className={S.Container}>
      <div className={S.subContainer}>
        <div className={S.categoryContainer}>
          <hr />
          <h6>Categories</h6>
          {cat.map((el, i) => (
            <>
              <div key={i}>
                <span>{el.name}</span>
                <br />
              </div>
            </>
          ))}

          <div className={S.filterContainer}>
            <hr />
            <h6>Filter by:</h6>
            <div className={S.select}>

              <select
                name="Filter"
                id="cat"
                defaultValue={"DEFAULT"}
                onChange={e => {
                  props.handleFilter(e);
                  props.setCat(e.target.value);
                }}
              >
                <option defaultValue={"DEFAULT"}>Category</option>
                {cat.map((el, i) => (
                  <option key={i}>{el.name}</option>
            </div>
            <div className={S.select}>

                ))}
              </select>
            </div>
            <div className={S.select}>

              <select
                name="Filter"
                defaultValue={"DEFAULT"}
                id="brand"
                onChange={e => {
                  props.handleFilter(e);
                  props.setBrand(e.target.value);
                }}
              >
                <option defaultValue={"DEFAULT"}>Brand</option>

                {brand.map((el, i) => (
                  <option key={i}>{el.name}</option>
                ))}
              </select>
            </div>
            <div className={S.order}>
              <hr />
              <h6>Order by price</h6>
              <button id="asc" onClick={e => props.handleSort(e)}>
                Higher to lower
              </button>
              <button id="desc" onClick={e => props.handleSort(e)}>
                Lower to higher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
