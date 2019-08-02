import React from "react";

function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="book">Search:</label>
        <input
          value={props.search}
          onChange={props.handleInputChangeSearch}
          name="book"
          type="text"
          className="form-control"
          placeholder="Type book or author to search"
          id="book"
        />
        <button type="submit" onClick={props.handleFormSubmitSearch} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
