import React, { useEffect } from "react";
import ShowIncomeCategoryTable from "../../../../ui/table/showIncomeCategoryTable";
import { useDispatch, useSelector } from "react-redux";
import { loadReceiptsList, getReceiptsAll } from "../../../../../store/receipts";
import {
  loadIncomeCategorysList,
  getIncomeCategorys,
  removeIncomeCategorys,
} from "../../../../../store/incomeCategorys";
import { loadCardsList, getCards } from "../../../../../store/cards";

const ShowCategorysPageList = () => {
  const dispatch = useDispatch();

  const categorys = useSelector(getIncomeCategorys());
  const receipts = useSelector(getReceiptsAll());
  const cards = useSelector(getCards());

 

  useEffect(() => {
    dispatch(loadReceiptsList());
    dispatch(loadCardsList());
    dispatch(loadIncomeCategorysList());
  }, []);

  const handleDelete = (categoryId) => {
    dispatch(removeIncomeCategorys(categoryId, cards, receipts));
  };

  if (categorys) {
    const count = categorys.length;

    return (
      <div className="d-flex">
        <div className="d-flex flex-column">
          {count > 0 && (
            <ShowIncomeCategoryTable
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

export default ShowCategorysPageList;
