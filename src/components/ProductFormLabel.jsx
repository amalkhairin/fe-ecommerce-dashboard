import React from "react";
import PropTypes from "prop-types";
import { capitalize } from "lodash";

function ProductFormLabel({ name, textLabel, customClassname, children }) {
  const text = textLabel || capitalize(name);
  return (
    <label
      htmlFor={name}
      className={
        customClassname || "block text-sm font-medium text-gray-700 mb-1"
      }
    >
      {children || text}
    </label>
  );
}

ProductFormLabel.propTypes = {
  textLabel: PropTypes.string,
  customElements: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default ProductFormLabel;