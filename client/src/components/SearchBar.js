import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const [redirect, setRedirect] = useState("");

  const submitSearch = (event) => {
    event.preventDefault();
    searchFetch();
  };
  const searchChange = (event) => {
    event.preventDefault();
    setSearchText(event.currentTarget.value);
  };

  const searchFetch = async () => {
    const response = await fetch(`/api/v1/search/${searchText}`);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const body = await response.json();
    if (body.attraction) {
      setRedirect(`/attractions/${body.attraction.id}`);
    } else if (body.attractions) {
      // setRedirect(`/attractions?${body.attractions}`)
      return;
    } else {
      return;
    }
  };

  let redirectElement;
  if (redirect) {
    redirectElement = <Redirect to={redirect} />;
  } else {
    redirectElement = null;
  }

  return (
    <>
    { redirectElement }
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
    </>
  );
};

export default SearchBar;
