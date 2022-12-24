import React, { useEffect } from "react";
import ShowRateCategoryTable from "../../../../ui/table/showRateCategoryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRateCategorysList,
  getRateCategorys,
  removeRateCategory,
} from "../../../../../store/rateCategorys";
import { loadRatesList, getRates } from "../../../../../store/rates";

const ShowRateCategorysPageList = () => {
  const dispatch = useDispatch();
  const categorys = useSelector(getRateCategorys());
  const rates = useSelector(getRates());

  useEffect(() => {
    dispatch(loadRateCategorysList());
    dispatch(loadRatesList());
  }, []);

  const handleDelete = (categoryId) => {
    dispatch(removeRateCategory(categoryId, categorys, rates));
  };

  if (categorys) {
    const count = categorys.length;

    return (
      <div className="d-flex">
        <div className="d-flex flex-column">
          {count > 0 && (
            <ShowRateCategoryTable
              categorys={categorys}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    );
  }
  return "loading...";
};

export default ShowRateCategorysPageList;
