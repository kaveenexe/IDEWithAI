import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import {Trash3Fill, EyeFill} from "react-bootstrap-icons";
import "./Style.css";

const Invitation = () =>
{
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData.email);

  // Get Invitations
  const [invitation, setInvitation] = useState([]);

  useEffect(() => {
    axios
      //.get(`http://localhost:5000/api/invitation/${userData.email}`)
      .get("http://localhost:5000/api/invitation/gehan@gmail.com")
      .then((response) => {
        setInvitation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Delete Invitation
  const removeInvitation = (id) => {
    const invitationToDelete = invitation.filter((invitation) => invitation._id === id);
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
            <table className="table">
              <thead className="thead">
                <tr>
                  <th scope="col">Invitee</th>
                  <th scope="col">Message</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className='tbody'>
                {invitation.map((invitation) => (
                  <tr key={invitation._id}>
                    <td>{invitation.sender}</td>
                    <td>{invitation.message}</td>
                    <td>
                      <Button
                        className="viewBtn"
                        variant="primary"
                        style={{ padding: "5px 20px" }}
                        onClick={() => removeInvitation(invitation._id)}
                      >
                        <EyeFill className="viewIcon" />
                      </Button>{" "}
                      <Button
                        className="deleteBtn"
                        variant="danger"
                        onClick={() => removeInvitation(invitation._id)}
                      >
                        <Trash3Fill className="deleteIcon" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Invitation;