import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import MultiSelectField from "../../../common/form/multiSelectField";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCardsList,
  getCards,
  getCardById,
  updateRateCategorysCards,
  updateRateCategoryCards,
  loadRatesList,
} from "../../../../store/cards";
import {
  loadRateCategorysList,
  getRateCategorys,
  getRateCategorysList,
  getRateCategorysNewObject,
} from "../../../../store/rateCategorys";

const EditCardPageForm = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    nameCard: "",
    rateCategorys: [],
  });

  const [rateCategorysTransform, setRateCategorysTransform] = useState([]);
  const [some, setSome] = useState("");

  const [errors, setErrors] = useState({});

  const categorys = useSelector(getRateCategorys());
  const categoryNewObject = useSelector(getRateCategorysNewObject());
  const categorysList = useSelector(
    getRateCategorysList(some, categoryNewObject)
  );

  useEffect(() => {
    dispatch(loadCardsList());
    dispatch(loadRateCategorysList());
    dispatch(updateRateCategoryCards());
    dispatch(loadRatesList());
  }, []);

  const cards = useSelector(getCards());
  const cardRateId = useSelector(getCardById(cardId));

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { rateCategorys } = data;

    const transformRateCategorys = rateCategorys.map((el) => (el = el.value));

    dispatch(
      updateRateCategorysCards(
        cardId,
        {
          ...data,
          rateCategorys: transformRateCategorys,
        },
        transformRateCategorys
      )
    );

    navigate("/home/main/mainlist", { replace: true });
  };

  useEffect(() => {
    const someArr = { ...some };
    if (rateCategorysTransform) {
      const filterIncomeCategoryArr = rateCategorysTransform.filter((i) =>
        someArr.rateCategorys.includes(i.value)
      );
      someArr.rateCategorys = filterIncomeCategoryArr.map((i) => ({
        label: i.label,
        value: i.value,
      }));
      setData((prevState) => ({
        ...prevState,
        ...someArr,
      }));
    }
  }, [some]);

  useEffect(() => {
    setSome((prevState) => ({
      ...prevState,
      ...cardRateId,
    }));

    setRateCategorysTransform(categoryNewObject);
  }, [cardRateId, categorys]);

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      ...categorysList,
    }));
  }, [some]);

  const validatorConfig = {
    nameCard: {
      isRequired: {
        message: "?????????????? ???????????????? ????????????",
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
  if (cards) {
    return (
      <div className="col-md-6 offset-md-3 shadow p-4  mt-5">
        <form onSubmit={handleSubmit}>
          <TextField
            label="??????????"
            name="nameCard"
            value={data.nameCard}
            onChange={handleChange}
          />
          <MultiSelectField
            defaultValue={data.rateCategorys}
            options={rateCategorysTransform}
            onChange={handleChange}
            name="rateCategorys"
            label="???????????????? ??????????????????"
          />
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            ????????????????
          </button>
        </form>
      </div>
    );
  }
  return "loading...";
};

export default EditCardPageForm;
