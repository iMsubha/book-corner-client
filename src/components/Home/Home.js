import { CircularProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Header from "../Header/Header";
import Product from "../Product/Product";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
const Home = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://limitless-harbor-36084.herokuapp.com/home")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div style={{ backgroundColor: "#F4F7FC" }}>
      <Header />
      <Row className="m-2 p-5 d-flex justify-content-center align-items-center ">
        {
          products.length === 0 && (
          <div  className={classes.root}>
            <CircularProgress />
          </div>
        )}
        {products.map((product) => (
          <Product product={product} />
        ))}
      </Row>
    </div>
  );
};

export default Home;
