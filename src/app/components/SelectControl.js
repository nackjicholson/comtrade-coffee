import React from 'react';
import { wrapperStyle, controlStyle, labelStyle } from './selectControlStyles';

function SelectControl(props) {
  const { id, children, defaultValue, labelText, onSelection } = props;

  const wrapperId = `${id}-wrapper`;
  const selectId = `${id}-select`;

  const handleChange = (event) => {
    onSelection(event.target.value);
  };

  return (
    <div id={wrapperId} style={wrapperStyle}>
      <label htmlFor={selectId} style={labelStyle}>{labelText}</label>
      <select
        id={selectId}
        style={controlStyle}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {children}
      </select>
    </div>
  );
}

SelectControl.propTypes = {
  id: React.PropTypes.string,
  children: React.PropTypes.array,
  defaultValue: React.PropTypes.any,
  labelText: React.PropTypes.string,
  onSelection: React.PropTypes.func
};

export default SelectControl;
