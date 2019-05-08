import React from "react";
import { Button, Form, Container } from "semantic-ui-react";
import config from "../config";
import { load } from "../helpers/spreadsheet.js";
import Select from "react-select";

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
    addressStreet: '',
    addressStreet2: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    riderExperienceOptions: ['Beginner', 'Intermediate', 'Advanced']

  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleChange1 = date => {
    this.setState({ sessionDate: date.value });
  };

  handleChange2 = exp => {
    this.setState({ riderExperience: exp.value });
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
      label: date,
      value: date,

    }))
    const riderOptions = riderExperienceOptions.map(experience => ({
      label: experience,
      value: experience,
    }))

    return (
      <>
        <Container style={{
          margin: '2%',
          paddingLeft: '250px',
          backgroundColor: 'grey',
          minHeight: '100vh'
        }}>
          < Form >
            <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
              <Form.Input
                label="Camper's Name"
                name="firstName"
                placeholder="First"
                onChange={this.handleChange}
                value={firstName}
                required
              />
              <Form.Input
                style={{ paddingLeft: '20px', paddingTop: '9px' }}
                name="lastName"
                placeholder="Last"
                onChange={this.handleChange}
                value={lastName}
                required
              />
            </div>
            <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
              <Form.Input
                label="Parent/Guardian Name"
                name="parentGuardianFirstName"
                placeholder="First"
                onChange={this.handleChange}
                value={parentGuardianFirstName}
              />
              <Form.Input
                style={{ paddingLeft: '20px', paddingTop: '9px' }}
                name="parentGuardianLastName"
                placeholder="Last"
                onChange={this.handleChange}
                value={parentGuardianLastName}
                required
              />
            </div>
            <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
              <Form.Input
                style={{ paddingRight: '20px' }}
                label="E-mail"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
              <Form.Input
                style={{ paddingBottom: '15px' }}
                label="Confirm E-mail"
                name="confirmEmail"
                onChange={this.handleChange}
                value={confirmEmail}
              />
            </div>
            <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
              <Form.Input
                style={{ paddingTop: '9px' }}
                maxLength="12"
                placeholder='xxx-xxx-xxxx'
                label="Phone Number"
                name="phone"
                onChange={this.handleChange}
                value={phone}
              />
            </div>
            <div style={{ width: '300px', paddingLeft: '5px' }}>
              <Select
                onChange={this.handleChange1}
                options={
                  sessionOptions
                }
                isMulti
                closeMenuOnSelect={false}
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
            <div style={{ width: '300px', paddingLeft: '5px' }}>
              <Select
                onChange={this.handleChange2}
                options={
                  riderOptions
                }
                defaultValue={riderExperienceOptions[0]}
              />
            </div>
          </Form>
        </Container>
      </>
    );
  }
}

export default RegistrationForm;
