import React from "react";
import { Image } from "react-bootstrap";
import comingSoon from "../../images/icons/building-webpage.gif";
import Header from "../Header/Header";
const Deals = () => {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <Image width={700} src={comingSoon} />
      </div>
    </div>
  );
};

export default Deals;
