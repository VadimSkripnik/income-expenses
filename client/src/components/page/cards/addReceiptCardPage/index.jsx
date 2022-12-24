import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validator } from "../../../../utils/validator";
import SelectField from "../../../common/form/selectField";
import TextField from "../../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsList, getCardById } from "../../../../store/cards";

import {
  loadIncomeCategorysList,
  handleSubmiteincomeCategorys,
  getIncomeCategorys,
} from "../../../../store/incomeCategorys";

const AddReceiptCardPage = () => {
  const { cardId } = useParams();
  console.log(cardId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [category, setCategory] = useState([]);

  const categorys = useSelector(getIncomeCategorys());
  const card = useSelector(getCardById(cardId));

  useEffect(() => {
    dispatch(loadCardsList());
    dispatch(loadIncomeCategorysList());
  }, []);

  const [data, setData] = useState({
    cardId: "",
    _id: "",
    data: "",
    color: "",
    category: "",
    sourceOfIncome: "",
    nameCardReceipt: "",
    profit: "",
  });

  useEffect(() => {
    if (card) {
      const cloneParams = {
        cardId: cardId,
        _id: String(Date.now()),
        data: new Date().toLocaleDateString(),
        color:
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7),
        category: "",
        sourceOfIncome: "",
        nameCardReceipt: card.nameCard,
        profit: "",
      };

      setData((prev) => ({ ...prev, ...cloneParams }));
    }
  }, [card]);

  useEffect(() => {
    if (categorys && card) {
      const categoryList = categorys.map((categoryName) => ({
        label: categoryName.sourceOfIncome,
        value: categoryName._id,
      }));
      const { incomeCategorys } = card;
      const transformCategorysSomeValue = categoryList.filter(
        (e) => incomeCategorys.includes(e.value) && { ...e }
      );
      setCategory(transformCategorysSomeValue);
    }
  }, [card]);

  const [errors, setErrors] = useState({});

  const transformData = ({ profit, ...object }) => ({
    profit: Number(profit),
    ...object,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(handleSubmiteincomeCategorys(transformData(data)));
    navigate(`/home/main/mainlist`, { replace: true });
  };

  const validatorConfig = {
    profit: {
      isContainDigitOneNumber: {
        message: "Введите число",
      },
    },
  };

  useEffect(() => {
    const filteredCategoryObj = category.filter(
      (el) => el.value === data.category
    );
    const transformInStr = filteredCategoryObj.map((el) => (el = el.label));
    data.sourceOfIncome = transformInStr.join(" ");

    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  if (card) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {card.incomeCategorys.length > 0 ? (
              <form onSubmit={handleSubmit}>
                <SelectField
                  label="Выбери категорию"
                  defaultOption="Choose..."
                  options={category}
                  name="category"
                  onChange={handleChange}
                  value={data.category}
                />
                <TextField
                  label="Введите число"
                  name="profit"
                  onChange={handleChange}
                  error={errors.profit}
                />
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary w-100 mx-auto"
                >
                  Добавить
                </button>
              </form>
            ) : (
              "Добавте категорию дохода в карту"
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
};

export default AddReceiptCardPage;
