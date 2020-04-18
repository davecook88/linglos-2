import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Row, Col, Button } from 'reactstrap';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render () {
    const { user } = this.props.auth;

    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <Row>
          <Col xs={12} className="center-align">
            <h4>Hey there {user.name}!</h4>
            <p className="flow-text grey-text text-darken-1">
              You are logged into a full-stack{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
            </p>
            <Button onClick={this.onLogoutClick}>Logout</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth:state.auth
});

export default connect(mapStateToProps, {logoutUser})(Dashboard);