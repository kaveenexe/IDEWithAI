import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import UserForm from "../../components/Dashboard/UserForm";
import DeleteUser from "../../components/Dashboard/DeleteUser";
import UserRetrieve from "../../components/Dashboard/UserRetrieve";
import Invitation from "../../components/Dashboard/Invitation";
import Feedback from "../../components/Dashboard/Feedback";
import SendFeedback from "../../components/Dashboard/SendFeedback";
import "./styles.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    username: "",
    expLevel: "Beginner",
    aboutMe: "",
  } );
  
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    username: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log( formData );
    
    let isValid = true;
    const updatedErrors = { ...validationErrors };

    if (!validateEmail(formData.email)) {
      updatedErrors.email = "Invalid email address";
      isValid = false;
    } else {
      updatedErrors.email = "";
    }

    if (!validateUsername(formData.username)) {
      updatedErrors.username =
        "Username: Minimum 6 characters, contain letters & numbers only";
      isValid = false;
    } else {
      updatedErrors.username = "";
    }

    if (!isValid) {
      setValidationErrors(updatedErrors);
      return;
    }

    const data = {
      ...formData,
    };

    axios
      .post("http://localhost:5000/api/community/create-community", data)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Done!",
          "Successfully registered to the DevMind Community...",
          "success"
        ).then(() => {
          window.location.href = "/community";
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Oops!", "Registration Failed!", "error");
      });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9]{6,}$/;
    return re.test(username);
  };

  return (
    <div className="db_container">
      <div className="background">
        <div className="dashbord_background justify-content-center container align-items-center">
          <h1 className="dashboard_title"> Dashboard </h1>
        </div>
      </div>
      <div className="justify-content-center container align-items-center mt-5 db_alltabs">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column dashboard_tabs bg-dark text-light">
                <UserRetrieve className="" />
                <Nav.Item>
                  <Nav.Link eventKey="first">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Invitaions</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Recieved Feedbacks</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Send Feedbacks</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card className="join-card">
                <Card.Body
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontFamily: "monospace",
                  }}
                >
                  Join our community to helping others with their coding.{" "}
                  <strong>Register Now!</strong>
                </Card.Body>
                <Button
                  variant="dark"
                  onClick={handleShow}
                  className="join-btn"
                  style={{
                    textAlign: "center",
                    fontSize: "17px",
                    fontFamily: "monospace",
                  }}
                >
                  JOIN
                </Button>
              </Card>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first" className="dbtab_details bg-dark text-light">
                  <UserForm />
                  <DeleteUser />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="dbtab_details bg-dark text-light">
                  <Invitation />
                </Tab.Pane>
                <Tab.Pane eventKey="third" className="dbtab_details bg-dark text-light">
                  <Feedback />
                </Tab.Pane>
                <Tab.Pane eventKey="fourth" className="dbtab_details bg-dark text-light">
                  <SendFeedback />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      {/* Join Community Model */}
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          style={{
            background: "linear-gradient(10deg, #83e6fc 0%, #d9acee 100%)",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                marginLeft: "0px",
                fontSize: "25px",
                fontWeight: "700",
                fontFamily: "Trebuchet MS",
              }}
            >
              Join Our DevMind Coding Community
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
                style={{
                  fontSize: "17px",
                  fontFamily: "Trebuchet MS",
                }}
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
                style={{
                  fontSize: "17px",
                  fontFamily: "Trebuchet MS",
                }}
              >
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  type="email"
                  placeholder="john@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Form.Text className="text-danger">
                  {validationErrors.email}
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
                style={{
                  fontSize: "17px",
                  fontFamily: "Trebuchet MS",
                }}
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className="custom-form-control"
                  type="text"
                  placeholder="johndoe123"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <Form.Text className="text-danger">
                  {validationErrors.username}
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-1"
                style={{
                  fontSize: "17px",
                  fontFamily: "Trebuchet MS",
                }}
              >
                <Form.Label>Experience Level</Form.Label>
                <Form.Select
                  aria-label="experience-level-select"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expLevel: e.target.value,
                    })
                  }
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlTextarea1"
                style={{
                  marginLeft: "0px",
                  fontSize: "17px",
                  fontFamily: "Trebuchet MS",
                }}
              >
                <Form.Label>About Me</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Tell us a bit about yourself and your coding interests..."
                  onChange={(e) =>
                    setFormData({ ...formData, aboutMe: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Check
                inline
                label="I agree to the Terms and Conditions"
                name="group1"
                style={{
                  fontSize: "17px",
                  fontFamily: "Trebuchet MS",
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleSubmit}
              style={{
                marginLeft: "0px",
                fontSize: "15px",
                fontFamily: "Trebuchet MS",
              }}
            >
              JOIN WITH US
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{
                marginLeft: "0px",
                fontSize: "15px",
                fontFamily: "Trebuchet MS",
              }}
            >
              CLOSE
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
