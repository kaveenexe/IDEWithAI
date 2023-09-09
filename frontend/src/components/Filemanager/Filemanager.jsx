import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filemanager.css";
import { FileEarmarkPlus , Trash3Fill } from "react-bootstrap-icons";


const Filemanager = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Replace with the actual API endpoint to fetch files
    axios.get("http://localhost:5000/api/files")
      .then((response) => {
        setFiles(response.data)
      // console.log(response.data);
      })
      
      .catch((error) => console.error("Error fetching files:", error));
  }, [files]);

  return (
    <div>
      <div className="main">
        <h2>File Manager</h2>
        <button><FileEarmarkPlus  /></button>
        <ul>
          {files.map((file) => (
            <li key={file._id}>
              {file.name} <button><Trash3Fill  /></button>
              {/* <button onClick={() => handleUpdate(file._id)}>Update</button>
              <button onClick={() => handleDelete(file._id)}>Delete</button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filemanager;
