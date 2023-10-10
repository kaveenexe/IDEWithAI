import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filemanager.css";
import { FileEarmarkPlus, Trash3Fill } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Filemanager = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [newFileName, setNewFileName] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");

  useEffect(() => {
    // Replace with the actual API endpoint to fetch files
    axios
      .get("http://localhost:5000/api/files")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => console.error("Error fetching files:", error));
  }, [files]);

  const handleFileClick = (fileId) => {

    localStorage.setItem("fileId", fileId);

    // Fetch the content of the selected file using its ID
    axios
    .get(`http://localhost:5000/api/files/${fileId}/content`)
    .then((response) => {
      // Pass the content to the parent component (CodeEditor)
      onFileSelect(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching file content:", error);
        // Display an error toast notification
        toast.error("Error fetching file content");
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
    // Prompt the user for the new file name
    const newFileName = prompt("Enter a new file name:");
    if (newFileName === null || newFileName.trim() === "") {
      // Check if the user canceled or entered an empty name
      return;
    }
    // Send a POST request to create a new file
    axios
      .post("http://localhost:5000/api/files", { name: newFileName })
      .then((response) => {
        setFiles((prevFiles) => [...prevFiles, response.data]);
        // Display a success toast notification
        toast.success("File created successfully!");
      })
      .catch((error) => console.error("Error creating file:", error));
  };

  return (
    <div>
      <div className="main">
        <h2>File Manager</h2>
        <div className="file-input">
          <button className="btn" onClick={handleCreateFile}>
            <FileEarmarkPlus />
          </button>
          {/* ToastContainer to display the notifications */}
          <ToastContainer />
        </div>
        <ul>
          {files.map((file) => (
            <li key={file._id}>
              <button className="btn" onClick={() => handleFileClick(file._id)}>
                {file.name}
              </button>{" "}
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDeleteFile(file._id)} // Attach delete function
              >
                <Trash3Fill />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filemanager;
