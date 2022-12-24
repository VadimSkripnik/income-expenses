import React, {  useEffect } from "react";
import style from "./index.module.scss";
import CardsTable from "../../../ui/table/cardsTable";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsList,
     getCards,
      addProceedsCardsList,
      removeCard,
      updateCategoryCards,
      updateReceiptsCards,
      updateRateCategoryCards,
      loadRatesList
     } from "../../../../store/cards";
import { loadRateCategorysList, getRateCategorys } from "../../../../store/rateCategorys";


const CardsList = () => {

    const dispatch = useDispatch();
    const cards = useSelector(getCards());
    const rateCategory = useSelector(getRateCategorys());

    useEffect(() => {
        dispatch(loadCardsList())
        dispatch(updateCategoryCards())
        dispatch(loadRateCategorysList())
        dispatch(addProceedsCardsList())
        dispatch(updateReceiptsCards())
        dispatch(updateRateCategoryCards())
        dispatch(loadRatesList())
    }, []);


    const handleDelete = (cardId) => {
        dispatch(removeCard(cardId));
    };

    if (cards && rateCategory) {
       
        const count = cards.length;
        return (
            <>
                {count > 0 && (
                    <div className={style.main_cardsList}>
                        <div className="d-flex">
                            <div className="d-flex flex-column">
                                <CardsTable
                                    rateCategory={rateCategory}
                                    cards={cards}
                                    
                                    onDelete={handleDelete}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
    return "loading...";
};

export default CardsList;
