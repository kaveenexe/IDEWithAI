import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Filemanager.css';
import { FileEarmarkPlus, Trash3Fill } from 'react-bootstrap-icons';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Filemanager = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [generatedReport, setGeneratedReport] = useState(null);
  const [content, setContent] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const extractCodeDetails = (content) => {
   
    const keywords = content.match(/\b(const|let|var|function|if|else)\b/g);
    const variables = content.match(/(\w+)\s*=/g);

    return { keywords, variables };
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/files')
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  const handleFileClick = (fileId) => {
    localStorage.setItem('fileId', fileId);
    setSelectedFileId(fileId);
  
    // Fetch the content of the selected file using its ID
    axios
      .get(`http://localhost:5000/api/files/${fileId}/content`)
      .then((response) => {
        onFileSelect(response.data.content);
  console.log(response.data.content);
        // Fetch file details after getting the content
        setContent(response.data.content);
        return axios.get(`http://localhost:5000/api/files/${fileId}/details`);
      })
      .then((responseDetails) => {
        setSelectedFileDetails(responseDetails.data);
      })
      .catch((error) => {
        console.error('Error fetching file content or details:', error);
        toast.error('Error fetching file content or details');
      });
  };
  
  const handleDeleteFile = (fileId) => {
    if (window.confirm('Are you sure you want to delete the file?')) {
      axios
        .delete(`http://localhost:5000/api/files/${fileId}`)
        .then(() => {
          setFiles((prevFiles) =>
            prevFiles.filter((file) => file._id !== fileId)
          );
          toast.success('File deleted successfully!');
        })
        .catch((error) => console.error('Error deleting file:', error));
    }
  };

  const handleCreateFile = () => {
    if (!newFileName.endsWith('.js')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File name must end with ".js"!',
      });
    } else {
      axios
        .post('http://localhost:5000/api/files', { name: newFileName })
        .then((response) => {
          setFiles((prevFiles) => [...prevFiles, response.data]);
          toast.success('File created successfully!');
          handleCloseModal();
          setNewFileName('');
        })
        .catch((error) => console.error('Error creating file:', error));
    }
  };


  const handleGenerateReport = (content) => {
    if (content) {
      const codeDetails = extractCodeDetails(content);
      const report = generateReport(content, codeDetails);
      setGeneratedReport(report);
      console.log(report);
    } else {
      // Handle the case when content is undefined
      // For example, you can show an error message or handle it as needed.
      console.error('Content is undefined or null.');
    }
  };  

  const generateReport = (content, codeDetails) => {
    return {
      fileName: selectedFileDetails.name,
      fileContent: content,
      createdDate: new Date(selectedFileDetails.createdDate).toLocaleDateString(),
      lastModifiedDate: new Date(selectedFileDetails.lastModifiedDate).toLocaleDateString(),
      fileType: 'JavaScript',
      keywords: codeDetails.keywords,
      variables: codeDetails.variables,
    };
  };

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
          <button className="btn text-light add-files" onClick={handleShowModal}>
            <FileEarmarkPlus />
          </button>

          <ToastContainer />
        </div>

        <ul>
          {files.map((file) => (
            <li
              key={file._id}
              className={`text-light mt-2 mb-2 filenames-delete ${
                selectedFileId === file._id ? 'selected-file' : ''
              }`}
            >
              <button
                id="filename"
                className="btn text-light"
                onClick={() => handleFileClick(file._id)}
              >
                <div>• {file.name}</div>
              </button>{' '}
              <button
                className="btn btnd"
                id="deletebtn"
                onClick={() => handleDeleteFile(file._id)}
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
              <br />
              <p>File Name: {selectedFileDetails.name}</p>
              <div>
                Created Date:{' '}
                {new Date(selectedFileDetails.createdDate).toLocaleDateString()}
              </div>
              <div>
                Last Modified Date:{' '}
                {new Date(selectedFileDetails.lastModifiedDate).toLocaleDateString()}
              </div>
              <div>
                Last Modified Time:{' '}
                {new Date(selectedFileDetails.lastModifiedDate).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </div>{' '}
            </div>
          )}
<button onClick={() => handleGenerateReport(content)}>Generate Report</button>
        </div>
        
      </div>
    </div>
  );
};

export default Filemanager;
