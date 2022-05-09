import React, { useState, useEffect } from "react";
import translateServerErrors from "./../services/translateServerErrors.js";
import DropDownSelect from "./DropDownSelect.js";
import ErrorList from "./layout/ErrorList";

const NewAttractionForm = (props) => {
  const [locations, setLocations] = useState([]);
  const [newAttraction, setNewAttraction] = useState({
    name: "",
    description: "",
    locationId: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch("api/v1/locations");
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        setLocations(body.locations);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const postAttraction = async () => {
    let preFetchErrors = {};
    if (!newAttraction.name) {
      preFetchErrors.Name = "must have a required property 'name'";
    }
    if (!newAttraction.locationId) {
      preFetchErrors.Location = "must have a required property 'location'";
    }
    if (Object.keys(preFetchErrors).length) return setErrors(preFetchErrors);
    else setErrors({});

    try {
      const response = await fetch(`/api/v1/locations/${newAttraction.locationId}/attractions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAttraction),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors.data);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        props.addNewAttraction(body.attraction);
        clearForm();
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
    postAttraction();
  };

  const clearForm = () => {
    setNewAttraction({
      name: "",
      description: "",
      locationId: 0,
    });
  };

  return (
    <div className="attraction-form form">
      <h3>Add a New Attraction:</h3>
      <ErrorList errors={errors} />
      <form className="attraction-form form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Boston Common"
          onChange={handleInputChange}
          value={newAttraction.name}
        />
        <textarea
          name="description"
          placeholder="The Boston Common is a central public park in downtown Boston..."
          onChange={handleInputChange}
          value={newAttraction.description}
        />
        <DropDownSelect listItems={locations} listName="locationId" onChange={handleInputChange} value={newAttraction.locationId}/>
        <input className="button" type="submit" />
      </form>
    </div>
  );
};

export default NewAttractionForm;
