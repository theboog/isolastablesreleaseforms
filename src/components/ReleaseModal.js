import React from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import config from "../config";

class ReleaseModal extends React.Component {
  state = {
    nameOfMinorRider: "",
    nameOfAdultRiderHandlerGuardian: "",
    signatureOfAdultRiderHandlerGuardian: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    this.createPDF();

    this.props.handleClose();
    //TODO: redirect to previous page
  };

  createPDF = () => {
    document
      .getElementsByTagName("BODY")[0]
      .append(document.getElementById("releaseForm"));
    document.getElementById("releaseForm").style =
      "height: 1800px; width: 850px";
    html2canvas(document.getElementById("releaseForm"), { scale: 0.7 }).then(
      canvas => {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF("p", "mm", [
          canvas.height - 280,
          canvas.width - 120
        ]);
        doc.addImage(img, "JPEG", 5, 5);
        var pdf = doc.output("blob");
        var data = new FormData();
        data.append("blob", pdf);
        data.append("fileName", "testfileName23");
        // var headers = new Headers();

        // const { google } = require("googleapis");

        // const key = config.JSONKeyFile;
        // const scopes = "https://www.googleapis.com/auth/drive";
        // const jwt = new google.auth.JWT(
        //   key.client_email,
        //   null,
        //   key.private_key,
        //   scopes
        // );
        // const view_id = "XXXXXXX";

        // process.env.GOOGLE_APPLICATION_CREDENTIALS = config.JSONKeyFile;
        // console.log(jwt);

        // debugger;
        // jwt.authorize((err, response) => {
        //   google.drive("v3").post(
        //     {
        //       auth: jwt,
        //       body: data
        //     },
        //     (err, result) => {
        //       console.log(err, result);
        //     }
        //   );
        // });

        // dropbox access token "Yq-YRcvue4AAAAAAAAAADelHfEP8S-XOPlxgDPldjdcf36o-uXWZWHNRJ-t-Hiul"
        // const { google } = require("googleapis");

        // const key = config.JSONKeyFile;
        // const scopes = "https://www.googleapis.com/auth/drive.file";
        // const jwt = new google.auth.JWT(
        //   key.client_email,
        //   null,
        //   key.private_key,
        //   scopes
        // );

        // // process.env.GOOGLE_APPLICATION_CREDENTIALS = config.JSONKeyFile;
        // headers.append("Authorization", `Bearer ${jwt}`);
        // headers.append("Content-Length", data.length);
        // headers.append("Content-Type", "pdf");

        // console.log("drive script start");
        // const driveURL =
        //   "https://www.googleapis.com/upload/drive/v3/files?uploadType=media";
        // fetch(driveURL, { method: "POST", headers: headers, body: data })
        //   .then(response => {
        //     alert("Drive Submit", response);
        //     console.log("drive script response");
        //     //TODO:  redirect to previous page
        //   })
        //   .catch(error => alert("Error on Submit!", error.message));

        // fetch(
        //   "https://script.google.com/macros/s/AKfycbwV-t_bzoKCtysTEJc6GDwYXCS3biLDsiLj9r3YeK2jv-l6o54/exec",
        //   {
        //     method: "GET"
        //   }
        // ).then(response => {
        //   return response.blob();
        // });

        //         //gooogle drive

        //         var fileMetadata = {
        //           name: "test3.pdf"
        //         };
        //         var media = {
        //           mimeType: "application/pdf",
        //           body: doc
        //         };
        //         drive.files.create(
        //           {
        //             resource: fileMetadata,
        //             media: media,
        //             fields: "id"
        //           },
        //           function(err, file) {
        //             if (err) {
        //               // Handle error
        //               console.error(err);
        //             } else {
        //               console.log("File Id: ", file.id);
        //             }
        //           }
        //         );
        // // client id 177463691730-r4mjj24f5vgvh2r3thcf2dag5cn6l0r3.apps.googleusercontent.com
        // // client secret JlRxb4ixuYLJQJFMHZtG6s_w
        // // googld drive api key AIzaSyAw2v4lFp0w089PpP36GHuU9GIbXzEqnBk

        //         const driveURL =
        //           "https://www.googleapis.com/upload/drive/v3/files?uploadType=media";
        //         fetch(driveURL, {
        //           method: "POST",
        //           headers: new Headers({ Authorization: "Bearer " + accessToken }),
        //           body: form
        //         })
        //           .then(response => {
        //             alert("Submit Successful!", response);
        //             console.log("success");
        //             //TODO:  redirect to previous page
        //           })
        //           .catch(error => alert("Error on Submit!", error.message));

        //         //google drive end

        this.props.onSubmit(data);
        doc.save("test2.pdf");
        document
          .getElementsByTagName("BODY")[0]
          .removeChild(document.getElementById("releaseForm"));
      }
    );
  };

  render() {
    const {
      nameOfMinorRider,
      nameOfAdultRiderHandlerGuardian,
      signatureOfAdultRiderHandlerGuardian
    } = this.state;
    return (
      <div>
        <div id="releaseForm">
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2em",
              padding: "20px"
            }}
          >
            CONSENT AND RELEASE AGREEMENT
          </div>
          <hr />
          <div>
            <div style={{ padding: "10px" }}>
              <div style={{ fontWeight: "bold", textAlign: "center" }}>
                IF YOU ARE A MINOR UNDER 18 YOU MUST OBTAIN THE SIGNATURE OF
                YOUR PARENT OR LEGAL GUARDIAN.
              </div>
              <br />
              <div>
                <p>
                  The “Property” means the equine boarding facility known as
                  Glenoaks Equestrian Center located at 3639 Alpine Road,
                  Portola Valley, California 94028.
                </p>
                <p>
                  “Releases Party(ies)” means Isola Stables, Inc. and Glenoaks
                  Equestrian Center, LLC and their owners, officers, members,
                  agents, employees and contractors. In consideration for being
                  permitted by any Released Party to participate in the sport of
                  horseback riding at the Property or to otherwise use the
                  Property, I acknowledge and agree as follows:
                </p>
                <p>
                  1. Hazardous Activity. I understand and expressly acknowledge
                  THAT THE HANDLING, CARE, AND RIDING OF HORSES ARE INHERENTLY
                  HAZARDOUS ACTIVITIES and participating in horseback riding and
                  horse sports, and my use of the Property involve inherent
                  dangerous risks that include, but are not limited to, the
                  risks of accident, loss, serious bodily injury, property
                  damage, and/or death (“Harm”). I AM VOLUNTARILY PARTICIPATING
                  IN SUCH ACTIVITIES AND AM PLACING MYSELF IN THE VICINITY OF
                  SUCH HARM WITH FULL KNOWLEDGE OF THE DANGERS INVOLVED. I
                  hereby expressly assume ALL RISK OF HARM to my horse(s), and
                  myself and choose voluntarily to participate in the sport of
                  horseback riding at the Property or to otherwise use of the
                  Property.
                </p>
                <p>
                  2.Property Rules and Regulations. I agree to observe all rules
                  andregulations of safe conduct on the Property posted at the
                  Property or otherwise made available to me (for example, rules
                  regarding access to Felt Lake or use of rings and trails
                  during inclement weather).
                </p>
                <p>
                  3. Personal Property. I agree that if I bring any personal
                  property to the Property, and if I store or leave any personal
                  property at the Property (including property left in any tack
                  room), I will do so at my own risk, and none of the Released
                  Parties shall have any liability in the event of the loss,
                  damage, unauthorized use (by any person other than a Released
                  Party), or theft of any such property, except to the extent
                  caused solely by the gross negligence or willful misconduct of
                  the Released Parties.
                </p>
                <p>
                  4. Agreement not to Sue. I HEREBY AGREE THAT I WILL NOT MAKE A
                  CLAIM AGAINST, SUE, DEMAND COMPENSATION OR INDEMNITY FROM, OR
                  ATTACH ANY OF THE PROPERTY OR ASSETS OF ANY OF THE RELEASED
                  PARTIES for any loss, damage, bodily injury, disability,
                  illness, disease, death, financial loss, property loss,
                  damage, or destruction or other harm of whatever nature,
                  whether foreseen or unforeseen, suffered by myself, any other
                  person, my horse or any other person’s horse caused by,
                  resulting from, or arising out of, directly or indirectly, my
                  participation, or the participation of any other person, in
                  the handling, care, riding or training of horses, the use of
                  the Property, except to the extent caused solely by the gross
                  negligence or willful misconduct of the Released Party or
                  Parties.
                </p>
                <p>
                  5. Release. I HEREBY FULLY AND UNCONDITIONALLY RELEASE,
                  FOREVER JOINTLY AND SEVERALLY DISCHARGE, INDEMNIFY AND HOLD
                  HARMLESS THE RELEASED PARTIES, TO THE EXTENT PERMITTED BY LAW
                  FROM ANY AND ALL CLAIMS, ACTIONS, DEMANDS, RIGHTS, CAUSES OF
                  ACTION, AND LIABILITIES OF ANY KIND, WHETHER IN LAW OR IN
                  EQUITY, OR ANY COMMON LAW CLAIMS OF ANY KIND including,
                  without limitation, any and all Harm to me or my horse(s), any
                  Harm caused or contributed to by me or my horse(s) to others,
                  breach of contract, negligence, negligent misrepresentation,
                  and any or all real or pretended claims, causes of action or
                  demands, whether foreseen or unforeseen, which may be
                  sustained by me or any other person as a direct or indirect
                  result of my riding of horses at the Property or the use of
                  the Property in any manner, WHETHER OR NOT SUCH CLAIM, INJURY,
                  DAMAGE, OR LOSS RESULTED, DIRECTLY OR INDIRECTLY, FROM MY
                  NEGLIGENT ACTS OR OMISSIONS OR THE NEGLIGENT ACTS OR OMISSIONS
                  OF ANY RELEASED PARTY, except to the extent caused solely by
                  the gross negligence or willful misconduct of any Released
                  Party. I understand that as part of the consideration for this
                  Release, I assume the risk of yet unknown claims and waive the
                  provisions of Section 1542 of the California Civil Code, which
                  reads as follows: A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS
                  WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS
                  FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY
                  HIM MUST HAVE MATERIALLY AFFECTED HIS SETTLEMENT WITH THE
                  DEBTOR.
                </p>
                <p>
                  6. Handlers and Invitees. Isola Stables Release 2019 Page 2 of
                  2 I AGREE THAT I WILL NOT PERMIT ANY PERSON (OTHER THAN THE
                  RELEASED PARTIES) TO HANDLE OR RIDE MY HORSE, OR ANY OTHER
                  HORSE UNDER MY CONTROL, AT THE PROPERTY UNLESS SUCH PERSON HAS
                  DULY SIGNED THIS RELEASE AND DELIVERED IT TO ANY RELEASED
                  PARTY.
                </p>
                <p>
                  7. General. Heirs and Assigns. I understand and agree that
                  this Release shall be binding upon my heirs and assigns.
                  Minors. If a parent or guardian is signing below, he or she
                  consents to the minor child’s participation in the sport of
                  horseback riding at the Property or other use of the Property
                  and agrees to all of the above provisions and agrees to assume
                  all of the obligations of this release of liability on the
                  minor child’s behalf. Dispute Resolution. If applicable, the
                  parties shall exercise good faith reasonable efforts to
                  achieve resolution through proceedings in small claims court
                  in San Mateo County, California. In the event that a
                  proceeding cannot be brought in small claims court, the
                  parties shall exercise good faith reasonable efforts to
                  achieve resolution through nonbinding mediation administered
                  by JAMS located in San Mateo County, California. If the
                  mediation is unsuccessful, the parties may then resort to
                  arbitration, litigation or another dispute resolution
                  procedure. Attorneys’ Fees. If either party employs attorneys
                  to enforce any rights arising out of or relating to this
                  Agreement, the prevailing party in such disputes shall be
                  entitled, in addition to its other rights hereunder, to
                  recover reasonable attorneys’ fees and all related expenses.
                  “Prevailing party” means that party in whose favor any
                  monetary or equitable award is made, regardless of settlement
                  offers. Governing Law; Jurisdiction. This Agreement will be
                  governed by California law, without regard to its principles
                  of conflicts of law. The parties hereby agree that the
                  Superior Court of the State of California for San Mateo County
                  or the United States District Court for the Northern District
                  of California shall have jurisdiction and venue over any
                  controversies, proceedings, or disputes arising in connection
                  with this Agreement. Entire Agreement. This Agreement may be
                  amended only by a written document executed by a duly
                  authorized representative of each of the parties. This
                  Agreement constitutes the entire agreement between the parties
                  concerning the subject matter of this Agreement and it
                  replaces and supersedes any prior verbal or written
                  understandings, communications, and representations between
                  the parties regarding the subject matter of this Agreement.
                </p>
                <p>
                  I HAVE EXECUTED THIS RELEASE VOLUNTARILY, WITHOUT RELYING ON
                  ANY STATEMENT OR REPRESENTATION OF ANY RELEASED PARTY. I
                  UNDERSTAND AND ACKNOWLEDGE THAT THIS RELEASE IS A RELEASE OF
                  LEGAL LIABILITY. I FURTHER UNDERSTAND AND AGREE THAT THE
                  RELEASED PARTIES WILL USE THIS RELEASE AS A DEFENSE TO ANY
                  CHARGE WHICH I FILE, INVESTIGATION OR PROCEEDING IN WHICH I
                  PARTICIPATE, OR REMEDY WHICH I SEEK.
                </p>
              </div>
              <hr />
              <br />
              <div>
                Signature of Released Parties:
                <span
                  style={{
                    fontFamily: "cursive",
                    fontSize: "1.5em",
                    padding: "0 20px 0 20px"
                  }}
                >
                  David R. Murdock
                </span>
                By: David R. Murdoch President, Isola Stables, Inc. Member,
                Glenoaks Equestrian Center, LLC
                <br />
                <br />
              </div>
              <Form>
                <Form.Input
                  label="Name of Minor Rider"
                  name="nameOfMinorRider"
                  onChange={this.handleChange}
                  value={nameOfMinorRider}
                  placeholder="Name of Minor Rider"
                />
                <Form.Input
                  label="Name of Adult Rider/Handler/Guardian"
                  name="nameOfAdultRiderHandlerGuardian"
                  onChange={this.handleChange}
                  value={nameOfAdultRiderHandlerGuardian}
                  placeholder="Printed Name"
                />
                <div style={{ fontWeight: "bold", padding: "3px" }}>
                  Signature of Adult Rider/Handler/Guardian
                </div>
                <input
                  label="Signature of Adult Rider/Handler/Guardian"
                  name="signatureOfAdultRiderHandlerGuardian"
                  onChange={this.handleChange}
                  value={signatureOfAdultRiderHandlerGuardian}
                  placeholder="Signature"
                  style={{
                    fontFamily: "cursive",
                    fontSize: "2em"
                  }}
                />
              </Form>
              <br />
            </div>
          </div>
          <hr />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px"
          }}
        >
          <Button onClick={() => this.props.handleClose()}>Back</Button>
          <Button onClick={() => this.onSubmit()}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default ReleaseModal;
