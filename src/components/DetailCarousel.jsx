import Carousel from "react-bootstrap/Carousel";
import D from "../styles/DetailCarousel.module.css";

function UncontrolledExample(props) {
  return (
    <div className={D.CarouselCont}>
      <Carousel variant="dark">
        {props.img.length > 0 &&
          props.img.map((el, i) => (
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
