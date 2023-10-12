import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { Trash3Fill } from "react-bootstrap-icons";
import "./Styles-Feedback.css";

const Feedback = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData.email);

  // Get Feedback
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/feedback/by-reciever/${userData.email}`)
      .then((response) => {
        console.log("Feedback Data:", response.data);
        setFeedback(response.data.feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.email]);

  // Delete Feedbacks
  const removeFeedback = (id) => {
    const feedbackToDelete = feedback.filter((feedback) => feedback._id === id);
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      axios
        .delete(`http://localhost:5000/api/feedback/delete/${id}`)
        .then((res) => {
          const del = feedback.filter((feedback) => id !== feedback._id);
          setFeedback(del);
          Swal.fire(
            "Done!",
            "Feedback Removed Successfully...",
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
        <h4>Feedbacks</h4>
        <p>
          Embrace these feedbacks as stepping stones on your path to coding
          greatness. Keep coding, keep learning, and keep evolving!
        </p>
        <Card>
          <Card.Body>
            <table className="table">
              <thead className="thead">
                <tr>
                  <th scope="col">Author</th>
                  <th scope="col">Feedback</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {feedback.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>{feedback.sender}</td>
                    <td>{feedback.message}</td>
                    <td>
                      <Button
                        className="deletebtn"
                        variant="danger"
                        onClick={() => removeFeedback(feedback._id)}
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
};

export default Feedback;
