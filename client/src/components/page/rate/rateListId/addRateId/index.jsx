import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validator } from "../../../../../utils/validator";
import SelectField from "../../../../common/form/selectField";
import TextField from "../../../../common/form/textField";
import rateCategorysService from "../../../../../services/rateCategorys.service";
import dailyExpensesService from "../../../../../services/dailyExpenses.service";

import { useDispatch } from "react-redux";

import { getHandleSubmitAddRates } from "../../../../../store/rates";

const AddRateId = () => {
  const { rateId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dailyExpenses, setDailyExpenses] = useState();
  const [rateCategorys, setRateCategorys] = useState();
  const [categorys, setCategorys] = useState();

  const [data, setData] = useState({
    category: "",
    itemName: "",
    sum: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      const { content } = await dailyExpensesService.getDailyExpenseId(rateId);
      setDailyExpenses(content);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { content } = await rateCategorysService.getRateCategorys();

      const { category } = data;

      const newSourceOfIncome = content.filter((el) => el._id === category);
      setRateCategorys(newSourceOfIncome);
      const categoryList = content.map((categoryName) => ({
        label: categoryName.sourceOfIncome,
        value: categoryName._id,
      }));
      setCategorys(categoryList);
    })();
  }, [data.category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(
      getHandleSubmitAddRates(data, rateCategorys, rateId, dailyExpenses)
    );

    navigate(`/home/main/mainlist/${rateId}`);
  };

  const validatorConfig = {
    sum: {
      isContainDigit: {
        message: "Введите число",
      },
    },
  };

  useEffect(() => {
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

  if (categorys) {
    return (
      <div className="col-md-6 offset-md-3 shadow p-4">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Наименование продукта"
            name="itemName"
            onChange={handleChange}
          />
          <SelectField
            label="Выбери категорию траты"
            defaultOption="Choose..."
            options={categorys}
            name="category"
            onChange={handleChange}
            value={data.category}
          />
          <TextField
            label="Цена за единицу товара"
            name="sum"
            onChange={handleChange}
            error={errors.sum}
          />
          <TextField
            label="Колличество товара"
            name="quantity"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            Добавить
          </button>
        </form>
      </div>
    );
  } else {
    return "Loading...";
  }
};

export default AddRateId;
