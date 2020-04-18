import React, { Component } from 'react'
import styled  from 'styled-components';

//testing
const startString = 'Fri Apr 17 2020 12:00:00 GMT+0700 (Indochina Time)';
const endString = 'Fri Apr 17 2020 13:00:00 GMT+0700 (Indochina Time)';

const AppointmentBox = styled.div`
  border:1px solid black;
  border-radius:20px;
  cursor:pointer;

  &:hover{
    background:#000;
    color:#fff;
  }
`
export default class Appointment extends Component {
  constructor(props){
    super(props);
    this.state = {
      teacher: props.teacher || {name:'Dave', _id:1000},
      time: props.time || {
        start: new Date(startString),
        end: new Date(endString),
        length: 60,
      }
    }
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    const { teacher } = this.state;
    this.props.clickHandler(teacher._id);
  }
  render() {
    return (
      <AppointmentBox className="text-center" onClick={this.onClick}>
        <div>{this.state.time.start.toString()}</div>
        <div>{this.state.teacher.name}</div>
      </AppointmentBox>
    )
  }
}
