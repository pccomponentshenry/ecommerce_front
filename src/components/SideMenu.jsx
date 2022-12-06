import React, { useEffect, useState } from "react";
import S from "../styles/SideMenu.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  getBrands,
  getCategories,
  getFiltered,
  clearState,
  filterCategories,
  filterBrands,
} from "../redux/actions/index";

export default function SideMenu() {
  const dispatch = useDispatch();
  const brands = useSelector(state => state.brands);
  const categories = useSelector(state => state.categories);
  const filtered = useSelector(state => state.filtered);
  const products = useSelector(state => state.products);
  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(filterProducts(cat, brand));
  }, [cat, brand]);

  const handleSort = (event) => {
    const ascDesc = event.target.id;
    const sorted = [...filtered].sort((a, b) => {
      if (a.price === null) return 1;
      else if (b.price === null) return -1;
      else if (a.price === b.price) return 0;
      return ascDesc === 'asc' ? (a.price > b.price ? 1 : -1) : (a.price < b.price ? 1 : -1);
    });
    dispatch(getFiltered(sorted));
  }

  const clearFilters = () => {
    dispatch(getFiltered(products));
    document.querySelector('input[type=text]').value = '';
    document.querySelectorAll('select')[0].selectedIndex = 0;
    document.querySelectorAll('select')[1].selectedIndex = 0;
  }

  useEffect(() => {
    document.querySelector('input[type=text]').value = '';
  }, [clearFilters])

  return (
    <div className={S.Container}>
      <div className={S.subContainer}>
        <div className={S.clearFilters}><button onClick={clearFilters}>Clear Filters</button></div>
        <div className={S.categoryContainer}>
          {/*<hr />
           <h6>Categories</h6>
          {categories.map((el, i) => (
            <>
              <div className={S.catCont} key={i}>
                <span>{el.name}</span>
                <br />
              </div>
            </>
          ))} */}

          <div className={S.filterContainer}>
            <hr />
            <h6>Filter by:</h6>
            <div className={S.select}>
              <select
                name="Filter"
                id="cat"
                defaultValue={"default"}
                onChange={e => {
                  setCat(e.target.value);
                }}
              >

            <div className={S.select}></div>
                <option value="default" disabled>Category</option>
                {categories.map((el, i) => (
                  <option key={i} value={el.id}>{el.name}</option>
                ))}
              </select>
            </div>

            <div className={S.select}>
              <select
                name="Filter"
                defaultValue={"default"}
                id="brand"
                onChange={e => {
                  setBrand(e.target.value);
                }}
              >
                <option value="default" disabled>Brand</option>
                {brands.map((el, i) => (
                  <option key={i} value={el.id}>{el.name}</option>
                ))}
              </select>
            </div>

          </div>

          <div className={S.order}>
            <hr />
            <h6>Order by price</h6>
            <button id="desc" onClick={handleSort}>
              Higher to lower
            </button>
            <button id="asc" onClick={handleSort}>
              Lower to higher
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
