import { createSlice } from "@reduxjs/toolkit";
import cardsService from "../services/cards.service";
import receiptsService from "../services/receipts.service";
import incomeCategorysService from "../services/incomeCategorys.service";
import rateCategorysService from "../services/rateCategorys.service";
import ratesService from "../services/rates.service";
import {
  lookingForTheRightItem,
  convertArrayOfElementsToId,
} from "../utils/secondaryFunctions";
// оптимизировать updateCategorysCards, updateRateCategorysCards

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    entities: null,
    categorysCards: null,
    rateCategorysCards: null,
    receiptsCards: null,
    rates: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    cardsRequested: (state) => {
      state.isLoading = true;
    },
    cardsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    updateCategoryCard: (state, action) => {
      state.categorysCards = action.payload;
      state.isLoading = false;
    },
    updateRateCategory: (state, action) => {
      state.rateCategorysCards = action.payload;
      state.isLoading = false;
    },
    ratesReceived: (state, action) => {
      state.rates = action.payload;
      state.isLoading = false;
    },
    removeDuplicatesIncomeCategoryIdCard: (state, action) => {
      state.entities = action.payload;
    },
    removeDuplicatesRateCategoryIdCard: (state, action) => {
      state.entities = action.payload;
    },
    updateReceiptsCard: (state, action) => {
      state.receiptsCards = action.payload;
      state.isLoading = false;
    },
    cardsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addCardItem: (state, action) => {
      state.entities = action.payload;
    },
    removeCardItem: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: cardsReducer, actions } = cardsSlice;
const {
  cardsRequested,
  cardsReceived,
  cardsRequestFailed,
  removeCardItem,
  updateRateCategory,
  updateReceiptsCard,
  updateCategoryCard,
  ratesReceived,
  removeDuplicatesIncomeCategoryIdCard,
  removeDuplicatesRateCategoryIdCard,
} = actions;

export const updateReceiptsCards = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await receiptsService.getReceipts();
    dispatch(updateReceiptsCard(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const updateCategoryCards = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await incomeCategorysService.getIncomeCategorys();
    dispatch(updateCategoryCard(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const updateRateCategoryCards = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await rateCategorysService.getRateCategorys();
    dispatch(updateRateCategory(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const loadCardsList = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await cardsService.getCards();
    // console.log("await",content)
    dispatch(cardsReceived(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const loadRatesList = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await ratesService.getRates();
    dispatch(ratesReceived(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const addProceedsCardsList = () => async (dispatch, getState) => {
  dispatch(cardsRequested());
  try {
    const { content } = await receiptsService.getReceipts();
    const cards = getState().cards.entities;
    const newCards = JSON.parse(JSON.stringify(cards));
    newCards.forEach((el) => {
      el.proceeds = content.reduce(
        (sum, elem) =>
          el.nameCard === elem.nameCardReceipt ? sum + elem.profit : sum,
        0
      );
    });

    dispatch(cardsReceived(newCards));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const removeCard = (id) => async (dispatch, getState) => {
  try {
    const cards = getState().cards.entities;
    const incomeCategorys = getState().cards.categorysCards;
    const receipts = getState().cards.receiptsCards;
    const rateCategorys = getState().cards.rateCategorysCards;
    const rates = getState().cards.rates;

    const incomesCategorysId = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].incomeCategorys.length; j++) {
        if (cards[i]._id === id) {
          incomesCategorysId.push(cards[i].incomeCategorys[j]);
        }
      }
    }

    const deleteIncomeCategory = incomeCategorys.filter(
      (e) =>
        incomesCategorysId.includes(e._id) && {
          ...e,
        }
    );

    const deleteReceipt = receipts.filter(
      (e) =>
        incomesCategorysId.includes(e.category) && {
          ...e,
        }
    );

    deleteIncomeCategory.forEach(
      async (el) => await incomeCategorysService.removeIncomeCategoryId(el._id)
    );

    deleteReceipt.forEach(
      async (el) => await receiptsService.removeReceiptId(el._id)
    );

    const ratesCategorysId = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].rateCategorys.length; j++) {
        if (cards[i]._id === id) {
          ratesCategorysId.push(cards[i].rateCategorys[j]);
        }
      }
    }

    const deleteRateCategorys = rateCategorys.filter(
      (e) =>
        ratesCategorysId.includes(e._id) && {
          ...e,
        }
    );

    const deleteRates = rates.filter(
      (e) =>
        ratesCategorysId.includes(e.category) && {
          ...e,
        }
    );

    deleteRateCategorys.forEach(
      async (el) => await rateCategorysService.removeRateCategoryId(el._id)
    );
    deleteRates.forEach(async (el) => await ratesService.removeRatesId(el._id));

    const content = cards.filter((card) => card._id !== id);
    dispatch(removeCardItem(content));
    await cardsService.removeCardId(id);
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const addCard =
  (category, rateCategory, data, receipt) => async (dispatch, getState) => {
    await cardsService.createCard(data);
    await incomeCategorysService.createIncomeCategory(category);
    await rateCategorysService.createRateCategory(rateCategory);

    await receiptsService.createReceipt(receipt);
    const { content } = await cardsService.getCards();
    const day = new Date().toLocaleDateString();

    const filterCards = lookingForTheRightItem(content, day);

    const id = convertArrayOfElementsToId(filterCards).join(" ");
    await cardsService.updateCards(id, filterCards);
  };

export const updateCategorysCards =
  (id, data, transformIncomeCategorys) => async (dispatch, getState) => {
    try {
      const toRemove = new Set(transformIncomeCategorys);
      const cards = getState().cards.entities;
      const content = getState().cards.categorysCards;
      const receipts = getState().cards.receiptsCards;

      const transformCategoryCard = cards.map((c) =>
        c.incomeCategorys.filter((el) => !toRemove.has(el))
      );

      const removeDuplicatesCategoryId = cards.map((el, i) => ({
        ...el,
        incomeCategorys: transformCategoryCard[i],
      }));

      const cardsIndex = removeDuplicatesCategoryId.findIndex(
        (u) => u._id === id
      );

      removeDuplicatesCategoryId[cardsIndex] = {
        ...removeDuplicatesCategoryId[cardsIndex],
        ...data,
      };

      dispatch(
        removeDuplicatesIncomeCategoryIdCard(removeDuplicatesCategoryId)
      );

      removeDuplicatesCategoryId.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      const transformCategorysSomeValue = content.map((el) =>
        transformIncomeCategorys.includes(el._id) ? { ...el, cardId: id } : el
      );

      const transformReceiptsSomeValue = receipts.map((e) =>
        transformIncomeCategorys.includes(e.category)
          ? { ...e, cardId: id, nameCardReceipt: data.nameCard }
          : e
      );

      const incomesCategorysId = [];

      for (let i = 0; i < removeDuplicatesCategoryId.length; i++) {
        for (
          let j = 0;
          j < removeDuplicatesCategoryId[i].incomeCategorys.length;
          j++
        ) {
          incomesCategorysId.push(
            removeDuplicatesCategoryId[i].incomeCategorys[j]
          );
        }
      }

      const deleteIncomeCategory = transformCategorysSomeValue.filter(
        (e) =>
          !incomesCategorysId.includes(e._id) && {
            ...e,
            cardId: data._id,
          }
      );

      const deleteReceiptCategory = transformReceiptsSomeValue.filter(
        (e) =>
          !incomesCategorysId.includes(e.category) && {
            ...e,
            cardId: data._id,
            nameCardReceipt: data.nameCard,
          }
      );

      const getCardId = removeDuplicatesCategoryId.filter(
        (obj) => obj.incomeCategorys.length < 1
      );

      const transformGetCardId = getCardId.map((el) => (el = el._id));

      transformCategorysSomeValue.forEach(
        async (el) =>
          await incomeCategorysService.updateIncomeCategoryId(el._id, el)
      );
      deleteIncomeCategory.forEach(
        async (el) =>
          await incomeCategorysService.removeIncomeCategoryId(el._id)
      );
      transformReceiptsSomeValue.forEach(
        async (el) => await receiptsService.updateReceiptId(el._id, el)
      );
      deleteReceiptCategory.forEach(
        async (el) => await receiptsService.removeReceiptId(el._id)
      );
      removeDuplicatesCategoryId.forEach(
        async (el) =>
          transformGetCardId.includes(el._id) &&
          (await cardsService.removeCardId(el._id))
      );
    } catch (e) {
      console.log(e.message);
    }
  };

export const updateRateCategorysCards =
  (id, data, transformRateCategorys) => async (dispatch, getState) => {
    try {
      const cards = getState().cards.entities;
      const toRemove = new Set(transformRateCategorys);

      const transformRateCard = cards.map((c) =>
        c.rateCategorys.filter((el) => !toRemove.has(el))
      );

      const removeDuplicatesCategoryId = cards.map((el, i) => ({
        ...el,
        rateCategorys: transformRateCard[i],
      }));

      const cardsIndex = removeDuplicatesCategoryId.findIndex(
        (u) => u._id === id
      );

      removeDuplicatesCategoryId[cardsIndex] = {
        ...removeDuplicatesCategoryId[cardsIndex],
        ...data,
      };

      dispatch(removeDuplicatesRateCategoryIdCard(removeDuplicatesCategoryId));

      removeDuplicatesCategoryId.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      const content = getState().cards.rateCategorysCards;

      const transformCategorysSomeValue = content.map((e) =>
        transformRateCategorys.includes(e._id) ? { ...e, cardId: data._id } : e
      );

      transformCategorysSomeValue.forEach(
        async (el) =>
          await rateCategorysService.updateRateCategoryId(el._id, el)
      );

      const rates = getState().cards.rates;

      const transformRatesSomeValue = rates.map((e) =>
        transformRateCategorys.includes(e.category) ? { ...e, cardId: id } : e
      );

      transformRatesSomeValue.forEach(
        async (el) => await ratesService.updateRatesId(el._id, el)
      );

      const ratesCategorysId = [];

      for (let i = 0; i < removeDuplicatesCategoryId.length; i++) {
        for (
          let j = 0;
          j < removeDuplicatesCategoryId[i].rateCategorys.length;
          j++
        ) {
          ratesCategorysId.push(removeDuplicatesCategoryId[i].rateCategorys[j]);
        }
      }

      const deleteRateCategory = transformCategorysSomeValue.filter(
        (e) =>
          !ratesCategorysId.includes(e._id) && {
            ...e,
            cardId: data._id,
          }
      );

      deleteRateCategory.forEach(
        async (el) => await rateCategorysService.removeRateCategoryId(el._id)
      );

      const deleteRates = transformRatesSomeValue.filter(
        (e) =>
          !ratesCategorysId.includes(e.category) && {
            ...e,
            cardId: data._id,
          }
      );

      deleteRates.forEach(
        async (el) => await ratesService.removeRatesId(el._id)
      );
    } catch (e) {
      console.log(e.message);
    }
  };

export const getCards = () => (state) => state.cards.entities;

export const getCardById = (cardId) => (state) => {
  try {
    if (state.cards.entities) {
      return state.cards.entities.find((u) => u._id === cardId);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default cardsReducer;
