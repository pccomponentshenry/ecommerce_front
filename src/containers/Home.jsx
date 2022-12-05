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

  return (
    <>
      <div>
        <div className={H.carouselContainer}>
          <Carousel />
        </div>
        <div className={H.CardsAndMenuContainer}>
          <SideMenu />
          <Cards />
        </div>
      </div>
    </>
  );
}
