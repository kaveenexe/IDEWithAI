import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Spinner } from "react-bootstrap";
import { PlayFill, SaveFill, PersonPlusFill, Robot } from "react-bootstrap-icons";
import axios from "axios";

import Button from "react-bootstrap/Button";
import "./style.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { SearchBar } from "../../components/Searchbar/SearchBar";
import { SearchResultsList } from "../../components/Searchbar/SearchResultsList";

const CodeEditor = () => {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState('console.log("Hello, world!");');

  const [userContent, setUserContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframe, setIframe] = useState(null); // Keep track of the iframe

  //Invitation Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handle API Call Users
  const [results, setResults] = useState([]);

  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  const handleUserSelect = (email) => {
    setSelectedUserEmail(email);
  };


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
    axios
      .post("http://localhost:5000/api/ide/save-code", { code })
      .then((response) => {
        console.log("Code saved successfully!");
        // Optionally, you can clear the code editor here
        // setCode('');
      })
      .catch((error) => {
        console.error("Error saving code:", error);
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

  return (
    <div className="container justify-content-center">
      <div className="codeeditor_maincontainer ">
      <div className="upper_container d-flex justify-content-between">
          <div className="language_label bg-light rounded-3 mt-2 mb-2 border border-3">
            <p className="language_name">Language: Javascript</p>
          </div>

          <div>
            <button
              className="btn btn-outline-dark btn_invite"
              variant="light"
              onClick={handleShow}
            >
              Invite <PersonPlusFill />
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
              <Modal.Title>Multiplayers in DevMind</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                >
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                CLOSE
              </Button>
              <Button variant="primary" onClick={handleClose}>
                SEND
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="template d-flex align-items-center bg-white">
          <div className="">
            <CodeMirror
              className="console_container"
              value={code}
              height="450px"
              width="700px"
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => setCode(value)}
              theme={dracula}
            />
          </div>

          <div className="output_container bg-light rounded">
            <p className="output_p">Output:</p>
            <pre className="output_pre">{output}</pre>
          </div>
        </div>
        {isLoading ? (
          <button className="btn btn-primary run_btn explain_btn">
            <Spinner animation="border" role="status" />
          </button>
        ) : (
          <button
            className="btn btn-primary run_btn explain_btn"
            onClick={handleAIExplain}
          >
            Explain <Robot />
          </button>
        )}

        <div className="ai-suggestions">{userContent}</div>
      </div>
    </div>
  );
};

export default CodeEditor;
