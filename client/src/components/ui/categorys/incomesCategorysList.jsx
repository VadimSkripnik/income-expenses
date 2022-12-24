import React from "react";
import PropTypes from "prop-types";
import Category from "./incomeCategory";

const IncomeCategorysList = ({ categorys, category }) => {
  if(categorys && category) {
  const transformCategorys = categorys.map((el) =>
    category.find((x) => x._id === el)
  );

  return (
    <>
      {transformCategorys.map((category) => (
        <Category key={category._id} {...category} />
      ))}
    </>
  );
} else {
  return "...Loading"
}
};


IncomeCategorysList.propTypes = {
  categorys: PropTypes.array,
  category: PropTypes.array,
};

export default IncomeCategorysList;
