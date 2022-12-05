import React from "react";
import H from "../styles/Home.module.css";
import Carousel from "../components/HomeCarousel";
import Cards from "../containers/Cards";
import SideMenu from "../components/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, getFiltered, clearState } from "../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  const products = useSelector(state => state.products);
  React.useEffect(() => {
    dispatch(getFiltered(products));
  }, [dispatch]);

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
          <SideMenu handleSort={handleSort} />
          <Cards />
        </div>
      </div>
    </>
  );
}
