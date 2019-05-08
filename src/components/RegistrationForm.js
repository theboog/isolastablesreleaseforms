import React from "react";
import { Button, Form } from "semantic-ui-react";
import config from "../config";
import load from "../helpers/spreadsheet.js";

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
    policyNumber: ""
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

  render() {
    const {
      firstName,
      lastName,
      parentGuardianFirstName,
      parengGuardianLastName,
      email,
      confirmEmail,
      phone,
      sessionDate,
      age,
      riderExperience,
      emergencyContactName,
      emergencyContactPhone,
      insuranceCarrier,
      policyNumber
    } = this.state;

    return (
      <>
        <Form.Input
          label="Camper's Name"
          name="firstName"
          placeholder="First"
          onChange={this.handleChange}
          value={firstName}
        />
        <Form.Input
          name="lastName"
          placeholder="Last"
          onChange={this.handleChange}
          value={lastName}
        />
        <Form.Input
          label="E-mail"
          name="email"
          onChange={this.handleChange}
          value={email}
        />
        <Form.Input
          label="Confirm E-mail"
          name="confirmEmail"
          onChange={this.handleChange}
          value={confirmEmail}
        />
        <Form.Input
          label="Phone Number"
          name="phone"
          onChange={this.handleChange}
          value={phone}
        />
        <Form.Input
          label="Choose session you would like to attend"
          name="sessionDate"
          onChange={this.handleChange}
          value={sessionDate}
        />
      </>
    );
  }
}

export default RegistrationForm;
