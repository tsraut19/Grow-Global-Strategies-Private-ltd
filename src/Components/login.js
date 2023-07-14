import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginDetailsFromSerr } from "../Services/ApiServices";
import axios from "axios";

export function Login(){
    const [isLoggedIn, setLoggedIn] = useState(false);

    //---------- Managing session ----------
    useEffect(() => {
        if (
            sessionStorage.getItem("isActive") !== null &&
            sessionStorage.getItem("isActive") === "true"
        ) {
            setLoggedIn(true);
        }
      }, []);
    
      const initialData = {
        username: "",
        password: "",
      };

    const [formData, setFormData] = useState(initialData);
    
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        axios.get(`http://localhost:9800/login/${formData.username}/${formData.password}`)
        .then(res => {
            console.log(res.data[0]);  

        if (res.data[0].username == formData.username ) {
                sessionStorage.setItem("userName", res.data[0].username);
                sessionStorage.setItem("isActive", true);
            navigate("/product/list");
        } else {
                alert("Incorrect username or password!");
        }
        })
    };

    return(
        <>
            <h1>Login</h1>
            <Container>
            <Row>
            <Col md={6}>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Enter username"
                        name="username"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
            
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Link to="/signup">New User? Sign up here</Link>
            </Col>
            </Row>
            </Container>
        </>
    );
}
