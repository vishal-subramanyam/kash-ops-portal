import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function ProjectMultiSelect(props) {
  return (
    <div className="multi-select-dropdown">
      <div className="multi-select-dropdown__selected">
        <div>0 Selected</div>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <ul className="multi-select-dropdown__options">
        <li className="multi-select-dropdown__option">
          <input
            type="checkbox"
            className="multi-select-dropdown__option-checkbox"
          ></input>
          <span>option</span>
        </li>
      </ul>
    </div>
  );
}

export default ProjectMultiSelect;
