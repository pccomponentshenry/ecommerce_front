import React, { useEffect } from "react";
import S from "../styles/SideMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategories,
  filterCategories,
  filterBrands,
} from "../redux/actions/index";

export default function SideMenu() {
  const dispatch = useDispatch();
  const brand = useSelector(state => state.brands);
  const cat = useSelector(state => state.categories);

  //console.log(brand);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  function handleOnChangeCat(e) {
    e.preventDefault();
    dispatch(filterCategories(e.target.value));
  }

  function handleOnChangeBrand(e) {
    e.preventDefault();
    dispatch(filterBrands(e.target.value));
  }

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
                type="option"
                onChange={e => handleOnChangeCat(e)}
              >
                <option value="ALLCAT">Category</option>
                {cat?.map((el, i) => (
                  <option key={i} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={S.select}>
              <select
                name="Filter"
                type="option"
                onChange={e => handleOnChangeBrand(e)}
              >
                <option value="ALLBRAND">Brands</option>
                {brand.map((el, i) => (
                  <option key={i} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={S.order}>
              <hr />
              <h6>Order by price</h6>
              <button>Higher to lower</button>
              <button>Lower to higher</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
