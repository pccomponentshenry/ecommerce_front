import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/HomeCarousel";
import Cards from "../containers/Cards";
import SideMenu from "../components/SideMenu";
import Banned from "../alerts/Banned";
import { useNavigate } from "react-router-dom";
import {
  allProducts,
  setFiltered,
  clearError,
  filterProducts,
  getLocations,
} from "../redux/actions";
import search from "../Images/Search.png";
import H from "../styles/Home.module.css";
import Bot from "../components/Bot";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  if (user.status === "banned") {
    navigate("/banned");
  }

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFiltered(products));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  function handleInputChange(e) {
    e.preventDefault();
    setCurrentPage(1);
    clearError();
    dispatch(
      filterProducts("", "", { min: 0, max: 100000000 }, e.target.value)
    );
    setName(e.target.value);
  }

  return (
    <>
      <div>
        {products.length > 0 ? (
          <div>
            <div className={H.carouselContainer}>
              <Carousel />
            </div>
            <div className={H.CardsAndMenuContainer}>
              {user.status === "banned" ? (
                <br />
              ) : (
                <SideMenu name={name} setName={setName} />
              )}
              {user.status === "banned" ? (
                <br />
              ) : (
                <div className={H.searchBarCont}>
                  <div className={H.searchBar}>
                    <img className={H.searchIcon} src={search} />
                    
                    <input
                      type="text"
                      placeholder="Search"
                      id="name"
                      autoComplete="off"
                      value={name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {user.status === "banned" ? (
                <br />
              ) : (
                <div>

                  <Cards
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                  <Bot/>
                  
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className={H.loadingCont}>
              <img
                src="https://res.cloudinary.com/dbtekd33p/image/upload/v1671166263/cqws5x8n/transparent_lfmu00.gif"
                alt=""
              />
            </div>
            <div className={H.loadingBackground}></div>
          </div>
        )}
      </div>
    </>
  );
}
