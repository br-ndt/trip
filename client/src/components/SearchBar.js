import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const submitSearch = (event) => {
    event.preventDefault();
    if (searchText.length > 0) setShouldRedirect(true);
  };
  const searchChange = (event) => {
    event.preventDefault();
    setSearchText(event.currentTarget.value);
  };

  if (shouldRedirect) {
    return <Redirect to={`/search?query=${searchText}`} />;
  }

  return (
    <form onSubmit={submitSearch}>
      <input
        value={searchText}
        type="text"
        name="search"
        id="search"
        placeholder="bannana"
        onChange={searchChange}
      />
      <input type="submit" />
    </form>
  );
};

export default SearchBar;
