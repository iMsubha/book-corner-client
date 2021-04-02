import axios from "axios";
import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
const AddProducts = () => {
  const [imageURL, setImageURL] = useState(null);
  const { register, handleSubmit } = useForm();
  const [loginUser, setLoginUser] = useContext(UserContext);
 
  const inputStyle = { width: "250px" };
  const onSubmit = (data) => {
    const eventData = {
      name: data.name,
      price: data.price,
      author: data.author,
      imageURL: imageURL,
      quantity: data.quantity
    };
    const newUser = { ...eventData, ...loginUser };
    console.log(newUser);
    const url = "https://limitless-harbor-36084.herokuapp.com/addProduct";
    console.log(url);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((res) => console.log("server side respons", res));
  };
  const handleImageUpload = (e) => {
    // console.log(e.target.files[0])
    const imageData = new FormData();
    imageData.set("key", "f322a4264355d7548e0f8598bdb7ed83");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <h3>Add Book Details</h3>
      <Container xs={8} className="p-4" style={{ backgroundColor: "#F4F7FC" }}>
        <form
          action="/addProduct"
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg d-flex flex-column"
        >
          <div className="d-flex">
            <div className="p-4 ">
              <div className="mb-2">
                <label className="font-weight-bold" for="name">
                  Book Name
                </label>{" "}
                <br />
                <input
                  style={inputStyle}
                  name="name"
                  placeholder="Enter Book Name"
                  defaultValue=""
                  ref={register}
                />
                <br />
              </div>
              <div className="mb-2">
                <label className="font-weight-bold">Price</label> <br />
                <input
                  style={inputStyle}
                  name="price"
                  placeholder="Enter Price"
                  defaultValue=""
                  ref={register}
                />
                <br />
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <label className="font-weight-bold">Author Name</label> <br />
                <input
                  
                  style={inputStyle}
                  name="author"
                  placeholder="Enter Author name"
                  defaultValue=""
                  ref={register}
                />
                <br />
              </div>
              <div className="mb-2">
                <label className="font-weight-bold">Quantity</label> <br />
                <input
                  style={inputStyle}
                  name="quantity"
                  placeholder="Quantity"
                  defaultValue=""
                  ref={register}
                />
                <br />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column pl-4">
            <div>
              <label className="font-weight-bold">Add Book Cover Photo</label>{" "}
              <br />
              <input
                style={inputStyle}
                name="exampleRequired"
                type="file"
                defaultValue=""
                onChange={handleImageUpload}
              />
              <br />
            </div>
            <div className="d-flex justify-content-end p-4">
              
              {/* <Link to={`/home`}> */}
              <input
                style={{
                  backgroundColor: "#8A2BE2",
                  border: "none",
                  width: "150px",
                  height: "35px",
                  borderRadius: "5px",
                  color: "#ffffff",
                }}
                className="mt-1 mb-3 "
                type="submit"
                value="Save"
              />
              {/* </Link> */}
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AddProducts;
