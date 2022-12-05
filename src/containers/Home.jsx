import React from "react";
import H from "../styles/Home.module.css";
import Carousel from "../components/HomeCarousel";
import Cards from "../containers/Cards";
import SideMenu from "../components/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, getFiltered, clearState } from "../redux/actions";
import { useState } from "react";

export default function Home() {
  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");

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
      console.log(cat, brand);
      dispatch(clearState());
      const filtered = products.filter(el => el.category.name === cat);
      const both = filtered.filter(el => el.brand.name === brand);
      if (filtered.length > 0) dispatch(getFiltered(both));
      // dispatch(getFiltered(both));
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

  const handleSort = e => {
    if (e.target.id === "asc") {
      dispatch(clearState());
      let productsSortPriceAsc = products.sort(function (b, a) {
        if (parseInt(a.price) > parseInt(b.price)) {
          return 1;
        }
        if (parseInt(a.price) < parseInt(b.price)) {
          return -1;
        }
        return 0;
      });
      dispatch(getFiltered(productsSortPriceAsc()));
    }

    if (e.target.id === "desc") {
      dispatch(clearState());
      let productsSortPriceDesc = products.sort(function (a, b) {
        if (parseInt(a.price) > parseInt(b.price)) {
          return 1;
        }
        if (parseInt(a.price) < parseInt(b.price)) {
          return -1;
        }
        return 0;
      });
      dispatch(getFiltered(productsSortPriceDesc()));
    }
  };
  return (
    <>
      <div>
        <div className={H.carouselContainer}>
          <Carousel />
        </div>
        <div className={H.CardsAndMenuContainer}>
          <SideMenu
            handleSort={handleSort}
            handleFilter={handleFilter}
            setCat={setCat}
            setBrand={setBrand}
          />
          <Cards />
        </div>
      </div>
    </>
  );
}
