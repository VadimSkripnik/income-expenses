import React, { useEffect } from "react";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import RateTable from "../../../ui/table/rateTable";
import {
  loadRateCategorysList,
  getRateCategorys,
} from "../../../../store/rateCategorys";
import {
  loadDailyExpensesList,
  getDailyExpenses,
} from "../../../../store/dailyExpenses";

const RateList = () => {
  const dispatch = useDispatch();

  const categorys = useSelector(getRateCategorys());
  const rates = useSelector(getDailyExpenses());

  useEffect(() => {
    dispatch(loadRateCategorysList());
    dispatch(loadDailyExpensesList());
  }, []);
  

  if (rates) {
    const count = rates.length;

    return (
      <>
        {count > 0 && (
          <div className={style.main_ratesList}>
            <div className="d-flex">
              <div className="d-flex flex-column">
                {count > 0 && <RateTable categorys={categorys} rates={rates} />}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return "loading...";
};

export default RateList;
