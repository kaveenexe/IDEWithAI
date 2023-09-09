import React, { useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";
import "./Searchbar.css";

export const SearchBar = ({ setResults, selectedUserEmail }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(selectedUserEmail);
  }, [selectedUserEmail]);

  const fetchData = (value) => {
    fetch("http://localhost:8080/api/user")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.email &&
            user.email.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper-class">
      <div className="input-wrapper">
        <Search id="search-icon" />
        <input
          placeholder={
            selectedUserEmail
              ? selectedUserEmail
              : "Add people by email or username"
          }
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};
