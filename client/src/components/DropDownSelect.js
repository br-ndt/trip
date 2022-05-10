import React from "react";

const DropDownSelect = (props) => {
  const options = props.listItems.map((listItem) => {
    return (
      <option key={listItem.id} value={`${listItem.id}`}>
        {listItem.country}: {listItem.city}, {listItem.province}
      </option>
    );
  });

  return (
    <select value={props.value} name={props.listName} id={`dropdown-${props.listName}`} onChange={props.onChange}>
      <option value={0}></option>
      {options}
    </select>
  );
};

export default DropDownSelect;
