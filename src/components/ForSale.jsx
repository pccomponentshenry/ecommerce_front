import React from "react";
import S from "../styles/ForSale.module.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { deleteProduct } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function ForSale() {
  const products = useSelector(state => state.products);
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const myProducts = products.filter(p => p.creator === user.nickname);

  function handleDelete(e) {
    dispatch(deleteProduct(e));
    alert("Product has been removed successfully");
  }

  const productsForSale = [
    {
      id: 52,
      creator: "admin",
      title:
        "Silverstone FT01S-W Aluminum ATX Mid Tower Uni-Body Computer Case With Window Side Panel - Retail (Silver)",
      img: "https://images-na.ssl-images-amazon.com/images/I/41RQ9NHDUBL._SL600_.jpg",
      price: 189.99,
      description: "FT01S-W",
      stock: 98,
      categoryId: 1,
      brandId: 73,
      status: "Active",
      category: {
        name: "Case",
      },
      brand: {
        name: "SilverStone Technology",
      },
    },
    {
      id: 53,
      creator: "admin",
      title: "CORSAIR Carbide AIR 540 ATX Cube Case",
      img: "https://images-na.ssl-images-amazon.com/images/I/413pnWERvOL._SL600_.jpg",
      price: 369.99,
      description: "CC-9011030-WW",
      stock: 302,
      categoryId: 1,
      brandId: 18,
      status: "Active",
      category: {
        name: "Case",
      },
      brand: {
        name: "Corsair",
      },
    },
    {
      id: 54,
      creator: "admin",
      title: "Cooler Master RC-130-KKN1 Elite 130",
      img: "https://images-na.ssl-images-amazon.com/images/I/51ji1521AYL._SL600_.jpg",
      price: 64.99,
      description: "RC-130-KKN1",
      stock: 119,
      categoryId: 1,
      brandId: 17,
      status: "Active",
      category: {
        name: "Case",
      },
      brand: {
        name: "Cooler Master",
      },
    },
    {
      id: 55,
      creator: "admin",
      title:
        "Silverstone Extended-ATX Tek Aluminum Full Tower Computer Case, Black FT04B-W",
      img: "https://images-na.ssl-images-amazon.com/images/I/41Mr-WLCpwL._SL600_.jpg",
      price: 239.99,
      description: "FT04B-W",
      stock: 286,
      categoryId: 1,
      brandId: 73,
      status: "Active",
      category: {
        name: "Case",
      },
      brand: {
        name: "SilverStone Technology",
      },
    },
  ];
  // const myProducts = productsForSale;

  return (
    <div>
      {myProducts.length > 0 ? (
        myProducts.map((el, i) => (
          <div className={S.cardContainer} key={i}>
            <div className={S.container}>
              <div className={S.imgCont}>
                <img src={el.img} alt="" />
              </div>

              <div className={S.titleCont}>
                <span>{el.category.name}</span>
                <h4>{el.title}</h4>
                <h5>{el.brand.name}</h5>
                <p>${el.price}</p>
                <div className={S.stockAndStatus}>
                  <label>Stock: {el.stock}</label>
                  <label>{el.status}</label>
                </div>
                <div className={S.btnContainer}>
                  <Link to={"/update/" + el.id}>
                    <button>Update</button>
                  </Link>
                  <button onClick={e => handleDelete(el.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={S.noProductsCont}>
          <h5>You don't have any products for sale yet</h5>
          <Link to="/sell" style={{ textDecoration: "none", color: "#fff" }}>
            <span>Publish now!</span>{" "}
          </Link>
        </div>
      )}
    </div>
  );
}
