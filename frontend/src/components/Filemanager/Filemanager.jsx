import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filemanager.css";
import { FileEarmarkPlus, Trash3Fill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Filemanager = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Replace with the actual API endpoint to fetch files
    axios
      .get("http://localhost:5000/api/files")
      .then((response) => {
        setFiles(response.data);
      })
      // console.log(response.data);
      .catch((error) => console.error("Error fetching files:", error));
  }, [files]);

  const handleFileClick = (fileId) => {
    localStorage.setItem("fileId", fileId);
    setSelectedFileId(fileId);

    // Fetch the content of the selected file using its ID
    axios
      .get(`http://localhost:5000/api/files/${fileId}/content`)
      .then((response) => {
        onFileSelect(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching file content:", error);
        toast.error("Error fetching file content");
      });

    // Fetch file details
    axios
      .get(`http://localhost:5000/api/files/${fileId}/details`)
      .then((response) => {
        setSelectedFileDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching file details:", error);
      });
  };

  const handleDeleteFile = (fileId) => {
    if (window.confirm("Are you sure you want to delete file?")) {
      // Send a DELETE request to delete the file
      axios
        .delete(`http://localhost:5000/api/files/${fileId}`)
        .then(() => {
          // Remove the deleted file from the state

          setFiles((prevFiles) =>
            prevFiles.filter((file) => file._id !== fileId)
          );
          // Display a success toast notification
          toast.success("File deleted successfully!");
        })
        .catch((error) => console.error("Error deleting file:", error));
    }
  };

  const handleCreateFile = () => {
    if (!newFileName.endsWith(".js")) {
      // alert("File name must end with '.js'");

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'File name must end with ".js"!',
      });
    } else {
      // Send a POST request to create a new file
      axios
        .post("http://localhost:5000/api/files", { name: newFileName })
        .then((response) => {
          setFiles((prevFiles) => [...prevFiles, response.data]);
          // Display a success toast notification
          toast.success("File created successfully!");
          // Close the modal
          handleCloseModal();

          setNewFileName("");
        })
        .catch((error) => console.error("Error creating file:", error));
    }
  };

  // const handleCreateFile = () => {
  //   // Prompt the user for the new file name
  //   const newFileName = prompt("Enter a new file name:");
  //   if (newFileName === null || newFileName.trim() === "") {
  //     // Check if the user canceled or entered an empty name
  //     return;
  //   }

  //   // Check if the newFileName ends with ".js"
  //   if (!newFileName.endsWith(".js")) {
  //     alert("File name must end with '.js'");
  //     return;
  //   }

  //   // Send a POST request to create a new file
  //   axios
  //     .post("http://localhost:5000/api/files", { name: newFileName })
  //     .then((response) => {
  //       setFiles((prevFiles) => [...prevFiles, response.data]);
  //       // Display a success toast notification
  //       toast.success("File created successfully!");
  //     })
  //     .catch((error) => console.error("Error creating file:", error));
  // };

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter a new file name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateFile}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="main">
        <h2 className="text-light">File Manager</h2>

        <div className="file-input">
          <button className="mybutton" onClick={handleShowModal}>
            <h2 className="h2">Create File</h2>
          </button>
          <button
            className="btn text-light add-files"
            onClick={handleShowModal}
          >
            <FileEarmarkPlus />
          </button>

          {/* ToastContainer to display the notifications */}
          <ToastContainer />
        </div>

        <ul>
          {files.map((file) => (
            <li
              key={file._id}
              className={`text-light mt-2 mb-2 filenames-delete ${
                selectedFileId === file._id ? "selected-file" : ""
              }`}
            >
              <button
                id="filename"
                className="btn text-light"
                onClick={() => handleFileClick(file._id)}
              >
                <div>• {file.name}</div>
              </button>{" "}
              <button
                className="btn btnd"
                id="deletebtn"
                onClick={() => handleDeleteFile(file._id)} // Attach delete function
              >
                <Trash3Fill className="trashbtn" />
              </button>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <div className="details">
          <h3 className="fldetails">File Details</h3>
          {selectedFileDetails && (
            <div className="file-details">
              {/* <h3>File Details</h3> */}
              <br />
              <p>File Name: {selectedFileDetails.name}</p>
              <div>
                Created Date:{" "}
                {new Date(selectedFileDetails.createdDate).toLocaleDateString()}
              </div>
              <div>
                Last Modified Date:{" "}
                {new Date(
                  selectedFileDetails.lastModifiedDate
                ).toLocaleDateString()}
              </div>
              <div>
                Last Modified Time:{" "}
                {new Date(
                  selectedFileDetails.lastModifiedDate
                ).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filemanager;
