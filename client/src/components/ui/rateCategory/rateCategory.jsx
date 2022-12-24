import React from "react";
import PropTypes from "prop-types";

const RateCategory = ({ color, sourceOfIncome }) => {
    return <span className={"badge m-1 bg-" + color}>{sourceOfIncome}</span>;
};

RateCategory.propTypes = {
    color: PropTypes.string.isRequired,
    sourceOfIncome: PropTypes.string.isRequired
};

export default RateCategory;
