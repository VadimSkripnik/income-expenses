import React from "react";
import PropTypes from "prop-types";

const IncomeCategory = ({ color, sourceOfIncome }) => {
    return <span className={"badge m-1 bg-" + color}>{sourceOfIncome}</span>;
};

IncomeCategory.propTypes = {
    color: PropTypes.string.isRequired,
    sourceOfIncome: PropTypes.string.isRequired
};

export default IncomeCategory;
