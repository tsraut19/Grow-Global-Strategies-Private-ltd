import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { UpdateProduct } from './UpdateProduct';

export function AddProduct() {
  const [formData, setFormData] = useState({
    proname: '',
    description: '',
    priceperunit: '',
    quantityinkg: '',
    noofunits:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    fetch("http://localhost:9800/product/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
        .then(() => {
        console.log("New Product added");
    });

    navigate("/product/list");
  };

  // ProName | Description | PricePerUnit | Quantityinkg | noofunits
  // proname, description, priceperunit, quantityinkg, noofunits

  return (
    <>
     <h1>Add Product</h1>
        <Container style={{ width: '70rem', marginTop: '1rem', marginBottom: '1rem'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="proname">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="proname"
                    value={formData.proname}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group controlId="priceperunit">
                <Form.Label>Price Per Unit</Form.Label>
                <Form.Control
                    required
                    type="number"
                    name="priceperunit"
                    value={formData.priceperunit}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group controlId="quantityinkg">
                <Form.Label>Quantity in KG</Form.Label>
                <Form.Control
                    required
                    type="number"
                    name="quantityinkg"
                    value={formData.quantityinkg}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group controlId="noofunits">
                <Form.Label>Number of units</Form.Label>
                <Form.Control
                    required
                    type="number"
                    name="noofunits"
                    value={formData.noofunits}
                    onChange={handleChange}
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
