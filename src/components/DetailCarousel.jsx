import Carousel from "react-bootstrap/Carousel";
import D from "../styles/DetailCarousel.module.css";
import { useSelector } from "react-redux";

function UncontrolledExample(props) {
  const product = useSelector(state => state.product);
  return (
    <div className={D.CarouselCont}>
      <Carousel variant="dark">
        {product.img &&
          product.img.map((el, i) => (
            <Carousel.Item key={i}>
              <div className={D.imgCont}>
                <img className={D.image} src={el} alt="First slide" />
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

export default UncontrolledExample;
