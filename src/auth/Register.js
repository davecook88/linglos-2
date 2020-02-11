import React, { Component } from 'react'
import { Col, Container, Row, Form, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        };
    }

    onChange(e) {
        this.setState({[e.target.id]:e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        };

        console.log(newUser);
    }
    
    render() {
        const { errors } = this.state;
        return (
            <Container>
                <Row>
                    <Col s={{size:8, offset: 2}}>
                        <Link to="/" className="btn">Back to home</Link>
                        <Col s="12">
                            <h4>Register</h4>
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </Col>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Col s='12'>
                                <Input 
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                />
                                <Label for="name">Name</Label>
                            </Col>
                            <Col s='12'>
                                <Input 
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                />
                                <Label for="email">Email</Label>
                            </Col>
                            <Col s='12'>
                                <Input 
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                                <Label for="password">Password</Label>
                            </Col>
                            <Col s='12'>
                                <Input 
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                />
                                <Label for="password2">Confirm password</Label>
                            </Col>
                            <Col>
                                <Button className="btn" type="submit">Sign Up</Button>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}
