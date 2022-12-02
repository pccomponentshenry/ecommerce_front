import React from "react";
import C from "../styles/CardsCreated.module.css";
import Card from "../components/Card";
export default function CardsCreated({ products }) {
  return (
    <div className={C.container}>
      {products.length > 0 ? (
        products.map((el, i) => (
          <div key={i} className={C.cardCont}>
            <Card
              name={products[i].name}
              brand={products[i].brand}
              stock={products[i].stock}
              price={products[i].price}
              img={products[i].img}
            />
          </div>
        ))
      ) : (
        <span>No products</span>
      )}
    </div>
  );
}
