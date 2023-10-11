import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";

import { PDFDocument, rgb, StandardFonts  } from 'pdf-lib';

function UserForm() {

  // ============ USER REPORT ============
  const createPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Add a header to the PDF
    const headerContent = "DEVMIND";
    page.drawText(headerContent, { x: 200, y: 350, size: 50, color: rgb(0, 0, 1), alignment: 'center', lineHeight: 16, font: await pdfDoc.embedFont(StandardFonts.Helvetica), });

    const headerText2 = userData.fname + "'s Report";
    page.drawText(headerText2, {
      x: 210,
      y: 310, // Adjust the y position as needed
      size: 30, // Adjust the font size as needed
      color: rgb(0, 0, 0), // Black color
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      lineHeight: 12,
      maxWidth: 500,
      alignment: 'center',
    });

    // Add the main content to the PDF
    const mainContent1 = "User's First Name:  " + userData.fname;
    page.drawText(mainContent1, { x: 50, y: 250, size: 23, color: rgb(0, 0, 0) });

    const mainContent2 = "User's Last Name:  " + userData.lname;
    page.drawText(mainContent2, { x: 50, y: 220, size: 23, color: rgb(0, 0, 0) });

    const mainContent3 = "User's Email:  " + userData.email;
    page.drawText(mainContent3, { x: 50, y: 190, size: 23, color: rgb(0, 0, 0) });

    const mainContent4 = "User's Notifications Count:  " + invitationCount;
    page.drawText(mainContent4, { x: 50, y: 160, size: 23, color: rgb(0, 0, 0) });

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
    <div className="userform_container m-3">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="h-50"
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="h-50"
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="h-50"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              className="h-50"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="h-50"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
        <div className="buttons-user-db " style={{display: "flex", justifyContent: "space-between"}}>
          <Button variant="primary" type="submit" className="update-btn mt-3 mb-1">
            Update Profile
          </Button>

          <Button onClick={createPDF} className="btn mt-3 mb-1 ">
             Generate Report
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UserForm;