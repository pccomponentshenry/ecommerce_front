import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';


const stripePromese = loadStripe("pk_test_51MCUPjIxZNdfrxaORwUsMY8yxCPm4xhLtIsruiYWFCGr2xN6NzNOR984Z0gGfM8l8u2blkELjULUs1rbClLtmW9A00QbQXD9FC");


const handleClick = async (e) => {
    const product=[
        {
            name:"teclado 1",
            quantity:2,
            price:200,
            total:400
        },
        {
            name:"teclado 2",
            quantity:1,
            price:200,
            total:200
        },
        {
            name:"teclado 3",
            quantity:3,
            price:200,
            total:600
        },
    ]

    const productObj = {
        products:product
    }
    e.preventDefault();
    const stripe = await stripePromese
    const response = await fetch('http://localhost:3001/api/checkout',{
        method:"POST",
        body:JSON.stringify(productObj),
        headers:{
            'Content-Type':'application/json'
        }
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
        sessionId:session.id
    });
    if(result.error){

    }
    }

function Payment() {

  return (
    <div>
        <button role="link" onClick={handleClick}>
            REALIZAR PAGO
        </button>
    </div>
  )
}

export default Payment