import { createSlice } from "@reduxjs/toolkit";
import incomeCategorysService from "../services/incomeCategorys.service";
import receiptsService from "../services/receipts.service";
import cardsService from "../services/cards.service";

const incomeCategorysSlice = createSlice({
  name: "incomeCategorys",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    incomeCategorysRequested: (state) => {
      state.isLoading = true;
    },
    incomeCategorysReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    incomeCategorysRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addIncomeCategoryItem: (state, action) => {
      state.entities = action.payload;
    },
    removeIncomeCategoryItem: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: incomeCategorysReducer, actions } = incomeCategorysSlice;
const {
  incomeCategorysRequested,
  incomeCategorysReceived,
  incomeCategorysRequestFailed,
  addIncomeCategoryItem,
  removeIncomeCategoryItem,
} = actions;

export const loadIncomeCategorysList = () => async (dispatch) => {
  dispatch(incomeCategorysRequested());
  try {
    const { content } = await incomeCategorysService.getIncomeCategorys();
    dispatch(incomeCategorysReceived(content));
  } catch (error) {
    dispatch(incomeCategorysRequestFailed(error.message));
  }
};

export const removeIncomeCategorys =
  (id, card, receipts) => async (dispatch, getState) => {
    dispatch(incomeCategorysRequested());

    try {
      const categorys = getState().incomeCategorys.entities;

      const content = categorys.filter((i) => i._id !== id);
      dispatch(removeIncomeCategoryItem(content));
      await incomeCategorysService.removeIncomeCategoryId(id);

      const deleteIncomeCategory = categorys.filter(
        (e) =>
          id.includes(e._id) && {
            ...e,
          }
      );

      const transformIncomeCategorys = deleteIncomeCategory.map(
        (el) => (el = el._id)
      );

      const toRemove = new Set(transformIncomeCategorys);

      const transformIncomeCard = card.map((c) =>
        c.incomeCategorys.filter((el) => !toRemove.has(el))
      );

      const removeDuplicatesCategoryId = card.map((el, i) => ({
        ...el,
        incomeCategorys: transformIncomeCard[i],
      }));

      removeDuplicatesCategoryId.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      const transformReceiptsSomeValue = receipts.filter(
        (e) => e.category === transformIncomeCategorys.join(" ")
      );

      transformReceiptsSomeValue.forEach(
        async (el) => await receiptsService.removeReceiptId(el._id)
      );
    } catch (error) {
      dispatch(incomeCategorysRequestFailed(error.message));
    }
  };

export const addIncomeCategorys = (data) => async (dispatch, getState) => {
  // dispatch(commentsRequested());
  // const currentCommetId = getState().users.auth.userId;
  //  const content = {
  //         ...data,
  //         _id: nanoid(),
  //         pageId: currentCommetId,
  //         created_at: Date.now(),
  //         userId: currentCommetId
  //     };
  // try {
  //     const comments = [...getState().comments.entities, content];
  //     await incomeCategorysService.createComment(content);
  //     dispatch(addCommentItem(comments));
  //     dispatch(commentsRequestFailed());
  // } catch (error) {
  //     dispatch(commentsRequestFailed(error.message));
  // }
};

export const handleSubmiteincomeCategorys =
  (data) => async (dispatch, getState) => {
    dispatch(incomeCategorysRequested());
    try {
      await receiptsService.createReceipt(data);
    } catch (error) {
      dispatch(incomeCategorysRequestFailed(error.message));
    }
  };

export const handleSubmiteEditIncomeCategorys =
  (id, receipts, data) => async (dispatch, getState) => {
    try {
      const newReceipt = receipts.map((x) =>
        x.category === id ? { ...x, sourceOfIncome: data.sourceOfIncome } : x
      );
      newReceipt.forEach(
        async (el) => await receiptsService.updateReceiptId(el._id, el)
      );

      const newCategory = getState().incomeCategorys.entities.map((el) =>
        id.includes(el._id) ? { ...el, ...data } : el
      );
      dispatch(incomeCategorysReceived(newCategory));

      await incomeCategorysService.updateIncomeCategoryId(id, data);
    } catch (error) {
      dispatch(incomeCategorysRequestFailed(error.message));
    }
  };

// export const handleSubmiteAddIncomeCategorys =
//   (cardById, data) => async (dispatch, getState) => {
//     console.log(data)
//     try {
//       const content = [...getState().incomeCategorys.entities, data];
//       dispatch(addIncomeCategoryItem(content));

//       const transformCardById = [...cardById.incomeCategorys, data._id];

//       await incomeCategorysService.createIncomeCategory(data);

//       await cardsService.updateCard(cardById._id, {
//         ...cardById,
//         incomeCategorys: transformCardById,
//       });
//     } catch (error) {
//       dispatch(incomeCategorysRequestFailed(error.message));
//     }
//   };updateIncomeCategoryId

export const handleSubmiteAddIncomeCategorys =
  (cardById, data) => async (dispatch, getState) => {
    console.log(data)
    try {
      const categorys = [...getState().incomeCategorys.entities, data];
      dispatch(addIncomeCategoryItem(categorys));

     
      // await incomeCategorysService.createIncomeCategory(data);
      const { content } = await incomeCategorysService.getIncomeCategorys()
      // console.log(content.at(-1)._id)
     await incomeCategorysService.updateIncomeCategoryId(content.at(-1)._id, data);
     const transformCardById = [...cardById.incomeCategorys, content.at(-1)._id];
     console.log(transformCardById)
     console.log(cardById)




      await cardsService.updateCard(cardById._id, {
        ...cardById,
        incomeCategorys: transformCardById,
      });
    } catch (error) {
      dispatch(incomeCategorysRequestFailed(error.message));
    }
  };

export const getIncomeCategorys = () => (state) => {
  try {
    if (state.incomeCategorys.entities) {
      return state.incomeCategorys.entities;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getIncomeCategorysId = (id) => (state) => {
  try {
    if (state.incomeCategorys.entities) {
      return state.incomeCategorys.entities.find((u) => u._id === id);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const incomeCategorysNewObject = () => (state) => {
  if (state.incomeCategorys.entities) {
    const newObj = state.incomeCategorys.entities.map((optionName) => ({
      value: optionName._id,
      label: optionName.sourceOfIncome,
      color: optionName.color,
      cardId: optionName.cardId,
    }));
    return newObj;
  }
};

export const incomeCategorysList = (some, newObj) => (state) => {
  if (some && newObj) {
    const someArr = JSON.parse(JSON.stringify(some));
    try {
      const filterIncomeCategoryArr = newObj.filter((i) => {
        if (someArr) {
          return someArr.incomeCategorys.includes(i.value);
        }
      });

      someArr.incomeCategorys = filterIncomeCategoryArr.map((i) => ({
        label: i.label,
        value: i.value,
      }));

      return someArr;
    } catch (e) {
      console.log(e.message);
    }
  }
};

export default incomeCategorysReducer;
