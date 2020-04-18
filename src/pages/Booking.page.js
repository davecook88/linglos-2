
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Calendar from '../components/calendar/Calendar.component';
import Appointment from '../components/calendar/Appointment.component';


class Booking extends Component {

  appointmentClickHandler(arg) {
    console.log(arg);
  }
  
  render() {
    return (
      <div>
        <Calendar 
          date={this.props.date}
          onAppointmentsClick={this.appointmentClickHandler} 
          />
        <Appointment
          clickHandler={this.appointmentClickHandler}
           />
      </div>
      
    )
  }
}

Booking.propTypes = {
  date: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  date: state.globals.date,
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps)(Booking);