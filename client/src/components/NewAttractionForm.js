import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import translateServerErrors from "./../services/translateServerErrors.js";
import ErrorList from "./layout/ErrorList";
import FormError from "./layout/FormError";

const NewAttractionForm = (props) => {
  const [newAttraction, setNewAttraction] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const addNewAttraction = async () => {
    try {
      const response = await fetch("/api/v1/attractions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAttraction),
      });
      const body = await response.json();
      if (!response.ok) {
        if (response.status === 422) {
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setNewAttraction({ ...newAttraction, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewAttraction();
  };

  if (shouldRedirect) {
    return <Redirect push to="/attractions"></Redirect>;
  }

  return (
    <div>
      <h3>Add a New Attraction</h3>
      <ErrorList errors={errors}/>
      <form className="attraction-form form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="The Colosseum" onChange={handleInputChange}/>
        <textarea name="description" placeholder="Tigers are cool, but..." onChange={handleInputChange}/>
        <input className="button" type="submit"/>
      </form>
    </div>
  )
};

export default NewAttractionForm;
