import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { Trash3Fill, EyeFill } from "react-bootstrap-icons";
import "./Style.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Invitation = () => {
  const [show, setShow] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [reciever, setReciever] = useState("");
  const handleClose = () => setShow(false);

  const handleShow = (invitation) => {
    setShow(true);
    setSelectedInvitation(invitation);
    setReciever(invitation.sender);
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData.email);

  // Get Invitations
  const [invitation, setInvitation] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/invitation/${userData.email}`)
      .then((response) => {
        setInvitation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Delete Invitation
  const removeInvitation = (id) => {
    const invitationToDelete = invitation.filter(
      (invitation) => invitation._id === id
    );
    if (window.confirm("Are you sure you want to delete this invitation?")) {
      axios
        .delete(`http://localhost:5000/api/invitation/delete/${id}`)
        .then((res) => {
          const del = invitation.filter((invitation) => id !== invitation._id);
          setInvitation(del);
          Swal.fire(
            "Done!",
            "Invitation Removed Successfully...",
            "success"
          ).then(() => {
            window.location.href = "/dashboard";
          });
        });
    }
  };

  // Invitation Model Form
  const [feedbackText, setFeedback] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (userData && userData.email) {
      setAuthor(userData.email);
    }
  }, [userData]);

  // Hnadle the Submit Feedback Button
  const handleFeedbackSend = () =>
  {
    // const formData = new FormData();
    // formData.append("author", author);
    // formData.append("reciever", reciever);
    // formData.append("feedbackText", feedbackText);

    const feedbackData = {
      author,
      reciever,
      feedbackText,
    };

    axios
      .post("http://localhost:5000/api/feedback/submit-feedback", feedbackData)
      .then((response) => {
        console.log("Feedback Sent Successfully...");

        Swal.fire({
          title: "Done!",
          text: "Feedback Sent Successfully!",
          icon: "success",
        }).then(() => {
          window.location.href = "/dashboard";
        });

        // setReciever("");
        setFeedback("");
        setShow(false);
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
        Swal.fire({
          title: "Oops!",
          text: "Feedback Sending Failed!",
          icon: "error",
        });
      });
  };

  return (
    <div className="invitation_block m-3">
      <div className="container">
        <h4>Invitations</h4>
        <p>
          Your feedback matters! Please take a moment to provide feedback on the
          invitations you've received. Your insights help us improve our
          services for you and our community.
        </p>
        <Card>
          <Card.Body>
          <div style={{ overflow: 'auto', maxHeight: '250px' }}>
            <table className="table">
              <thead className="thead">
                <tr>
                  <th scope="col">Invitee</th>
                  <th scope="col">Message</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {invitation.map((invitation) => (
                  <tr key={invitation._id}>
                    <td>{invitation.sender}</td>
                    {invitation.message && <td>{invitation.message}</td>}
                    <td>
                      <Button
                        className="viewBtn"
                        style={{ padding: "5px 20px" }}
                        onClick={() => handleShow(invitation)}
                      >
                        <EyeFill className="viewIcon" />
                      </Button>{" "}
                      <Button
                        className="deleteBtn"
                        onClick={() => removeInvitation(invitation._id)}
                      >
                        <Trash3Fill className="deleteIcon" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </Card.Body>
        </Card>

        {/* Invitation and Feedback Model */}
        <div>
          <Modal
            show={show}
            onHide={handleClose}
            style={{
              background: "linear-gradient(10deg, #83e6fc 0%, #d9acee 100%)",
            }}
            dialogClassName="custom-modal"
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
                Hi {userData.fname}, Provide your feedback here...
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                overflowY: "auto",
              }}
            >
              <div>
                <div className="invitation-container">
                  {selectedInvitation && (
                    <div>
                      This is {selectedInvitation.sender} <br />
                      Message: {selectedInvitation.message} <br />
                      <img
                        src={`/uploads/${selectedInvitation.snapshotImage}`}
                        alt="..."
                        style={{
                          width: "800px",
                          height: "391px",
                          margin: "10px 0",
                        }}
                      ></img>
                    </div>
                  )}
                </div>
                <br />
                <Form>
                  <div className="feedback-form">
                    <input type="hidden" value={author} />
                    <input type="hidden" value={reciever} />
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                      style={{
                        fontSize: "17px",
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      <Form.Label>Your Feedback</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={7}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="viewBtn"
                onClick={handleFeedbackSend}
                style={{
                  marginLeft: "0px",
                  fontSize: "15px",
                  fontFamily: "Trebuchet MS",
                }}
              >
                SEND FEEDBACK
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
    </div>
  );
};

export default Invitation;
