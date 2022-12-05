import C from "../styles/Card.module.css";
// export default Card;
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardComponent(props) {
  return (
    <>
      {/* <div className={C.cardContainer}>
        <div className={C.imgContainer}>
          <img src={props.img} alt="" className={C.image} />
        </div>
        <div className={C.square}>
          <div className={C.nameCont}>
            <h6 className={C.name}>{props.title}</h6>
          </div>
          <h6 className={C.brand}>{props.brand}</h6>
          <div className={C.bottomCont}>
            <h6 className={C.price}>$ {props.price}</h6>
            <div className={C.btnAndFav}>
              <button className={C.cardBtn}>Add to cart</button>
              <span className={C.fav}>♡</span>
            </div>
          </div>
        </div>
      </div> */}

      <Card style={{ width: "12rem" }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title
            style={{ color: "#272727", fontWeight: 600, fontSize: "16px" }}
          >
            {props.title}
          </Card.Title>
          <Card.Text style={{ color: "black", fontWeight: 400 }}>
            {props.brand}
          </Card.Text>
          <Button variant="dark">Add to cart</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardComponent;
