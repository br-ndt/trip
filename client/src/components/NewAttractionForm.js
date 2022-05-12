import React, { useState, useEffect } from "react";
import translateServerErrors from "./../services/translateServerErrors.js";
import DropDownSelect from "./DropDownSelect.js";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";

const NewAttractionForm = (props) => {
  const [locations, setLocations] = useState([]);
  const [newAttraction, setNewAttraction] = useState({
    name: "",
    description: "",
    image: {},
    locationId: 0,
  });
  const [errors, setErrors] = useState({});
  const [uploadedImage, setUploadedImage] = useState({
    preview: "",
  });

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
      const body = new FormData();
      body.append("name", newAttraction.name);
      body.append("description", newAttraction.description);
      body.append("image", newAttraction.image);
      body.append("locationId", newAttraction.locationId);
      const response = await fetch(`/api/v1/locations/${newAttraction.locationId}/attractions`, {
        method: "POST",
        headers: { Accept: "image/jpeg" },
        body: body,
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
    const body = new FormData();
    body.append("image", newAttraction.image);
    props.addNewAttraction(body);
    postAttraction();
  };

  const handleImageUpload = (acceptedImage) => {
    setNewAttraction({
      ...newAttraction,
      image: acceptedImage[0],
    });

    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0]),
    });
  };

  const clearForm = () => {
    setNewAttraction({
      name: "",
      description: "",
      image: {},
      locationId: 0,
    });
    setUploadedImage({
      preview: "",
    });
  };

  return (
    <div className="grid-container">
    <div className="grid-x grid-padding-x">
      <div className="large-12 cell">
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
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="button-group">
                <div className="text-center">
                  <input
                    className="button"
                    type="add"
                    onChange={handleInputChange}
                    value="Add Image"
                    />
                    </div>
                  <div className="drag-n-drop">
                    <ul>(Click to add, or drag and drop)</ul>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <img src={uploadedImage.preview} />
        <DropDownSelect
          listItems={locations}
          listName="locationId"
          onChange={handleInputChange}
          value={newAttraction.locationId}
        />
        <div className="text-center">
        <input className="button" type="submit" />
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default NewAttractionForm;
