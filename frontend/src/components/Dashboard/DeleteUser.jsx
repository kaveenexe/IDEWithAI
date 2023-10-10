import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Swal from "sweetalert2";
import axios from "axios";

function DeleteUser() {

    const { user } = useAuthContext();
    const { logout } = useLogout();

  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  const navigate = useNavigate();;

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/user/delete/${userData._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        // Log the user out and redirect to the home page
        navigate('/');
        logout();
      } catch (error) {
        Swal.fire(
          "Error!",
          "An error occurred while deleting your account.",
          "error"
        );
        console.error(error);
      }
    }
  };
  return (
    <div>
      <Button variant="danger" onClick={handleDeleteAccount} className="m-3 mt-2">
        Delete My Account
      </Button>
    </div>
  )
}

export default DeleteUser;
