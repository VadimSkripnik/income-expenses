import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectField from "../../../common/form/selectField";
import TextField from "../../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsList, getCards, getCardById } from "../../../../store/cards";
import {
  loadIncomeCategorysList,
  handleSubmiteAddIncomeCategorys,
} from "../../../../store/incomeCategorys";

const AddIncomeCategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardsId, setCardsId] = useState("");
  const [cardById, setCardById] = useState();

  const cardsAll = useSelector(getCards());
  const cardByIds = useSelector(getCardById(cardsId));

  useEffect(() => {
    if (cardByIds) {
      setCardById(cardByIds);
    }
  }, [cardByIds]);

  useEffect(() => {
    dispatch(loadCardsList());
    dispatch(loadIncomeCategorysList());
  }, []);

  const [data, setData] = useState({
    // _id: String(Date.now()),
    data: new Date().toLocaleDateString(),
    sourceOfIncome: "",
    color:
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7),
    cardId: "",
  });

  useEffect(() => {
    setIsLoading(true);

    if (cardsAll) {
      const cardsList = cardsAll.map((cardsName) => ({
        label: cardsName.nameCard,
        value: cardsName._id,
      }));
      setCards(cardsList);
    }
  }, [cardsAll]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setCardsId((prev) => (prev = target.value));
  };

  useEffect(() => {
    if (cards) setIsLoading(false);
  }, [cards]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleSubmiteAddIncomeCategorys(cardById, data));
    navigate("/home/main/incomeCategorysPage", { replace: true });
  };

  return (
    <div className="col-md-6 offset-md-3 shadow p-4">
      {!isLoading && cards.length > 0 ? (
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="???????????????? ??????????????????"
            name="sourceOfIncome"
            onChange={handleChange}
          />
          <SelectField
            label="???????????? ???????????????? ????????????"
            defaultOption="Choose..."
            options={cards}
            name="cardId"
            onChange={handleChange}
            value={data.cardId}
          />
          <button
            type="submit"
            disabled={!cardById}
            className="btn btn-primary w-100 mx-auto"
          >
            ????????????????
          </button>
        </form>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default AddIncomeCategoryPage;
