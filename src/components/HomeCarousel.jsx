import Carousel from "react-bootstrap/Carousel";
import VR from "../Images/VR.jpg";
import HC from "../styles/HomeCarousel.module.css";
import headphones from "../Images/headphones.jpg";

function HomeCarousel() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img className={HC.image} src={VR} alt="First slide" />
          <Carousel.Caption>
            <div className={HC.caption}>
              <h3 className={HC.title}>First slide label</h3>
              <p className={HC.subtitle}>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className={HC.image} src={headphones} alt="Second slide" />

          <Carousel.Caption>
            <div className={HC.caption}>
              <h3 className={HC.title}>Second slide label</h3>
              <p className={HC.subtitle}>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className={HC.image} src={VR} alt="Third slide" />

          <Carousel.Caption>
            <div className={HC.caption}>
              <h3 className={HC.title}>Third slide label</h3>
              <p className={HC.subtitle}>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
