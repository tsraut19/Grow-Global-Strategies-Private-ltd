import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    address: '',
    city:''
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

    fetch("http://localhost:9800/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
        .then(() => {
        console.log("New User added");
    });

    navigate("/");
  };

  return (
    <>
     <h1>Register</h1>
        <Container style={{ width: '70rem', marginTop: '1rem', marginBottom: '1rem'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="city"
                    value={formData.city}
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
