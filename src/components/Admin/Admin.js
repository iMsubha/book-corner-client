import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import manageIcon from '../../images/icons/grid 1.png';
import plusIcon from "../../images/icons/plus 1.png";
import AddProducts from "../AddProducts/AddProducts";
import Header from "../Header/Header";
import ManageBook from "../ManageBook/ManageBook";
const Admin = () => {
  const [manageBook, setManageBook] = useState(false);
  const [addProducts, setAddProducts] = useState(true);
  const handleManageBook = () => {
    setManageBook(true);
    setAddProducts(false);
  };
  const handleAddProducts = () => {
    setAddProducts(true);
    setManageBook(false);
  };

  return (
    <div>
      <Header />
      <Row  className="d-flex ">
        <Col lg={4} sm={12} style={{ minHeight: 'calc(100vh - 65px)', backgroundColor:'#19103F'}}
         className="d-flex flex-column text-capitalize  rounded-lg ml-4">
          <Link className="d-flex align-items-center text-white pt-5 pl-3 m-l-3 font-weight-bold" onClick={handleManageBook} to="/admin/manageBooks">
            <Image src={manageIcon} width={20}/>
            Manage books
          </Link>
          <Link className="d-flex align-items-center text-white p-3 m-l-3 font-weight-bold" onClick={handleAddProducts} to="/admin/addProducts">
          <Image src={plusIcon} width={20}/>
            Add Book
          </Link>
        </Col>
        <Col>
          {addProducts && <AddProducts />}
          {manageBook && <ManageBook />}
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
