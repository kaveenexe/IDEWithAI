import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import { PDFDocument, rgb, StandardFonts  } from 'pdf-lib';

function UserForm() {
  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { user } = useAuthContext();

  // ============ USER FORM ============
  // Input validation
  const nameRegex = /^[A-Za-z\s]+$/; // Only allows letters and spaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Password must contain at least one number, one lowercase and one uppercase letter, and be at least 8 characters long

  // Create state to manage form input values
  const [formData, setFormData] = useState({
    fname: userData.fname || "",
    lname: userData.lname || "",
    email: userData.email || "",
    password: "",
    confirmPassword: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        timer: 3500,
        title: "Passwords do not match",
      });
      return;
    }

    // Validate fname and lname
  if (!formData.fname.match(nameRegex) || !formData.lname.match(nameRegex)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid name',
      text: 'Name must only contain letters and spaces',
    });
    return;
  }

  // Validate email
  if (!formData.email.match(emailRegex)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid email',
      text: 'Please enter a valid email address',
    });
    return;
  }

  // Check if passwords match (only if a password is provided)
  if (formData.password && formData.password !== formData.confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Passwords do not match',
    });
    return;
  }

   // Validate password (only if a password is provided)
   if (formData.password && !formData.password.match(passwordRegex)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid password',
      text:
        'Password must contain at least one number, one lowercase and one uppercase letter, and be at least 8 characters long',
    });
    return;
  }

    try {
      // Send a PUT request to update user data
      const response = await axios.put(
        `http://localhost:5000/api/user/update/${userData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      //Handle Success
      Swal.fire({
        icon: "success",
        title: "User updated successfully",
        timer: 2500,
        showConfirmButton: false,
      });

      // Handle success, you can show a success message or perform other actions
      console.log("User updated successfully", response.data);
    } catch (error) {
      // Handle error, display an error message or perform other actions
      console.error("Error updating user:", error.response.data.error);
      // Handle error
      Swal.fire({
        icon: "error",
        title: "Error updating user",
        text: error.response.data.error,
      });
    }
  };

  // ============ GET USER NOTOFICATION COUNT ============
  const [invitationCount, setInvitationCount] = useState(0);

  useEffect(() => {
    // Replace 'your-email' with the actual email you want to count invitations for
    const email = 'your-email';

    // Make a GET request to fetch the invitation count
    axios.get(`http://localhost:5000/api/invitation/count/${userData.email}`)
      .then((response) => {
        const count = response.data.count;
        setInvitationCount(count); // Update the count state with the retrieved value
        console.log('Invitation Count:', count);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/files/count`)
      .then((response) => {
        setFileCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching file count:", error);
      });
  }, []);
  

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

    const fileCountContent = "Your Current File Count is:  " + fileCount;
    page.drawText(fileCountContent, { x: 50, y: 130, size: 23, color: rgb(0, 0, 0) });

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
