import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = (props) => {
  console.log(props.product);
  return (
    <div className="m-3">
      <Card className="p-3 d-flex justify-content-center align-items-center shadow-lg" 
      style={{ backgroundColor:'#ffffff', width:'250px', height:'400px'}}>
        <Image src={props.product.imageURL} className="w-75" ></Image>
        <div>
          <h5>{props.product.name}</h5>
          <p>{props.product.author}</p>
          
          <div className="d-flex justify-content-around align-items-center">
            <h6 style={{ color: "#8A2BE2" }}>${props.product.price}</h6>
           
            <Link to={`/orders`}>
            <button
              style={{
                backgroundColor: "#8A2BE2",
                border: "none",
                width: "100px",
                height: "35px",
                borderRadius: "5px",
                color: "#ffffff",
              }}
            >
              Buy Now
            </button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Product;
