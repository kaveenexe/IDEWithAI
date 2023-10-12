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
  // Make a GET request to your backend API
  axios
    .get(`http://localhost:5000/api/feedback/by-author/${userData.email}`)
    .then((response) => {
      // Check if there is feedback data in the response
      if (response.data.feedback) {
        // Make sure it's an array
        const feedbackArray = Array.isArray(response.data.feedback)
          ? response.data.feedback
          : [response.data.feedback];
        // Set the feedback data when the data is received
        setFeedback(feedbackArray);
      } else {
        // If there is no feedback, set an empty array
        setFeedback([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching feedback data:", error);
    });
}, []);



  return (
    <div className="invitation_block m-3">
      <div className="container">
        <h4>Feedbacks</h4>
        <p>
          Thank you for helping the community to grow!! Keep coding, keep learning, and keep evolving!
        </p>
        <Card>
          <Card.Body>
          <div style={{ overflow: 'auto', maxHeight: '250px' }}>
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
                    <td>{feedback.author}</td>
                    <td>{feedback.feedbackText}</td>
                    <td>
                      <Button
                        className="deletebtn"
                        variant="danger"
                        // onClick={() => removeFeedback(feedback._id)}
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
      </div>
    </div>
  );
};

export default Feedback;
