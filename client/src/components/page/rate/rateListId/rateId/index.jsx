import React, { useEffect } from "react";
import style from "./index.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import RateTableId from "../../../../ui/table/rateTableId";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRateCategorysList,
  getRateCategorys,
} from "../../../../../store/rateCategorys";
import {
  loadRatesList,
  getRates,
  getQuantityRate,
  getRatesSum,
  getRatesFilterId,
} from "../../../../../store/rates";
import { loadDailyExpensesList } from "../../../../../store/dailyExpenses";

const RateId = () => {
  const { rateId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categorys = useSelector(getRateCategorys());
  const ratesAll = useSelector(getRates());
  const ratesFilterId = useSelector(getRatesFilterId());
  const ratesSum = useSelector(getRatesSum());
  console.log("ratesFilterId",ratesFilterId)
  // console.log(categorys)

  useEffect(() => {
    dispatch(loadRateCategorysList());
    dispatch(loadRatesList());
    dispatch(loadDailyExpensesList());
  }, []);

  useEffect(() => {
    dispatch(getQuantityRate(rateId));
  }, [ratesAll]);

  const addDailyExpenses = () => {
    navigate(`/home/main/mainlist/${rateId}/adddailyexpenses`);
  };

  return (
    <>
      {ratesFilterId ? (
        <>
          <div className={style.main_ratesList}>
            <div className="d-flex">
              <div className="d-flex flex-column">
                <RateTableId categorys={categorys} rates={ratesFilterId} />
              </div>
            </div>
          </div>
          <div>{`Всего: ${ratesSum} руб.`}</div>
          <div>
            <button className="btn btn-danger" onClick={addDailyExpenses}>
              Добавить позицию
            </button>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default RateId;
