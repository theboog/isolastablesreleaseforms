import React from "react";
import { Button, Form, Select } from "semantic-ui-react";
import config from "../config";
import { load } from "../helpers/spreadsheet.js";

class RegistrationForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    parentGuardianFirstName: "",
    parentGuardianLastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    sessionDate: "",
    age: "",
    riderExperience: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceCarrier: "",
    policyNumber: "",
    dates: [],
    riderExperienceOptions: ['Beginner', 'Intermediate', 'Advanced']

  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        // 3. Initialize and make the API request.
        load(this.onLoad);
      });
  };

  onLoad = (data, error) => {
    if (data) {
      const dates = data.dates;
      this.setState({ dates });
    } else {
      this.setState({ error });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      parentGuardianFirstName,
      parentGuardianLastName,
      email,
      confirmEmail,
      phone,
      sessionDate,
      age,
      riderExperience,
      emergencyContactName,
      emergencyContactPhone,
      insuranceCarrier,
      riderExperienceOptions,
      policyNumber,
      dates,
    } = this.state;

    const sessionOptions = dates.map(date => ({
      key: date,
      text: date,
      value: date,
    }))
    const riderOptions = riderExperienceOptions.map(experience => ({
      key: experience,
      text: experience,
      value: experience,
    }))

    return (
      <>
        <Form>
          <div style={{ width: '150px', display: 'flex', padding: '5px' }}>
            <Form.Input
              label="Camper's Name"
              name="firstName"
              placeholder="First"
              onChange={this.handleChange}
              value={firstName}
              required
            />
            <Form.Input
              label=""
              name="lastName"
              placeholder="Last"
              onChange={this.handleChange}
              value={lastName}
              required
            />
          </div>
          <div style={{ width: '150px', display: 'flex', padding: '5px' }}>
            <Form.Input
              label="Parent/Guardian Name"
              name="parentGuardianFirstName"
              placeholder="First"
              onChange={this.handleChange}
              value={parentGuardianFirstName}
            />
            <Form.Input
              label=""
              name="parentGuardianLastName"
              placeholder="Last"
              onChange={this.handleChange}
              value={parentGuardianLastName}
              required
            />
          </div>
          <div style={{ width: '150px', display: 'flex', padding: '5px' }}>
            <Form.Input
              label="E-mail"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div style={{ width: '150px', display: 'flex', padding: '5px' }}>
            <Form.Input
              label="Confirm E-mail"
              name="confirmEmail"
              onChange={this.handleChange}
              value={confirmEmail}
            />
          </div>
          <div style={{ width: '150px', display: 'flex', padding: '5px' }}>
            <Form.Input
              label="Phone Number"
              name="phone"
              onChange={this.handleChange}
              value={phone}
            />
          </div>
          <div style={{ width: '150px', display: 'flex', padding: '5px' }}>
            <Select
              label="Choose a session You would like to attend"
              value={sessionDate}
              onChange={this.handleChange}
              options={
                sessionOptions
              }
            />
          </div>
          <div style={{ width: '150px', display: 'flex', padding: '5px' }}>
            <Form.Input
              maxLength="3"
              label="Age"
              name="age"
              onChange={this.handleChange}
              value={age}
            />
          </div>
          <div style={{ width: '150px', display: 'flex', padding: '5px' }}>
            <Select
              label="Rider Experience"
              value={riderExperience}
              onChange={this.handleChange}
              options={
                riderOptions
              }
            />
          </div>
        </Form>

      </>
    );
  }
}

export default RegistrationForm;
