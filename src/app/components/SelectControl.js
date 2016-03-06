import React from 'react';

function SelectControl(props) {
  const { baseId, children, defaultValue, labelText, onSelection } = props;

  const wrapperId = `${baseId}-wrapper`;
  const selectId = `${baseId}-select`;

  const handleChange = (event) => {
    onSelection(event.target.value);
  };

  return (
    <div id={wrapperId}>
      <label htmlFor={selectId}>{labelText}</label>
      <select
        id={selectId}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {children}
      </select>
    </div>
  );
}

SelectControl.propTypes = {
  baseId: React.PropTypes.string,
  children: React.PropTypes.array,
  defaultValue: React.PropTypes.any,
  labelText: React.PropTypes.string,
  onSelection: React.PropTypes.func
};

export default SelectControl;
