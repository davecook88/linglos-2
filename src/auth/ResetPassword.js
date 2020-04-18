import React, { Component } from 'react'
import { Alert, Col, Container, Row, Form, Input, Label, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resetPassword} from '../../src/actions/authActions';
import classnames from 'classnames';

class ResetPassword extends Component {
    constructor(props){
        console.log(props);
        super(props);
        this.state = props.match.params;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }


    onChange(e) {
        this.setState({[e.target.id]:e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2,
            encodedToken: this.state.token
        };
        this.props.resetPassword(user, (res) => {
            console.log(res);
            if (!res.data.errors) {
                this.props.history.push('/dashboard');
            } else {
                console.log(res);
            }
        });
    }

    
    
    render() {
        const { errors } = this.props;
        return (
            <Container>
                <Row>
                    <Col s={{size:8, offset: 2}}>
                        <Link to="/" className="btn">Back to home</Link>
                        <Col s="12">
                            <h4>Reset your password</h4>
                        </Col>
                        <Form noValidate onSubmit={this.onSubmit}>
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
                            <Row>
                                <Col>
                                    {this.props.errors.status ? <Alert color="danger">{this.props.errors.status}</Alert> : null}
                                </Col>
                            </Row>
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

ResetPassword.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    { resetPassword }
) (withRouter(ResetPassword));