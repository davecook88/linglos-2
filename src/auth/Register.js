import React, { Component } from 'react'
import { Col, Container, Row, Form, Input, Label, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerUser} from '../../src/actions/authActions';
import classnames from 'classnames';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard") //reroute on successful login
        }
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
        console.log(this.props.registerUser);
        this.props.registerUser(newUser,this.props.history);
        console.log(newUser);
    }

    
    
    render() {
        const { errors } = this.props;
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
                                    className={classnames('',{ invalid:errors.name })}
                                />
                                <Label for="name">Name</Label>
                                <span className="red-text">{errors.name}</span>
                            </Col>
                            <Col s='12'>
                                <Input 
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames('',{ invalid:errors.email })}
                                />
                                <Label for="email">Email</Label>
                                <span className="red-text">{errors.email}</span>
                            </Col>
                            <Col s='12'>
                                <Input 
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames('',{ invalid:errors.password })}
                                />
                                <Label for="password">Password</Label>
                                <span className="red-text">{errors.password}</span>
                            </Col>
                            <Col s='12'>
                                <Input 
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames('',{ invalid:errors.password2 })}
                                />
                                <Label for="password2">Confirm password</Label>
                                <span className="red-text">{errors.password2}</span>
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

const mapStateToProps = state => ({
    auth:state.auth,
    errors:state.errors
})

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    { registerUser }
) (withRouter(Register));