import React from "react";

const SearchBox = ({ value, onSearch, placeholder, onFocus, onBlur }) => {
  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder={placeholder}
      value={value}
      onChange={onSearch}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default SearchBox;
