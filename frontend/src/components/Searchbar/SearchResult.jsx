import React from "react";
import "./SearchResultsList.css";

export const SearchResult = ({ result, onSelect }) => {
  const handleClick = () => {
    onSelect(result.email);
  };

  return (
    <div className="search-results" onClick={handleClick}>
      {result.email}
    </div>
  );
};
