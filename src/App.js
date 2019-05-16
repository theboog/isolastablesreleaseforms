import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import "./App.css";

function App() {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://s3-us-west-2.amazonaws.com/userdata123/www/imagefields/2224/theme_form_background_image-1548267532-106-967-4822224641.jpg?_=1548267533406)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <br />
        <RegistrationForm />
        <br />
      </div>
    </>
  );
}

export default App;
