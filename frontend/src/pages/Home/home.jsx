import React, { useState, useEffect } from 'react';
import './style.css'; // Import your CSS styles here

function Home() {
  const [colorBoxes, setColorBoxes] = useState([]);

  useEffect(() => {
    const numberOfColorBoxes = 400;
    const colorBoxElements = [];

    for (let i = 0; i < numberOfColorBoxes; i++) {
      colorBoxElements.push(<div key={i} className="colorBox" />);
    }

    setColorBoxes(colorBoxElements);
  }, []);

  return (
    <div className="main_homecontainer">
      <div className="bgAnimation" id="bgAnimation">
        <div className="backgroundAmim"></div>
        {colorBoxes}
      </div>
      <div className="home_container">
        <nav>
          <h1>
            <span>Dev</span>Mind
          </h1>
          <ul>
            <a href="/">
              <li>Home</li>
            </a>
            <a href="/code-editor">
              <li>Get Started</li>
            </a>
            <a href="/register">
              <li>Register</li>
            </a>
          </ul>
        </nav>
        <section>
          <div className="textBox">
            <h1>
              <span>Make</span> something great.
            </h1>
            <br />
            <h4>
              Unlock Your Coding Potential with Our
              <br />
              AI-Powered JavaScript IDE for Beginners!
            </h4>
            <br />
            <p>
              Are you eager to embark on your coding journey?
              <br />
              <br />
              Discover the perfect companion in our online JavaScript IDE
              tailored for beginners.
              <br />
              Whether you're taking your first coding steps or seeking guidance
              from seasoned coders, we've got you covered.
            </p>
            <br />
            <a href="/code-editor">
              <button className="homeBtn" style={{ "--i": "#fff" }}>
                Get Started
              </button>
            </a>
          </div>
        </section>
      </div>
      {colorBoxes}
    </div>
  );
}

export default Home;
