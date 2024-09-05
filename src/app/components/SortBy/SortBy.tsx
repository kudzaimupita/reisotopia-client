"use client";

import React from "react";
import "./SortBy.css";

interface SortByProps {
  options: { value: string; label: string }[];
  selectedOption: string;
  onSortChange: (value: string) => void;
}

const SortBy: React.FC<SortByProps> = ({
  options,
  selectedOption,
  onSortChange,
}) => {
  return (
    <div className="search-bar-field">
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={selectedOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;
