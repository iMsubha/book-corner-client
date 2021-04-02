import React, { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { UserContext } from "../../App";
import Header from "../Header/Header";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loginUser, setLoginUser] = useContext(UserContext);
  useEffect(() => {
    fetch("https://limitless-harbor-36084.herokuapp.com/products?email=" + loginUser.email)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [loginUser.email]);

   let total = 0; 
   orders.forEach(order => {
     total  += order.quantity * order.price;
    });
  //console.log(total)
  
  return (
    <div>
     
      <Header />
      <Container className="d-flex flex-column justify-content-center" fluid>
        <h3 className="ml-5 font-weight-bold" style={{ color: "#8A2BE2" }}>
          Check Out
        </h3>
        <Card className="m-5 shadow-md rounded-lg">
          <Table responsive=" sm md xl">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            {orders.map((order) => (
              <tbody>
                <tr>
                  <td>{order.name}</td> <td>{order.author}</td>{" "}
                  <td>{order.quantity}</td>
                  <td>${order.price}</td>{" "}
                </tr>
              </tbody>
            ))}
            <tfoot>
              <tr>
                <td className="font-weight-bold">Total</td>
                <td></td>
                <td></td>
                <td  className="font-weight-bold">${total}</td>
              </tr>
            </tfoot>
          </Table>
        </Card>
        <button
          className="ml-auto mr-5"
          style={{
            backgroundColor: "#8A2BE2",
            border: "none",
            width: "100px",
            height: "35px",
            borderRadius: "5px",
            color: "#ffffff",
          }}
        >
          Check out
        </button>
      </Container>
    </div>
  );
};

export default Orders;
