import React, { useEffect, useState } from "react";
import S from "../styles/SideMenu.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  filterProducts,
  getBrands,
  getCategories,
  getFiltered,
} from "../redux/actions/index";

export default function SideMenu(props) {
  const dispatch = useDispatch();
  const brands = useSelector(state => state.brands);
  const categories = useSelector(state => state.categories);
  const filtered = useSelector(state => state.filtered);
  const products = useSelector(state => state.products);
  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState({ min: 0, max: 100000000 });
  const [priceError, setPriceError] = useState("");
  const regexFloat = /^\d*\.?\d*$/;

  const handleSort = event => {
    const ascDesc = event.target.id;
    const sorted = [...filtered].sort((a, b) => {
      if (a.price === null) return 1;
      else if (b.price === null) return -1;
      else if (a.price === b.price) return 0;
      return ascDesc === "asc"
        ? a.price > b.price
          ? 1
          : -1
        : a.price < b.price
        ? 1
        : -1;
    });
    dispatch(getFiltered(sorted));
  };

  const handlePriceChange = event => {
    if (!regexFloat.test(event.target.value) || event.target.value < 0) {
      setPriceError("Please provide a valid number");
    } else {
      setPriceError("");
      setPrice(prev => ({ ...prev, [event.target.id]: event.target.value }));
    }
  };

  const handlePriceSubmit = () => {
    dispatch(filterProducts(cat, brand, price));
  };

  const clearFilters = () => {
    dispatch(clearError());
    dispatch(getFiltered(products));
    document.querySelectorAll("input[type=text]").forEach(element => {
      element.value = "";
    });
    setBrand("");
    setCat("");
    props.setName("");
    setPrice(prev => ({ ...prev, min: 0, max: 100000000 }));
    document.querySelectorAll("select")[0].selectedIndex = 0;
    document.querySelectorAll("select")[1].selectedIndex = 0;
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(filterProducts(cat, brand, price));
  }, [cat, brand]);

  return (
    <div className={S.Container}>
      <div className={S.subContainer}>
        <div className={S.categoryContainer}>
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
                <option defaultValue={"default"} disabled>
                  Category
                </option>
                {categories.map((el, i) => (
                  <option key={i} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={S.select}></div>

            <div className={S.select}>
              <select
                name="Filter"
                defaultValue={"default"}
                id="brand"
                onChange={e => {
                  setBrand(e.target.value);
                }}
              >
                <option defaultValue={"default"} disabled>
                  Brand
                </option>
                {brands.map((el, i) => (
                  <option key={i} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
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

            <div className={S.sharedInput}>
              <hr />
              <div className={S.label}>Price range</div>
              <input
                key="min_price"
                id="min"
                type="text"
                name="min_price"
                placeholder="Min"
                onBlur={handlePriceChange}
                className={S.inputSmall}
              />
              <input
                key="max_price"
                id="max"
                type="text"
                name="max_price"
                placeholder="Max"
                onBlur={handlePriceChange}
                className={`${S.inputSmall} ${S.inputRight}`}
              />
              <button className={S.button} onClick={handlePriceSubmit}>
                &#8680;
              </button>
              {priceError && <span>{priceError}</span>}
            </div>
            <div className={S.clearFilters}>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
