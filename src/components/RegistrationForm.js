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
    riderExperienceOptions: ["Beginner", "Intermediate", "Advanced"]
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

  onSubmit = () => {
    var params = {
      // The ID of the spreadsheet to update.
      spreadsheetId: config.spreadsheetId,

      // The A1 notation of a range to search for a logical table of data.
      // Values will be appended after the last row of the table.
      range: "Sheet1!A31:A50",

      // How the input data should be interpreted.
      valueInputOption: "USER_ENTERED",

      // How the input data should be inserted.
      insertDataOption: "INSERT_ROWS"
    };

    var valueRangeBody = {
      number: "1234"
    };

    var request = window.gapi.client.sheets.spreadsheets.values.append(
      params,
      valueRangeBody
    );
    request.then(
      function(res) {
        console.log(res);
      },
      function(reason) {
        console.error("error: " + reason.result.error.message);
      }
    );
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
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      age,
      emergencyContactName,
      emergencyContactPhone,
      insuranceCarrier,
      riderExperienceOptions,
      policyNumber,
      dates,
      sessionDate,
      riderExperience
    } = this.state;

    const sessionOptions = dates.map(date => ({
      label: date,
      value: date
    }));
    const riderOptions = riderExperienceOptions.map(experience => ({
      label: experience,
      value: experience
    }));

    return (
      <div
        style={{
          background: "white",
          minHeight: "100vh",
          textAlign: "center",
          padding: "20px",
          maxWidth: "700px",
          background: "#cdd0ad"
        }}
      >
        <h1>Isola Riding Academy Day Camp</h1>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              label="Rider's Name"
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
          </Form.Group>
          <Form.Group widths="equal">
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
          </Form.Group>
          <Form.Input
            label="email"
            name="email"
            onChange={this.handleChange}
            value={email}
            placeholder="email"
          />
          <Form.Input
            label="Confirm email"
            name="confirmEmail"
            onChange={this.handleChange}
            value={confirmEmail}
            placeholder="Confirm email"
          />
          <Form.Input
            label="Phone Number"
            name="phone"
            onChange={this.handleChange}
            value={phone}
            placeholder="Phone Number"
          />
          <Form.Input
            label="Address"
            name="addressLine1"
            onChange={this.handleChange}
            value={addressLine1}
            placeholder="Address Line 1"
          />
          <Form.Input
            name="addressLine2"
            onChange={this.handleChange}
            value={addressLine2}
            placeholder="Address Line 2"
          />
          <Form.Group>
            <Form.Input
              name="city"
              onChange={this.handleChange}
              value={city}
              placeholder="city"
            />
            <Form.Input
              name="state"
              onChange={this.handleChange}
              value={state}
              placeholder="state"
            />
            <Form.Input
              name="zip"
              onChange={this.handleChange}
              value={zip}
              placeholder="zip"
            />
          </Form.Group>
          <hr />
          <div style={{ fontWeight: "bold" }}>
            Choose session(s) you would like to attend
          </div>
          <Select options={sessionOptions} isMulti closeMenuOnSelect={false} />
          <Form.Input
            maxLength="3"
            label="Age"
            name="age"
            onChange={this.handleChange}
            value={age}
            placeholder="Age"
          />
          <div style={{ fontWeight: "bold" }}>Rider Experience Level</div>
          <Select options={riderOptions} defaultValue={riderOptions[0]} />
          <br />
          <hr />
          <Form.Input
            label="Emergency Contact Name"
            name="emergencyContactname"
            onChange={this.handleChange}
            value={emergencyContactName}
            placeholder="Emergency Contact Name"
          />
          <Form.Input
            label="Emergency Contact Phone Number"
            name="emergencyContactPhone"
            onChange={this.handleChange}
            value={emergencyContactPhone}
            placeholder="Emergency Contact Phone Number"
          />
          <Form.Input
            label="Insurance Carrier"
            name="insuranceCarrier"
            onChange={this.handleChange}
            value={insuranceCarrier}
            placeholder="Insurance Carrier"
          />
          <Form.Input
            label="Policy Number"
            name="policyNumber"
            onChange={this.handleChange}
            value={policyNumber}
            placeholder="Policy Number"
          />
          <hr />
          <Button onClick={() => this.onSubmit()}>make api call</Button>
        </Form>
      </div>
    );
  }
}

export default RegistrationForm;

const styles = {};
