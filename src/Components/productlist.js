import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import axios from "axios";


export function ProductList (){
    const [loggedIn, setLoggedIn] = useState("false");
    const [data, setData] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {

        if (
                sessionStorage.getItem("isActive") != null &&
                sessionStorage.getItem("isActive") === "true"
        ) {
          setLoggedIn(true);
          fetch("http://localhost:9800/product/list")
            .then((response) => response.json())
            .then((data) => setData(data));
        } else {
          setLoggedIn(false);
          alert("You are not authenticated!");
          navigate('/');
        }
      }, [data]);

      console.log(data);

      const handleDelete = (proId)=>{
        axios.delete(`http://localhost:9800/product/delete/${proId}`,) 
            .then(() => {
                console.log("Deleted");
                alert("DELETED");
            })
            .catch(err => console.log(err))
      };

      const handleLogout = ()=>{
            sessionStorage.setItem("userName", null);
            sessionStorage.setItem("isActive", false);
            setLoggedIn(false);
      };

    return(
        <>
            <Container>
            {loggedIn ? (
            <div>
              <h1>Product List</h1>
                <Table striped  sm bordered hover >
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price Per Unit</th>
                    <th>Quantity in kg</th>
                    <th>Number of Units</th>
                    <th></th>
                  </tr>
                </thead>
                
                <tbody>
                {data.map(item => (
                  <tr>
                    <td>{item.proId}</td>
                    <td>{item.ProName}</td>
                    <td>{item.Description}</td>
                    <td>{item.PricePerUnit}</td>
                    <td>{item.Quantityinkg}</td>
                    <td>{item.noofunits}</td>
                    <td><Link to={`/update/${item.proId}`}>Edit</Link></td>
                    <td><Button onClick={() => handleDelete(item.proId)}>Delete</Button></td>
                  </tr>
                ))}
                </tbody> 
                <td><Link to={`/add-product`}>Add Product</Link></td>
              </Table>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
            ) : (
                navigate('/')
            )}
            </Container>
        </>
    );
}