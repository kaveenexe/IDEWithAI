// SearchResultsList.jsx
import React, { useState } from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, onUserSelect }) => {
  const [showResults, setShowResults] = useState(true); // Add state to control visibility

  const handleClick = (result) => {
    onUserSelect(result.email);
    setShowResults(false); // Close the dropdown when a user is selected
  };

  return (
    <div className="results-list">
      {showResults && (
        <div>
          {results.map((result, id) => {
            return (
              <SearchResult
                result={result}
                key={id}
                onSelect={() => handleClick(result)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
