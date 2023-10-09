import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Swal from "sweetalert2";

function UserForm() {
  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { user } = useAuthContext();

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

          <Button className="btn mt-3 mb-1 ">
            Generate Report
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UserForm;
