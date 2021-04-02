import React, { useContext } from 'react';
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from '../../App';
import buttonImage from "../../images/icons/Avatar face.png";
const Header = () => {
  const [loginUser, setLoginUser] = useContext(UserContext );

    return (
        <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col className="font-weight-bold ml-5 mt-2" style={{color:'#19103F', fontSize:'28px'}}>Book Corner</Col>
         
          <Col className="d-flex justify-content-center align-items-center mb-4 pt-2">
            <Link className="mr-5 font-weight-normal text-dark" to="/home">
              Home
            </Link>
            <Link className="mr-5 font-weight-normal text-dark" to="/orders"
            >
              Orders
            </Link>
            <Link className="mr-5 font-weight-normal text-dark" to="/admin">
              Admin
            </Link>
            <Link className="mr-5 font-weight-normal text-dark" to="/deals">
              Deals
            </Link>
        
          {/* <Col lg={4} className="pt-4"> */}
            {
              loginUser.email ? 
              <Link className="d-flex justify-content-start text-dark" to="/login">
                <div className="d-flex flex-column justify-content-center align-items-center">
                <Image src={buttonImage}  width={50}/>
                <small style={{fontSize:'10px'}}>{loginUser.email}</small>
                </div>
              </Link>
              : <Link className="d-flex justify-content-end" to="/login">  <button
                className="font-weight-bold"
                style={{
                  backgroundColor: "#8A2BE2",
                  border: "none",
                  width: "100px",
                  height: "35px",
                  borderRadius: "5px",
                  color: "#ffffff",
                }}
              >
                Log in
              </button> </Link>
            }
            </Col>
          {/* </Col> */}
        </Row>
      </Container>
    );
};

export default Header;