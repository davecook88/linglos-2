import React, { Component } from 'react'
import { Col, Row, Container, Form, Input, Label, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import classnames from 'classnames';
import axios from 'axios';

const rootPath = 'http://localhost:5000';

const LoginForm = props => (
    <Form noValidate onSubmit={e => props.context.onSubmit(e)}>
        <Col s="12">
            <Input 
                onChange={e => props.context.onChange(e)}
                value={props.context.state.value}
                error={props.errors.email}
                id="email"
                type="email"
                className={classnames('',{ invalid:props.errors.email || props.errors.emailNotFound})}
            />
            <Label for="email">Email</Label>
            <span className="red-text">
                {props.errors.email}
                {props.errors.emailnotfound}
            </span>
        </Col>
        <Col s="12">
            <Input
                onChange={(e) => props.context.onChange(e)}
                value={props.context.state.password}
                error={props.errors.password}
                id="password"
                type="password"
                className={classnames('',{ invalid:props.errors.password || props.errors.passwordIncorrect })}
            />
            <Label for="password">password</Label>
            <span className="red-text">
                {props.errors.password}
                {props.errors.passwordincorrect}
            </span>
        </Col>
        <Col s="6">
            <Button onClick={e => props.context.passwordResetClickHandler(e)}>Forgot your password?</Button>
        </Col>
        <Col s="6">
            <Button type="submit" className="btn">Login</Button>
        </Col>
    </Form>
)

const ForgotPasswordForm = props => (
    <Form noValidate onSubmit={e => props.context.onForgotPasswordSubmit(e)}>
        <Col s="12">
            <p>Enter your email address in the box below and we'll check if we have an account for you.</p>
            <Input 
                onChange={e => props.context.onChange(e)}
                value={props.context.state.value}
                error={props.errors.email}
                id="email"
                type="email"
                className={classnames('',{ invalid:props.errors.email || props.errors.emailNotFound})}
            />
            <Label for="email">Email</Label>
            <span className="red-text">
                {props.errors.email}
                {props.errors.emailnotfound}
            </span>
        </Col>
        <Col s="6">
            <Button type="submit" className="btn">Reset password</Button>
        </Col>
    </Form>
)

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:'',
            errors:{}
        };

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.isAuthenticated) {
            this.props.history.push('/dashboard');//push user to dashboard when they login
        }
        if (nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onForgotPasswordSubmit(e) {
        e.preventDefault();
        axios
            .post(`${rootPath}/api/users/forgot-password`, this.state)
            .then(res => console.log(res))
            .catch(err => console.log(err));
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
        this.props.loginUser(userData, () => {
            console.log(this.props);
            if (this.props.auth.isAuthenticated) {
                console.log(this.props);
                this.props.history.push('/dashboard');
            }
        });
    }
    passwordResetClickHandler = e => {
        e.preventDefault();
        this.setState({isPasswordForgotten:true});
    }
    render() {
        const { errors, isPasswordForgotten } = this.state;
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
                    {isPasswordForgotten ? <ForgotPasswordForm errors={errors} context={this} /> : <LoginForm errors={errors} context={this} />}
                </Row>
            </Container>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login));