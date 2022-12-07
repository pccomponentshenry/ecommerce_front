import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";

export default function CartItem({data,deleteFromCart}){
    const {id,title,img,brand,price,quantity}=data
    console.log(brand);    
   return(
    // estilos solo para ver resultado
    <div style={{border:"thin solid gray", color:"white"}}>
         {/* <Card style={{ width: "12rem", top:"300px",left:"50%" }}></Card>
         {/* <Card.Img variant="top" src={img} /> */}
         {/* <Card.Body style={{ width: "12rem", top:"300px",left:"50%" }}>
         <Card.Title
            style={{ color: "white", fontWeight: 600, fontSize: "16px" }}
          >
            {title}
          </Card.Title> */}
          
          {/* <Card.Text style={{ color: "white", fontWeight: 400 }}>
            {brand.name}
          </Card.Text>
          <Card.Text style={{ color: "white", fontWeight: 400 }}>
            {price}
          </Card.Text> */}
            
         {/* </Card.Body> */} 
         <h4>{title}</h4>
         <h5>${price}x{quantity}=${quantity*price}</h5>


         <button onClick={()=>deleteFromCart(id)}>Delete One</button>
         <button onClick={()=>deleteFromCart(id,true)}>Delete All</button>
    </div>
   )
}