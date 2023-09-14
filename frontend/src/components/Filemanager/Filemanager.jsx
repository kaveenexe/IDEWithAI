import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filemanager.css";
import { FileEarmarkPlus, Trash3Fill } from "react-bootstrap-icons";

const Filemanager = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Replace with the actual API endpoint to fetch files
    axios
      .get("http://localhost:5000/api/files")
      .then((response) => {
        setFiles(response.data);
        // console.log(response.data);
      })

      .catch((error) => console.error("Error fetching files:", error));
  }, [files]);

  const handleFileClick = (fileId) => {
    // Here, you can define what should happen when a file is clicked.
    // For example, you can open the file content or navigate to a new page.
    // This function can be customized based on your application's requirements.
    console.log(`Clicked on file with ID: ${fileId}`);
  };

  const handleDeleteFile = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      // Send a DELETE request to delete the file
      axios
        .delete(`http://localhost:5000/api/files/${fileId}`)
        .then(() => {
          // Remove the deleted file from the state
          setFiles((prevFiles) =>
            prevFiles.filter((file) => file._id !== fileId)
          );
        })
        .catch((error) => console.error("Error deleting file:", error));
    }
  };

  return (
    <div>
      <div className="main">
        <h2>File Manager</h2>
        <button className="btn">
          <FileEarmarkPlus />
        </button>
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
