import React, { useState, useEffect } from "react";
import SortBy from "../SortBy/SortBy";
import { useDispatch } from "react-redux";
import { setPriceRange, setQuery, setSort } from "@/app/pages/store";
import Slider from "../Slider/Slider";
import { RootState } from "@/app/store";
import { useAppSelector } from "@/app/store/hook";
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
  const [name, setName] = useState<string>("");

  const { sort, minPrice, maxPrice } = useAppSelector(
    (state: RootState) => state.hotelsList.data.tableData
  );

  const debouncedSearch = debounce((query: string) => {
    dispatch(setQuery(query));
  }, 300);

  useEffect(() => {
    debouncedSearch(name);
  }, [name]);

  return (
    <div className="search-bar">
      <div className="search-bar-field">
        <label>Search Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Where are you going?"
        />
      </div>
      <div className="search-bar-field">
        <label>Min Price By:</label>
        <div style={{ marginTop: "10px" }}>
          <Slider
            minRange={0}
            maxRange={500}
            step={50}
            initialMinValue={minPrice}
            initialMaxValue={maxPrice}
            onChange={(minPrice, maxPrice) =>
              dispatch(setPriceRange({ minPrice, maxPrice }))
            }
          />
        </div>
      </div>
      <SortBy
        selectedOption={sort}
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
