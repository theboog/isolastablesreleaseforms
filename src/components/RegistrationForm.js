import React from 'react'
import {Button, Form} from 'semantic-ui-react'

class RegistrationForm extends React.Component{
  state={firstName: '', lastName: '', parentGuardianName:}

  render() {
    return(
      <>
       <Form.Input
          label="Date"
          name="startMonthDay"
          placeholder="MM/DD"
          onChange={this.handleChange}
          value={this.state.startMonthDay}
        />
        <Form.Input
          maxLength="4"
          label="Year"
          name="year"
          placeholder="YYYY"
          onChange={this.handleChange}
          value={this.state.year}
        />
        <Form.Input
          maxLength="8"
          label="Start Time"
          name="startHourMinute"
          placeholder="HH:mm am"
          onChange={this.handleChange}
          value={this.state.startHourMinute}
        />
        <Form.Input
          label="End Time"
          name="endHourMinute"
          placeholder="HH:mm pm"
          onChange={this.handleChange}
          value={this.state.endHourMinute}
        />
      </>
    )
  }
}

export default RegistrationForm