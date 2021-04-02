import React, { useEffect, useState } from 'react';
import { Container, Image, Table } from 'react-bootstrap';
import deleteIcon from '../../images/icons/Group 33150.png';
const ManageBook = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
     fetch('https://limitless-harbor-36084.herokuapp.com/home')
     .then((res) => res.json())
     .then((data) => setProducts(data))
  },[])
   const deleteProduct =(event, id)=>{
     console.log(event.target.parentNode)
     fetch(`https://limitless-harbor-36084.herokuapp.com/delete/${id}`,{
       method: 'DELETE'
     }).then((res) => res.json())
     .then(result =>{
       if(result){
        event.target.parentNode.style.display = 'none';
       }
     })
     

   }

    return (
      <Container className="p-4" style={{ backgroundColor: "#F4F7FC" }}>
       <Table responsive="sm">
    <thead>
      <tr>   
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    {
      products.map((product) =>(
        <tbody>
      <tr>
        <td>{product.name}</td>
        <td>{product.author}</td>
        <td>{product.price}</td>
        <td className="d-flex justify-content-center">
          <Image  onClick={(event) =>deleteProduct(event, product._id)} 
          src={deleteIcon} width={20}/>
        </td>
      </tr>
    </tbody>
      ))
    }
   
  </Table>

      </Container>
    );
};

export default ManageBook;