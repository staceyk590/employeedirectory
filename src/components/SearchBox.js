import React from "react";
import "../styles/SearchBox.css";

function SearchBox({ handleSearchChange, handleSubmit }) {
  return (
    <div className="searchbox">
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => handleSearchChange(e)}
        />
        <button className="btn my-2 my-sm-0" type="submit" onClick={e => handleSubmit(e)} >
          Search
        </button>
      </form>
    </div>
  );
}
export default SearchBox;