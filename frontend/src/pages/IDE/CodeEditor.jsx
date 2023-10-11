import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

import Filemanager from "../../components/Filemanager/Filemanager";
import { Spinner } from "react-bootstrap";
import {
  PlayFill,
  SaveFill,
    QuestionCircleFill,
  Robot,
  RocketTakeoff,
} from "react-bootstrap-icons";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./style.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { SearchBar } from "../../components/Searchbar/SearchBar";
import { SearchResultsList } from "../../components/Searchbar/SearchResultsList";
import Swal from "sweetalert2";

const CodeEditor = () => {
  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log( userData.email );

  // Invitation Model Form
  const [message, setMessage] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  useEffect(() => {
    if (userData && userData.email) {
      setSenderEmail(userData.email);
    }
  }, [userData]);

  const handleUserSelect = (email) => {
    setSelectedUserEmail(email);
  };

  // Image upload
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  // Code Editor
  const [output, setOutput] = useState("");
  const [code, setCode] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState(null);

  const [userContent, setUserContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframe, setIframe] = useState(null); // Keep track of the iframe

  //Invitation Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handle API Call Users
  const [results, setResults] = useState([]);

   const handleFileSelect = (content) => {
    // Set the content of the selected file in the CodeMirror editor
    setCode(content);
  }

  const handleRunClick = () => {
    // Remove the previous iframe (if it exists)
    if (iframe) {
      document.body.removeChild(iframe);
    }

    // Create a new iframe
    const newIframe = document.createElement("iframe");
    newIframe.style.display = "none";
    document.body.appendChild(newIframe);

    let aggregatedOutput = ""; // Initialize an empty output

    newIframe.contentWindow.console = {
      log: (...args) => {
        // Accumulate the output
        aggregatedOutput += args.join(" ") + "\n";
        setOutput(aggregatedOutput);
      },
    };

    const script = document.createElement("script");
    script.text = code;
    newIframe.contentDocument.body.appendChild(script);
    setIframe(newIframe);
  };

    const handleSaveClick = () => {
      // Ensure there's content to save
      if (!code) {
        console.log("No code to save.");
        return;
      }

    const id = localStorage.getItem("fileId");
      // Send a PUT request to update the file content
      axios
        .put(`http://localhost:5000/api/files/${id}/content`, {
          content: code,
        })
        .then((response) => {
          toast.success("Code updated successfully!");
        })
        .catch((error) => {
          toast.success("Error saving code:", error);
        });
    };

  const handleAIExplain = () => {
    const USER_PROMPT = `Code:${code}`;

    if (code.trim() === "") {
      alert("Please write some code first!");
      return;
    } else {
      setIsLoading((prev) => !prev);

      fetch("http://localhost:5000/api/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userContent: {
            role: "user",
            content: USER_PROMPT,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserContent(data.text);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading((prev) => !prev);
        });
    }
  };

  // Hnadle the Invitation Send Button
  const handleInvitationSend = () => {
    const formData = new FormData(); 
    formData.append( "sender", senderEmail );
    formData.append("email", selectedUserEmail);
    formData.append("message", message);
    formData.append("snapshotImage", fileName);

    axios
      .post("http://localhost:5000/api/invitation/create-invite", formData)
      .then((response) => {
        console.log("Invitation Send Successfully...");

        Swal.fire({
          title: "Done!",
          text: "Invitation Send Successfully...",
          icon: "success",
        }).then(() => {
          window.location.href = "/code-editor";
        });

        setSelectedUserEmail("");
        setMessage("");
        setShow(false);
      })
      .catch((error) => {
        console.error("Error sending invitation:", error);

        Swal.fire({
          title: "Oops!",
          text: "Failed to send the Invitation!",
          icon: "error",
        });
      });
  };

  return (
    <>
     
      <Filemanager onFileSelect={handleFileSelect} />


      <div className="container justify-content-center">
        <div className="codeeditor_maincontainer">
          <div className="upper_container d-flex justify-content-between">
            <div className="language_label rounded-3 mt-2 mb-2 border border-secondary border-2">
              <p className="language_name">Language: JavaScript</p>
            </div>

            <div>
              <button
                className="btn btn-outline-light btn_invite"
                variant="light"
                onClick={handleShow}
              >

                Get Help <QuestionCircleFill />

              </button>
              <button
                className="btn btn-primary run_btn"
                onClick={handleRunClick}
              >
                Run <PlayFill />
              </button>
              <button
                className="btn btn-success save_btn"
                onClick={handleSaveClick}
              >
                Save <SaveFill />
              </button>
            </div>

          </div>
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title
                  style={{
                    fontSize: "25px",
                    fontFamily: "Trebuchet MS",
                    fontWeight: "700",
                  }}
                >
                  Multiplayers in DevMind
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input type="hidden" value={senderEmail} />
                <div className="search-bar-container">
                  <SearchBar
                    setResults={setResults}
                    selectedUserEmail={selectedUserEmail}
                  />
                  <SearchResultsList
                    results={results}
                    onUserSelect={handleUserSelect}
                  />
                </div>
                <div>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    style={{
                      fontSize: "17px",
                      fontFamily: "Trebuchet MS",
                    }}
                  >
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div>
                  <Form.Group
                    controlId="formFile"
                    className="mb-1"
                    style={{
                      marginLeft: "0px",
                      fontSize: "17px",
                      fontFamily: "Trebuchet MS",
                    }}
                  >
                    <Form.Label>Snapshot of the code (Optional)</Form.Label>
                    <Form.Control
                      type="file"
                      style={{
                        marginLeft: "0px",
                      }}
                      name="snapshotImage"
                      onChange={onChangeFile}
                    />
                  </Form.Group>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <a href="/community">
                    <Button variant="success" onClick={handleClose}>
                      <RocketTakeoff /> DISCOVER MORE GUESTS
                    </Button>
                  </a>
                </div>
                <Button variant="primary" onClick={handleInvitationSend}>
                  SEND
                </Button>
              </Modal.Footer>
            </Modal>
          </div>


          <div className="template d-flex align-items-center">
            <div className="">
              <CodeMirror
                className="console_container"
                value={selectedFileContent || code}
                height="450px"
                width="700px"
                extensions={[javascript({ jsx: true })]}
                onChange={(value) => setCode(value)}
                theme={dracula}
              />
            </div>

            <div className="output_container text-light rounded">
              <p className="output_p">Output:</p>
              <pre className="output_pre">{output}</pre>
            </div>
          </div>
          {isLoading ? (
            <button className="btn btn-primary run_btn explain_btn">
              <Spinner animation="border" role="status" />
            </button>
          ) : (
            <div className="ai-explain-btn">
              <button
              className="btn btn-outline-light run_btn explain_btn"
              onClick={handleAIExplain}
            >
              Explain <Robot />
            </button>
            <div className="ai-suggestions">{userContent}</div>
            </div>
            
          )}

          
        </div>

        
      </div>
    </>
  );
};

export default CodeEditor;
