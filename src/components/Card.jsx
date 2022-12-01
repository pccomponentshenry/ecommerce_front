import C from "../styles/Card.module.css";
import Pagination from "../components/Pagination";

function Card(props) {
  return (
    <>
      <div className={C.cardContainer}>
        <div className={C.imgContainer}>
          <img src={props.img} alt="" className={C.image} />
        </div>
        <div className={C.square}>
          <div className={C.nameCont}>
            <h6 className={C.name}>{props.name}</h6>
          </div>
          <h6 className={C.brand}>{props.brand}</h6>
          <div className={C.bottomCont}>
            <h6 className={C.price}>{props.price}</h6>
            <div className={C.btnAndFav}>
              <button className={C.cardBtn}>Add to cart</button>
              <span className={C.fav}>♡</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
