import React, { useEffect, useState } from "react";
import S from "../styles/SideMenu.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  filterProducts,
  getBrands,
  getCategories,
  setFiltered,
} from "../redux/actions/index";

export default function SideMenu({ name, setName }) {
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
    dispatch(setFiltered(sorted));
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
    dispatch(filterProducts(cat, brand, price, name));
  };

  const clearFilters = () => {
    dispatch(clearError());
    document.querySelectorAll("input[type=text]").forEach(element => {
      element.value = "";
    });
    document.querySelectorAll("select").forEach(element => {
      element.selectedIndex = 0;
    });
    setBrand("");
    setCat("");
    setName("");
    setPrice(prev => ({ ...prev, min: 0, max: 100000000 }));
    dispatch(setFiltered(products));
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(filterProducts(cat, brand, price, name));
  }, [cat, brand]);

  return (
    <div className={S.Container}>
      <div className={S.subContainer}>
        <div className={S.categoryContainer}>
          <div className={S.filterContainer}>
            <div className={S.selectCont}>
              <h5 className={S.filterByTitle}>Filter by:</h5>
              <div className={S.select}>
                <select
                  name="Filter"
                  id="cat"
                  defaultValue={"default"}
                  onChange={e => {
                    setCat(e.target.value);
                  }}
                >
                  <option value={"default"} disabled>
                    Category
                  </option>
                  {categories.map((el, i) => (
                    <option key={i} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={S.select}>
                <select
                  className={S.brand}
                  name="Filter"
                  defaultValue={"default"}
                  id="brand"
                  onChange={e => {
                    setBrand(e.target.value);
                  }}
                >
                  <option value={"default"} disabled>
                    Brand
                  </option>
                  {brands.map((el, i) => (
                    <option key={i} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={S.order}>
              <h5 className={S.orderPriceTitle}>Order by price</h5>
              <div className={S.btnCont}>
                <button id="desc" onClick={handleSort}>
                  Higher
                </button>
                <button id="asc" onClick={handleSort}>
                  Lower
                </button>
              </div>
            </div>

            <div className={S.sharedInput}>
              <h5 className={S.label}>Price range</h5>
              <input
                key="min_price"
                id="min"
                type="text"
                name="min_price"
                placeholder="Min"
                onBlur={handlePriceChange}
                className={`${S.inputSmall} ${S.inputLeft}`}
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
              <button onClick={handlePriceSubmit}>➜</button>
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
