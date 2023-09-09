import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { PlayFill, PersonPlusFill } from "react-bootstrap-icons";
import "./style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { SearchBar } from "../../components/Searchbar/SearchBar";
import { SearchResultsList } from "../../components/Searchbar/SearchResultsList";

const CodeEditor = () => {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState('console.log("Hello, world!");');
  const [iframe, setIframe] = useState(null); // Keep track of the iframe

  //Invitation Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handle API Call Users
  const [results, setResults] = useState([]);

  const [ selectedUserEmail, setSelectedUserEmail ] = useState( "" );
  
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

    setIframe(newIframe); // Set the new iframe in the state
  };

  return (
    <div className="container justify-content-center">
      <div className="codeeditor_maincontainer ">
        <div className="upper_container d-flex justify-content-between">
          <div className="language_label bg-light rounded-3 mt-2 mb-2 border border-3">
            <p className="language_name">Language: Javascript</p>
          </div>
          <Button className="btn_invite" variant="light" onClick={handleShow}>
            Invite <PersonPlusFill />
          </Button>
          <button className="btn btn-primary run_btn" onClick={handleRunClick}>
            Run <PlayFill />
          </button>
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
      </div>
    </div>
  );
};

export default CodeEditor;
