import React, { Component } from 'react'
import { Col, Row, Container, Form, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:'',
            errors:{}
        };

    }

    onChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(userData);  
    }
    render() {
        const { errors } = this.state;
        return (
            <Container>
                <Row>
                    <Col s={{size:8, offset:2}} >
                        <Link to="/">Home</Link>
                    </Col>
                    <Col s="12">
                        <h4>Login</h4>
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </Col>
                    <Form noValidate onSubmit={e => this.onSubmit(e)}>
                        <Col s="12">
                            <Input 
                                onChange={e => this.onChange(e)}
                                value={this.state.value}
                                error={errors.email}
                                id="email"
                                type="email"
                            />
                            <Label for="email">Email</Label>
                        </Col>
                        <Col s="12">
                            <Input
                                onChange={(e) => this.onChange(e)}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                            />
                            <Label for="password">password</Label>
                        </Col>
                        <Col s="12">
                            <Button type="submit" className="btn">Login</Button>
                        </Col>


                    </Form>
                </Row>
            </Container>
        )
    }
}