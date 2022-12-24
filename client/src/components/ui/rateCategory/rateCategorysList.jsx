import React from "react";
import PropTypes from "prop-types";
import Category from "./rateCategory";

const RateCategorysList = ({ categorys, category }) => {
  if (categorys) {
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
    return "Нет категорий доходов";
  }
};

RateCategorysList.propTypes = {
  categorys: PropTypes.array,
  category: PropTypes.array,
};

export default RateCategorysList;
