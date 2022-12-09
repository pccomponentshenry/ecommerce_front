import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import'bootswatch/dist/lux/bootstrap.min.css'
import axios from 'axios';
import { useState } from 'react';

const stripePromese=loadStripe("pk_test_51MCUPjIxZNdfrxaORwUsMY8yxCPm4xhLtIsruiYWFCGr2xN6NzNOR984Z0gGfM8l8u2blkELjULUs1rbClLtmW9A00QbQXD9FC");

const CheckOutForm = () =>{
    const [loading, setloading] = useState(false)
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod}= await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)
        })
        setloading(true);
        if(!error){
            const {id} = paymentMethod;
            const {data} = await axios.post('http://localhost:3001/api/checkout',{
                id,
                amount:200
            })
            console.log(data);
            elements.getElement(CardElement).clear();
        }
        setloading(false);
    }

    return <form onSubmit={handleSubmit} className="card-body">

        <div className='form-group'>
          <CardElement className='form-control'/>
        </div>

        <button className='btn btn-success' disabled={!stripe}>
            {loading ? (<div class="spinner-border text-light" role="status">
            </div>):"Buy"}
        </button>
    </form>
}
function Payment() {
  return (
    <Elements stripe={stripePromese}>
        <div className="container p-4">
            <div className="row my-5 justify-content-center">
                <div className="col-md-4 offset-md-4">
                    <CheckOutForm/>
                </div>
            </div>
        </div>
    </Elements>
  )
}

export default Payment