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
      age,
      emergencyContactName,
      emergencyContactPhone,
      insuranceCarrier,
      riderExperienceOptions,
      policyNumber,
      dates
    } = this.state;

    const sessionOptions = dates.map(date => ({
      key: date,
      text: date,
      value: date
    }));
    const riderOptions = riderExperienceOptions.map(experience => ({
      key: experience,
      text: experience,
      value: experience
    }));

    return (
      <>
        <Form>
          <div style={{ width: "150px", display: "flex", padding: "5px" }}>
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
          <div style={{ width: "150px", display: "flex", padding: "5px" }}>
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
          <div style={{ width: "150px", display: "flex", padding: "5px" }}>
            <Form.Input
              label="E-mail"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div style={{ width: "150px", display: "flex", padding: "5px" }}>
            <Form.Input
              label="Confirm E-mail"
              name="confirmEmail"
              onChange={this.handleChange}
              value={confirmEmail}
            />
          </div>
          <div style={{ width: "150px", display: "flex", padding: "5px" }}>
            <Form.Input
              label="Phone Number"
              name="phone"
              onChange={this.handleChange}
              value={phone}
            />
          </div>
          <div style={{ width: "150px", display: "flex", padding: "5px" }}>
            <Select
              label="Choose a session You would like to attend"
              value={sessionDate}
              onChange={this.handleChange}
              options={sessionOptions}
            />
          </div>
          <div style={{ width: "150px", display: "flex", padding: "5px" }}>
            <Form.Input
              maxLength="3"
              label="Age"
              name="age"
              onChange={this.handleChange}
              value={age}
            />
          </div>
          <div style={{ width: "150px", display: "flex", padding: "5px" }}>
            <Select
              label="Rider Experience"
              value={riderExperience}
              onChange={this.handleChange}
              options={riderOptions}
            />
            <button onClick={() => this.onSubmit()}>make api call</button>
          </div>
        </Form>
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
    paddingTop: "10px"
  }
};
