import React from 'react';
import './style.css';

const Community = () => {
  return (
    <div>
      <div className="bg">
        <div className="heading-container">
          <h1>DevMind Developers</h1>
          <h1>Community</h1>
          <div className="para-div">
            <p>
              A place where passionate developers unite to share knowledge,
              collaborate on coding projects, and support one another on their
              coding journeys. Whether you're a seasoned pro or just starting
              your coding adventure, our community is the perfect space to
              connect, learn, and grow together. Join us today and become part
              of a thriving community of developers dedicated to helping each
              other succeed in the world of programming.
            </p>
            <a href="/code-editor">
              <button className="homeBtn" style={{ "--i": "#fff" }}>
                Explore
              </button>
            </a>
          </div>
        </div>
      </div>

      <div>
        <h3>Hi Kaveen</h3>
      </div>

    </div>
  );
}

export default Community