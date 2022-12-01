import React from "react";
import H from "../styles/Home.module.css";
import Carousel from "../components/HomeCarousel";
import Cards from "../containers/Cards";
import SideMenu from "../components/SideMenu";

export default function Home() {
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
