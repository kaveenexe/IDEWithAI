import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { Trash3Fill } from "react-bootstrap-icons";
import "./Styles-Feedback.css";
import { PDFDocument, rgb, StandardFonts  } from 'pdf-lib';

const Feedback = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData.email);

  // Get Feedback
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Make a GET request to your backend API
    axios
      .get(`http://localhost:5000/api/feedback/by-reciever/${userData.email}`)
      .then((response) => {
        // Set the feedback data when the data is received
        setFeedback(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, []);

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

  // REPORT GENERATION =============
  // ============ USER REPORT ============
  const createPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    // Add a header to the PDF
    const headerContent = "DEVMIND";
    page.drawText(headerContent, { x: 200, y: 750, size: 50, color: rgb(0, 0, 1), alignment: 'center', lineHeight: 16, font: await pdfDoc.embedFont(StandardFonts.Helvetica), });

    const headerText2 = userData.fname + "'s Report";
    page.drawText(headerText2, {
      x: 210,
      y: 720, // Adjust the y position as needed
      size: 27, // Adjust the font size as needed
      color: rgb(0, 0, 0), // Black color
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      lineHeight: 12,
      maxWidth: 500,
      alignment: 'center',
    });

    // Add the main content to the PDF
    const mainContent1 = "User's First Name:  " + userData.fname;
    page.drawText(mainContent1, { x: 50, y: 665, size: 23, color: rgb(0, 0, 0) });

    const mainContent2 = "User's Last Name:  " + userData.lname;
    page.drawText(mainContent2, { x: 50, y: 645, size: 23, color: rgb(0, 0, 0) });

    const mainContent3 = "User's Email:  " + userData.email;
    page.drawText(mainContent3, { x: 50, y: 625, size: 23, color: rgb(0, 0, 0) });

    const feedbackContent = feedback.map((fb) => {
      return `\nReciever: ${fb.reciever}\nAuthor: ${fb.author}\nFeedback: ${fb.feedbackText}`;
    });
    
    const mainContent4 = "Your Feedbacks: \n" + feedbackContent.join("\n");
    page.drawText(mainContent4, { x: 50, y: 595, size: 20, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Set the default name for the downloaded PDF
    const suggestedFileName = 'my_report.pdf';

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = suggestedFileName;
    downloadLink.click();

    const newWindow = window.open(url);
    if (newWindow) {
      newWindow.document.title = 'Print Preview';
      newWindow.document.write(
        `<iframe width="100%" height="100%" src="${url}" frameborder="0"></iframe>`
      );
      newWindow.document.close();
      newWindow.print();
    } else {
      alert("Please allow pop-ups for this website to print the PDF.");
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
          <div style={{ overflow: 'auto', maxHeight: '200px' }}>
            <table className="table">
              <thead className="thead">
                <tr>
                  <th scope="col">Author</th>
                  <th scope="col">Feedback</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {/* {feedback.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>{feedback.author}</td>
                    <td>{feedback.feedbackText}</td>
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
                ))} */}
              </tbody>
            </table>
            </div>
          </Card.Body>
        </Card>
        <div className="d-flex flex-row-reverse mt-3"> 
          <Button className="btn-prymary" onClick={createPDF}>Generate Report</Button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
