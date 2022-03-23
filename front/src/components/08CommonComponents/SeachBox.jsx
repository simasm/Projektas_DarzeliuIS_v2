import React from "react";
import "../../App.css";

const SearchBox = ({
  value,
  onSearch,
  placeholder,
  onFocus,
  onBlur,
  style,
}) => {
  return (
    <input
      type="text"
      className="form-control my-3 searchbox"
      placeholder={placeholder}
      value={value}
      onChange={onSearch}
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
    />
  );
};

export default SearchBox;
