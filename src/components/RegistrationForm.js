import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import config from "../config";
import { load } from "../helpers/spreadsheet.js";
import Select from "react-select";
import moment from "moment";
import ReleaseModal from "./ReleaseModal";

class RegistrationForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    parentGuardianFirstName: "",
    parentGuardianLastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    sessions: [],
    age: "",
    riderExperienceLevel: { label: "Beginner", value: "Beginner" },
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceCarrier: "",
    policyNumber: "",
    dates: [],
    riderExperienceOptions: ["Beginner", "Intermediate", "Advanced"],
    releaseModalOpen: false
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

  onSubmit = releaseInfo => {
    let data = new FormData();
    data.append("Rider's First Name", this.state.firstName);
    data.append("Rider's Last Name", this.state.lastName);
    data.append(
      "Parent/Guardian First Name",
      this.state.parentGuardianFirstName
    );
    data.append("Parent/Guardian Last Name", this.state.parentGuardianLastName);
    data.append("email", this.state.email);
    data.append("Phone Number", this.state.phone);
    data.append("Address Line 1", this.state.addressLine1);
    data.append("Address Line 2", this.state.addressLine2);
    data.append("city", this.state.city);
    data.append("state", this.state.state);
    data.append("zip", this.state.zip);
    const sessionsString = this.state.sessions.map(s => s.value).join("/");
    data.append("Sessions", sessionsString);
    data.append("Age", this.state.age);
    data.append(
      "Rider Experience Level",
      this.state.riderExperienceLevel.value
    );
    data.append("Emergency Contact Name", this.state.emergencyContactName);
    data.append("Emergency Contact Number", this.state.emergencyContactPhone);
    data.append("Insurance Carrier", this.state.insuranceCarrier);
    data.append("Policy Number", this.state.policyNumber);
    data.append("Date/Time Form Submitted", moment());
    data.append("Release Information", releaseInfo.blob);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxPNuNc7xHH0_WGXzMFDUvKWXsZp2zrF-_YEYjZu_e0g3sAsAyR/exec";
    fetch(scriptURL, { method: "POST", body: data })
      .then(response => {
        alert("Submit Successful!", response);
        console.log("success");
        //TODO:  redirect to previous page
      })
      .catch(error => alert("Error on Submit!", error.message));
  };

  cancel = () => {
    //TODO:  redirect to previous page
  };

  handleOpen = () => {
    this.setState({ releaseModalOpen: true });
  };
  handleClose = () => {
    this.setState({ releaseModalOpen: false });
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
      sessions,
      riderExperienceLevel
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
          borderRadius: "5px",
          marginTop: "50px",
          marginBottom: "50px",
          minHeight: "100vh",
          textAlign: "center",
          padding: "20px",
          width: "700px",
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
          <Form.Group widths="equal">
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
          <Select
            options={sessionOptions}
            isMulti
            closeMenuOnSelect={false}
            value={sessions}
            onChange={selected => this.setState({ sessions: selected })}
          />
          <Form.Input
            maxLength="3"
            label="Age"
            name="age"
            onChange={this.handleChange}
            value={age}
            placeholder="Age"
          />
          <div style={{ fontWeight: "bold" }}>Rider Experience Level</div>
          <Select
            options={riderOptions}
            defaultValue={riderOptions[0]}
            value={riderExperienceLevel}
            onChange={selected =>
              this.setState({ riderExperienceLevel: selected })
            }
          />
          <br />
          <hr />
          <Form.Input
            label="Emergency Contact Name"
            name="emergencyContactName"
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Button onClick={() => this.cancel()}>Cancel</Button>
            <Button href="https://script.google.com/macros/s/AKfycbysS97mMpocXjT11XDJ5cUqB8EBGagJngeJKoJq4HG0w2bRxW8t/exec">
              Next
            </Button>
          </div>
        </Form>
        <Modal
          open={this.state.releaseModalOpen}
          onClose={() => this.handleClose()}
        >
          <ReleaseModal
            handleClose={this.handleClose}
            onSubmit={this.onSubmit}
          />
        </Modal>
      </div>
    );
  }
}

export default RegistrationForm;

const styles = {};
