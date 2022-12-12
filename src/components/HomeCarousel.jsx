import Carousel from "react-bootstrap/Carousel";
import VR from "../Images/VR.jpg";
import HC from "../styles/HomeCarousel.module.css";
import headphones from "../Images/headphones.jpg";

function HomeCarousel() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <div className={HC.imageCont}>
            <img
              className={HC.image}
              src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670798737/cqws5x8n/vr_jclrwm.jpg"
              alt="Third slide"
            />
          </div>
          <Carousel.Caption>
            <div className={HC.caption}>
              <h3 className={HC.title}>Feel the experience of VR </h3>
              <p className={HC.subtitle}>
                Change your gaming experience with OWO's haptic gaming system
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={HC.imageCont}>
            <img
              className={HC.image}
              src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670799069/cqws5x8n/microphone_v3chtm.jpg"
              alt="Third slide"
            />
          </div>

          <Carousel.Caption>
            <div className={HC.caption}>
              <h3 className={HC.title}>The best Mic for your videos</h3>
              <p className={HC.subtitle}>
                We have the best recording microphones from the biggest brands
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={HC.imageCont}>
            <img
              className={HC.image}
              src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670798389/cqws5x8n/headphones_o4iddc.jpg"
              alt="Third slide"
            />
          </div>
          <Carousel.Caption>
            <div className={HC.captionHeadphones}>
              <h3 className={HC.title}>Headphones to shut out the world</h3>
              <p className={HC.subtitle}>
                The best wireless noise-cancelling headphones
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
