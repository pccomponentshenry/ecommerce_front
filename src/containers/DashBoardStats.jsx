import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideDash from "../components/SideDash";
import { getAllOrdersOneByOne } from "../redux/actions";
import s from "../styles/DashBoardStats.module.css";

export default function DashBoardStats() {
  const orders = useSelector(state => state.allOrdersOneByOne);
  const dispatch = useDispatch();
  const [bestSales, setBestSales] = useState([]);
  const [latestSales, setLatestSales] = useState([]);
  const shouldUpdate = useRef(true);

  const getProductSales = () => {
    const validOrders = orders.filter(order => order.status === "completed");

    const products = validOrders.reduce((acc, order) => {
      order.orderItems.forEach(item => {
        const { productId, product } = item;
        if (acc[productId]) {
          acc[productId].quantity += item.quantity;
        } else {
          acc[productId] = { ...product, quantity: item.quantity };
        }
      });
      return acc;
    }, {});

    return Object.values(products).slice(0, 5);
  };

  const getLatestSales = () => {
    return orders
      .filter(order => order.status === "completed")
      .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
      .slice(0, 5)
      .map(order => {
        const { orderItems, purchaseDate } = order;
        return orderItems.map(item => {
          return {
            purchaseDate,
            ...item.product,
          };
        });
      })
      .flat()
      .slice(0, 5);
  };

  useEffect(() => {
    if (shouldUpdate.current) {
      shouldUpdate.current = false;
      dispatch(getAllOrdersOneByOne());
    }
  }, [dispatch]);

  useEffect(() => {
    setBestSales(getProductSales());
    setLatestSales(getLatestSales());
  }, [orders]);

  return (
    <div className={s.content}>
      <div className={s.header}>Sales statistics</div>
      <div className={s.sideContainer}>
        <SideDash />
      </div>
      <div className={s.dashBlock}>
        <div className={s.statsContainer}>
          <h2 className={s.chartTitle}>Best Sales</h2>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>SALES</th>
              </tr>
            </thead>
            {bestSales.map(p => (
              <tbody key={p.productId}>
                <tr>
                  <td>
                    <img className={s.image} src={p.img} />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.quantity}</td>
                </tr>
              </tbody>
            ))}
          </table>

          <div>
            <h2 className={s.chartTitle}>Latest Sales</h2>
            <table className={s.tabla}>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>DATE</th>
                </tr>
              </thead>

              {latestSales.map(p => (
                <tbody key={p.productId}>
                  <tr>
                    <td>
                      <img className={s.image} src={p.img} />
                    </td>
                    <td>{p.title}</td>
                    <td>{p.purchaseDate.substr(0, 10)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
