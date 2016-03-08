/* eslint-disable */
import React from 'react';

export default function SelectControl(props) {
  const { id, children, defaultValue, labelText, onSelection } = props;

  const wrapperId = `${id}-wrapper`;
  const selectId = `${id}-select`;

  function handleChange(event) {
    onSelection(event.target.value);
  }

  return (
    <div id={wrapperId}>
      <label htmlFor={selectId}>{labelText}</label>
      <select
        id={selectId}
        name={selectId}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {children}
      </select>
    </div>
  );
}
