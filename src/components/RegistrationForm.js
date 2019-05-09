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
    dates: ['option1', 'option2', 'option3', 'option4'],
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
    this.setState({ sessionDate: [...this.state.sessionDate, date.value] });
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
      age,
      emergencyContactName,
      emergencyContactPhone,
      insuranceCarrier,
      riderExperienceOptions,
      policyNumber,
      dates,
      addressStreet,
      addressStreet2,
      addressCity,
      addressState,
      addressZip

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
          backgroundColor: '#cdd0ad',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          width: '60%',
        }}>
          < Form >
            <div
              style={{
                fontFamily: "georgia, palatino",
                paddingTop: '15px',
                textAlign: 'center',
                fontSize: '20pt',
                fontWeight: 'bold'
              }}>
              ISOLA RIDING ACADEMY</div>
            <div style={{
              fontFamily: "georgia, palatino",
              textAlign: 'center',
              fontSize: '20pt',
              fontWeight: 'bold',
              paddingTop: '10px'
            }}>
              DAY CAMP
            </div>
            <div style={styles.row}>
              <span style={{ width: '50%' }}>
                <Form.Input
                  label="Camper's Name"
                  name="firstName"
                  placeholder="First"
                  onChange={this.handleChange}
                  value={firstName}
                  required
                  stackable
                />
              </span>
              <span style={{ width: '50%', paddingLeft: '15px', paddingTop: '23px' }}>
                <Form.Input
                  name="lastName"
                  placeholder="Last"
                  onChange={this.handleChange}
                  value={lastName}
                  required
                  stackable
                />
              </span>
            </div>
            <div style={styles.row}>
              <span style={{ width: '50%' }}>
                <Form.Input
                  label="Parent/Guardian Name"
                  name="parentGuardianFirstName"
                  placeholder="First"
                  onChange={this.handleChange}
                  value={parentGuardianFirstName}
                />
              </span>
              <span style={{ width: '50%', paddingLeft: '15px', paddingTop: '23px' }}>
                <Form.Input
                  name="parentGuardianLastName"
                  placeholder="Last"
                  onChange={this.handleChange}
                  value={parentGuardianLastName}
                  required
                />
              </span>
            </div>
            <div style={styles.row}>
              <span style={{ width: '50%' }}>
                <Form.Input
                  label="E-mail"
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                />
              </span>
              <span style={{ width: '50%', paddingLeft: '15px' }}>
                <Form.Input
                  label="Confirm E-mail"
                  name="confirmEmail"
                  onChange={this.handleChange}
                  value={confirmEmail}
                />
              </span>
            </div>
            <div style={styles.row}>
              <span style={{ width: '100%' }}>
                <Form.Input
                  maxLength="12"
                  placeholder='xxx-xxx-xxxx'
                  label="Phone Number"
                  name="phone"
                  onChange={this.handleChange}
                  value={phone}
                />
              </span>
            </div>
            <div style={{ width: '100%', paddingBottom: '10px', paddingTop: '10px' }}>
              <Form.Input
                placeholder='Address Line 1'
                label="Address"
                name="addressStreet"
                onChange={this.handleChange}
                value={addressStreet}
              />
            </div>
            <div style={{ width: '100%' }}>
              <Form.Input
                placeholder='Address Line 2'
                name="addressStreet2"
                onChange={this.handleChange}
                value={addressStreet2}
              />
            </div>
            <div style={styles.row}>
              <span style={{ width: "40%", paddingRight: '5px' }}>
                <Form.Input
                  placeholder='City'
                  name="addressCity"
                  onChange={this.handleChange}
                  value={addressCity}
                />
              </span>
              <span style={{ width: "20%", paddingRight: '5px' }}>
                <Form.Input
                  placeholder='State'
                  name="addressState"
                  onChange={this.handleChange}
                  value={addressState}
                />
              </span>
              <span style={{ width: "40%" }}>
                <Form.Input
                  placeholder='Postal/Zip Code'
                  name="addressZip"
                  onChange={this.handleChange}
                  value={addressZip}
                />
              </span>
            </div>
            <div
              style={{
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                fontWeight: 'bold',
                paddingTop: '5px',
                fontSize: '0.9em'
              }}>
              Choose a session(s) you would like to attend
              </div>
            <div style={{ width: '100%', paddingTop: '10px' }}>
              <Select
                onChange={this.handleChange1}
                options={
                  sessionOptions
                }
                isMulti
                closeMenuOnSelect={false}
              />
            </div>
            <div style={styles.row}>
              <span style={{ width: '100%' }}>
                <Form.Input
                  maxLength="3"
                  label="Age"
                  name="age"
                  onChange={this.handleChange}
                  value={age}
                />
              </span>
            </div>
            <div
              style={{
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                fontWeight: 'bold',
                paddingTop: '5px',
                fontSize: '0.9em'
              }}>
              Rider Experience
              </div>
            <div style={{ width: '100%', paddingTop: '10px' }}>
              <Select
                onChange={this.handleChange2}
                options={
                  riderOptions
                }
                defaultValue={riderExperienceOptions[0]}
              />
            </div>
            <div style={styles.row}>
              <span style={{ width: '50%' }}>
                <Form.Input
                  style={{ paddingRight: '20px' }}
                  placeholder='First and Last Name'
                  label="Emergency Contact Name"
                  name="emergencyContactName"
                  onChange={this.handleChange}
                  value={emergencyContactName}
                />
              </span>
              <span style={{ width: '50%' }}>
                <Form.Input
                  maxLength="12"
                  placeholder='xxx-xxx-xxxx'

                  label="Emergency Contact Number"
                  name="emergencyContactPhone"
                  onChange={this.handleChange}
                  value={emergencyContactPhone}
                />
              </span>
            </div>
            <div style={styles.row}>
              <span style={{ width: '50%' }}>
                <Form.Input
                  style={{ paddingRight: '20px' }}
                  label="Insurance Carrier"
                  name="insuranceCarrier"
                  onChange={this.handleChange}
                  value={insuranceCarrier}
                />
              </span>
              <span style={{ width: '50%' }}>
                <Form.Input
                  label="Policy Number"
                  name="policyNumber"
                  onChange={this.handleChange}
                  value={policyNumber}
                />
              </span>
            </div>
            <Button style={{ marginBottom: '10px', marginTop: '10px' }} floated='right'>Next</Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default RegistrationForm;

const styles = {
  row: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: "10px",
  },

};
