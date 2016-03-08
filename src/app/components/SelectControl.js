/* eslint-disable */
import React from 'react';

export default function SelectControl(props) {
  const { id, children, labelText } = props;

  const wrapperId = `${id}-wrapper`;
  const selectId = `${id}-select`;

  return (
    <div id={wrapperId}>
      <label htmlFor={selectId}>{labelText}</label>
      <select id={selectId} name={selectId}>
        {children}
      </select>
    </div>
  );
}
