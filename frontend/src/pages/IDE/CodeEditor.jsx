import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { PlayFill } from "react-bootstrap-icons";
import "./style.css";

const CodeEditor = () => {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState('console.log("Hello, world!");');
  const [iframe, setIframe] = useState(null); // Keep track of the iframe

  const handleRunClick = () => {
    // Remove the previous iframe (if it exists)
    if (iframe) {
      document.body.removeChild(iframe);
    }

    // Create a new iframe
    const newIframe = document.createElement("iframe");
    newIframe.style.display = "none";
    document.body.appendChild(newIframe);

    newIframe.contentWindow.console = {
      log: (...args) => {
        setOutput(args.join(" ") + "\n");
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
          <button className="btn btn-primary run_btn" onClick={handleRunClick}>
            Run <PlayFill />
          </button>
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
