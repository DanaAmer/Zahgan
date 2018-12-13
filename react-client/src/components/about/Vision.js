import React from "react";
import "./Vision.css";
import $ from "jquery";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class Vision extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
      modal: false,
      modal1: false,
      Help: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.handleSubmitHelp = this.handleSubmitHelp.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }
  toggleHelp() {
    this.setState({
		 Help: !this.state.Help 
		});
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  toggle1() {
    this.setState({
      modal1: !this.state.modal1
    });
  }

  handleSubmitHelp() {
    var queryDetails = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };
    $.ajax({
      type: "POST",
      url: "/help",
      data: {
        queryDetails
      },
      success: data => {
        alert("Your feedback has been sent successfully");
        $("input, textarea").val("");
      },
      error: err => {
        console.log("err", err);
      }
    });
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return <div id="about">
        <div className="row">
          <div className="col-md-12">
            <p className="main_title">
              <span>About Us</span>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" onClick={this.toggle}>
            <div className="box">
              <div className="box-icon">
                {" "}
                <span className="glyphicon glyphicon-heart-empty " />{" "}
              </div>
              <div className="info">
                <h4 className="text-center">About</h4>
                <p>
                  {" "}
                  Our mission is to provide you with a tool to find the best events happening around you <br />
                  <u>read more</u>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4" onClick={this.toggle1}>
            <div className="box">
              <div className="box-icon">
                {" "}
                <span className="glyphicon glyphicon-map-marker" />{" "}
              </div>
              <div className="info">
                <h4 className="text-center">Our location</h4>
                <p>
                  Our team will be happy to meet you
                  <br />
                  <u>Our location</u>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4" onClick={this.toggleHelp}>
            <div className="box">
              <div className="box-icon">
                {" "}
                <span className="glyphicon glyphicon-earphone" />{" "}
              </div>
              <div className="info">
                <h4 className="text-center">help</h4>
                <p>
                  {" "}
                  Do you need help? Our team will be happy to help you, contact us at <br /> 06-xxxxxxx{" "}
                </p>{" "}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal className={"modal-open"} isOpen={this.state.modal} toggle={this.toggle} centered={true} size={"lg"} style={{ marginTop: "100px" }}>
            <ModalBody>
              <h2
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: "-5px",
                  fontFamily: "Times New Roman"
                }}
              >
                About Us
              </h2> <hr />
              <p style={{ fontSize: "20px", fontFamily: "Times New Roman" }}>
                {" "}
                <strong>
                  Zahgaan
                </strong> is an online event registration created to help manage events, festivals, conferences, workshops and activities. it saves you the time and effort of managing events, handling attendee communication, manual registration.
                <br /> <br />
                Zahgaan.com is a service platform that allows event organizers or venue managers to post their events and start accepting registrations or reservations online, in addition to that, Zahgaan.com provides its audiences with the latest events and alerts based on their personal preferences.
              </p>
            </ModalBody>
          </Modal>
          <Modal className={"modal-open"} isOpen={this.state.modal1} toggle={this.toggle1} centered={true} size={"lg"} style={{ marginTop: "150px" }}>
            <ModalBody>
              <div className="location">
                <main className=" m-0 p-0">
                  <div className="z-depth-1-half map-container-4 map-container-google-4 ">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.051567103805!2d35.83549401509962!3d31.986617531171028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca18e39fe576b%3A0xf308701edd298519!2sRBK+Hacker+Haus!5e0!3m2!1sen!2sjo!4v1543954476718" allowfullscreen />
                  </div>
                </main>
              </div>
            </ModalBody>
          </Modal>
          <Modal className={"modal-open"} isOpen={this.state.Help} toggle={this.toggleHelp} centered={true} size={"lg"} style={{ marginTop: "150px", fontSize: "20px" }}>
          <ModalBody style={{ width: "600px" }}>
              <Form style={{ width: "600px" }}>
                <FormGroup>
                  <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                    {" "}
                    Write to us
                  </h2>
                  <Label for="name">Name</Label>
                  <Input type="text" name="name" onChange={this.handleName} />
                </FormGroup>

                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input type="email" name="email" onChange={this.handleEmail} />
                </FormGroup>

                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input type="textarea" name="message" onChange={this.handleMessage} />
                </FormGroup>
              <Button onClick={this.handleSubmitHelp}>Send</Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>;
  }
}
export default Vision;




