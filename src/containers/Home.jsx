import React from "react";
import H from "../styles/Home.module.css";
import Carousel from "../components/HomeCarousel";
import Cards from "../containers/Cards";
import SideMenu from "../components/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  allProducts,
  getFiltered,
  clearState,
  clearError,
  getProductsByName,
} from "../redux/actions";
import NotFound from "../alerts/NotFound";
import search from "../Images/Search.png";

export default function Home() {
  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  const products = useSelector(state => state.products);
  React.useEffect(() => {
    dispatch(getFiltered(products));
  }, [dispatch]);

  const handleFilter = e => {
    dispatch(clearState());
    if (
      (e.target.id === "cat" && brand === "") ||
      (e.target.id === "cat" && brand === "DEFAULT")
    ) {
      const filtered = products.filter(
        el => el.category.name === e.target.value
      );
      if (filtered.length > 0) dispatch(getFiltered(filtered));
    } else if (
      (e.target.id === "brand" && cat === "") ||
      (e.target.id === "brand" && cat === "DEFAULT")
    ) {
      const filtered = products.filter(el => el.brand.name === e.target.value);
      if (filtered.length > 0) dispatch(getFiltered(filtered));
    }
  };

  React.useEffect(() => {
    if (cat !== "" && brand !== "" && cat !== "Category" && brand !== "Brand") {
      dispatch(clearState());
      const filtered = products.filter(el => el.category.name === cat);
      const both = filtered.filter(el => el.brand.name === brand);
      if (filtered.length > 0) dispatch(getFiltered(both));
    }
    if (cat === "Category" && brand !== "") {
      const filtered = products.filter(el => el.brand.name.includes(brand));
      if (filtered.length > 0) dispatch(getFiltered(filtered));
    }

    if (brand === "Brand" && cat !== "") {
      const filtered = products.filter(el => el.category.name == cat);
      if (filtered.length > 0) dispatch(getFiltered(filtered));
    }
    if (brand === "Brand" && cat === "Category") {
      dispatch(getFiltered(products));
    }
  }, [cat, brand]);

  function handleInputChange(e) {
    clearError();
    e.preventDefault();
    setName(e.target.value);
    dispatch(getProductsByName(name));
    setCurrentPage(1);
  }

  return (
    <>
      <div>
        <div className={H.carouselContainer}>
          <Carousel />
        </div>
        <div className={H.CardsAndMenuContainer}>
          <SideMenu
            handleFilter={handleFilter}
            setCat={setCat}
            setBrand={setBrand}
            setName={setName}
          />
          <div className={H.searchBarCont}>
            <div className={H.searchBar}>
              <img className={H.searchIcon} src={search} />
              <input
                type="text"
                placeholder="Search"
                id="name"
                autoComplete="off"
                value={name}
                onChange={e => handleInputChange(e)}
              />
            </div>
          </div>
          <Cards currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  );
}
