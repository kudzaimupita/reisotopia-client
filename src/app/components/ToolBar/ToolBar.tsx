import React, { useState, useEffect } from "react";
import SortBy from "../SortBy/SortBy";
import { useDispatch } from "react-redux";
import { setQuery, setSort } from "@/app/pages/store";
import "./Toolbar.css";

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const [destination, setDestination] = useState<string>("");

  const debouncedSearch = debounce((query: string) => {
    dispatch(setQuery(query));
  }, 500);

  useEffect(() => {
    debouncedSearch(destination);
  }, [destination]);

  return (
    <div className="search-bar">
      <div className="search-bar-field">
        <label>Search Name:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Where are you going?"
        />
      </div>
      <SortBy
        onSortChange={(value) => dispatch(setSort(value))}
        options={[
          { value: "name-asc", label: "Name A-Z" },
          { value: "name-desc", label: "Name Z-A" },
          { value: "minPrice-asc", label: "Min Price Low-High" },
          { value: "minPrice-desc", label: "Min Price High-Low" },
        ]}
      />
    </div>
  );
};

export default Toolbar;
