import React from "react";
import O from "../styles/OrderForm.module.css";
import { useSelector } from "react-redux";

export default function OrderForm() {
  const cart = useSelector(state => state.cart);
  const address = [
    {
      streetName: "Fake avenue",
      streetNumber: 12,
      apartment: "6A",
      zipCode: 7600,
      additionalDetailes: "Red front door",
      isDefault: true,
      location: {
        name: "Santa Cruz",
      },
    },
    {
      streetName: "Fake street",
      streetNumber: 8,
      apartment: "3A",
      zipCode: 1900,
      additionalDetailes: "Blue front door",
      isDefault: false,
      location: {
        name: "Córdoba",
      },
    },
    {
      streetName: "Fake street 2",
      streetNumber: 64,
      apartment: "2B",
      zipCode: 7105,
      additionalDetailes: "Brown front door",
      isDefault: false,
      location: {
        name: "Buenos Aires",
      },
    },
  ];
  return (
    <div className={O.container}>
      <div className={O.cartContainer}>
        <h1>Shopping cart</h1>
        {cart.map((el, i) => (
          <div key={i} className={O.cartItem}>
            <div className={O.imgContainer}>
              <img src={el.img} alt="" />
            </div>
            <h4>{el.title}</h4>
            <h5>Quantity: {el.quantity} unit</h5>
            <h6>Total: ${el.price}</h6>
          </div>
        ))}
      </div>

      {address.length && (
        <>
          <h2 className={O.yourAddress}>Your addresses</h2>
          <div className={O.addressBox}>
            <div className={O.addressContainer}>
              {address.map((el, i) => (
                <div className={O.address} key={i}>
                  <input type="radio" />
                  <span>{`Address n° ${i + 1}`}</span>
                  <p>{`${el.streetName} n° ${el.streetNumber}, ${el.location.name}, apartment ${el.apartment}, Zip Code n° ${el.zipCode}. ${el.additionalDetailes}`}</p>
                  <span className={O.default}>
                    {el.isDefault === true && `Default`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className={O.newAddressCont}>
        {/* <h1>Add a new address</h1> */}
        <div className={O.formContainer}>
          <form>
            <input type="text" placeholder="Street name" />
            <input type="number" placeholder="Street number" />
            <input type="text" placeholder="Apartment" />
            <input type="zipCode" placeholder="Zip Code" />
            <select name="location" id="location">
              <option value="">Default</option>
            </select>
            <textarea name="additional" id="" cols="30" rows="10" />
            <button type="submit">Pay my products</button>
          </form>
        </div>
      </div>
    </div>
  );
}
