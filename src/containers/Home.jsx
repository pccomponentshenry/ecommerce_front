import React from "react";
import H from "../styles/Home.module.css";
import Carousel from "../components/HomeCarousel";

export default function Home() {
  return (
    <>
      <div className={H.carouselContainer}>
        <Carousel />
      </div>
    </>
  );
}
