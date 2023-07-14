import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export function UpdateProduct() {
    const [loggedIn, setLoggedIn] = useState("false");
    const {proId}=useParams();
    const [values, setValue]= useState(
        {
            proId:proId,
            proname:'',
            description:'',
            priceperunit:'',
            quantityinkg:'',
            noofunits:''
        }
    );

    useEffect(()=>{
        if (
            sessionStorage.getItem("isActive") != null &&
            sessionStorage.getItem("isActive") === "true"
        ) {
            setLoggedIn(true);

            axios.get(`http://localhost:9800/product/${proId}`) 
            .then(res => {
                console.log(res.data[0]);
                
                setValue({...values, proname:res.data[0].ProName, description:res.data[0].Description, priceperunit:res.data[0].PricePerUnit,
                    quantityinkg:res.data[0].Quantityinkg, noofunits:res.data[0].noofunits});
            })
            .catch(err => console.log(err))

        } else {
            setLoggedIn(false);
            alert("You are not authenticated!");
            navigate('/login');
          }
    },[]);

    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:9800/product/update/'+proId, values)
        .then(res => {
            navigate('/product/list');
        })
        .catch(err => console.log(err))
    }
  return (
    <>
     <h1>Update Product</h1>
        <Container style={{ width: '70rem', marginTop: '1rem', marginBottom: '1rem'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="proname">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="proname"
                    value={values.proname}
                    onChange={e => setValue({...values, proname:e.target.value})}
                />
                </Form.Group>

                <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={e => setValue({...values, description:e.target.value})}
                />
                </Form.Group>

                <Form.Group controlId="priceperunit">
                <Form.Label>Price Per Unit</Form.Label>
                <Form.Control
                    required
                    type="number"
                    name="priceperunit"
                    value={values.priceperunit}
                    onChange={e => setValue({...values, priceperunit:e.target.value})}
                />
                </Form.Group>

                <Form.Group controlId="quantityinkg">
                <Form.Label>Quantity in KG</Form.Label>
                <Form.Control
                    required
                    type="number"
                    name="quantityinkg"
                    value={values.quantityinkg}
                    onChange={e => setValue({...values, quantityinkg:e.target.value})}
                />
                </Form.Group>

                <Form.Group controlId="noofunits">
                <Form.Label>Number of units</Form.Label>
                <Form.Control
                    required
                    type="number"
                    name="noofunits"
                    value={values.noofunits}
                    onChange={e => setValue({...values, noofunits:e.target.value})}
                />
                </Form.Group>

                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </Container>
  </> 
  );
}
