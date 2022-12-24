// import { createSlice } from "@reduxjs/toolkit";
// import rateCategorysService from "../services/rateCategorys.service";
// import cardsService from "../services/cards.service";
// import ratesService from "../services/rates.service";
// // import { getReceipts } from './receipts';

// const rateCategorysSlice = createSlice({
//   name: "rateCategorys",
//   initialState: {
//     entities: null,
//     isLoading: true,
//     error: null,
//   },
//   reducers: {
//     rateCategorysRequested: (state) => {
//       state.isLoading = true;
//     },
//     rateCategorysReceived: (state, action) => {
//       state.entities = action.payload;
//       state.isLoading = false;
//     },
//     rateCategorysRequestFailed: (state, action) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     },
//     addRateCategoryItem: (state, action) => {
//       state.entities = action.payload;
//     },
//     removeRateCategoryItem: (state, action) => {
//       state.entities = action.payload;
//     },
//   },
// });

// const { reducer: rateCategorysReducer, actions } = rateCategorysSlice;
// const {
//   rateCategorysRequested,
//   rateCategorysReceived,
//   rateCategorysRequestFailed,
//   addRateCategoryItem,
//   removeRateCategoryItem,
// } = actions;

// export const loadRateCategorysList = () => async (dispatch) => {
//   dispatch(rateCategorysRequested());
//   try {
//     const { content } = await rateCategorysService.getRateCategorys();
//     // console.log(content)
//     dispatch(rateCategorysReceived(content));
//   } catch (error) {
//     dispatch(rateCategorysRequestFailed(error.message));
//   }
// };

// export const removeRateCategory =
//   (id, categorys, rates) => async (dispatch, getState) => {
//     dispatch(rateCategorysRequested());
//     try {
//       const categoryDelete = getState().rateCategorys.entities.filter(
//         (i) => i._id !== id
//       );

//       dispatch(removeRateCategoryItem(categoryDelete));
//       await rateCategorysService.removeRateCategoryId(id);

//       const deleteRateCategory = categorys.filter((e) => e._id === id);
//       const transformRateCategorys = deleteRateCategory.map(
//         (el) => (el = el._id)
//       );
//       const { content } = await cardsService.getCards();

//       const toRemove = new Set(transformRateCategorys);
//       const transformCategoryCard = content.map((c) =>
//         c.rateCategorys.filter((el) => !toRemove.has(el))
//       );
//       const removeDuplicatesCategoryId = content.map((el, i) => ({
//         ...el,
//         rateCategorys: transformCategoryCard[i],
//       }));

//       removeDuplicatesCategoryId.forEach(
//         async (el) => await cardsService.updateCards(el._id, el)
//       );

//       const transformRatesSomeValue = rates.filter(
//         (e) => e.category === transformRateCategorys.join(" ")
//       );

//       transformRatesSomeValue.forEach(
//         async (el) => await ratesService.removeRatesId(el._id)
//       );
//     } catch (error) {
//       dispatch(rateCategorysRequestFailed(error.message));
//     }
//   };

// export const addRateCategory =
//   (cardById, data, id) => async (dispatch, getState) => {
//     try {
//       const transformCardById = [...cardById.rateCategorys, data._id];
//       await rateCategorysService.createRateCategory(data);
//       await cardsService.updateCard(id, {
//         ...cardById,
//         rateCategorys: transformCardById,
//       });
//     } catch (error) {
//       dispatch(rateCategorysRequestFailed(error.message));
//     }
//   };

// export const updateRateCategory =
//   (data, rates, id) => async (dispatch, getState) => {
//     try {
//       const rateCategorys = getState().rateCategorys.entities;

//       const rateCategorysIndex = rateCategorys.findIndex((i) => i._id === id);
//       const updateCategorysArr = rateCategorys.map((el) =>
//         id.includes(el._id)
//           ? { ...rateCategorys[rateCategorysIndex], ...data }
//           : el
//       );
//       dispatch(addRateCategoryItem(updateCategorysArr));
//       await rateCategorysService.updateRateCategoryId(id, data);

//       const filterRates = rates.filter((el) => el.category === id);

//       const transformRateCategorys = filterRates.map(
//         (el) => (el = el.category)
//       );

//       const newRates = rates.map((el) =>
//         transformRateCategorys.includes(el.category)
//           ? { ...el, sourceOfRate: data.sourceOfIncome }
//           : el
//       );
//       await ratesService.updateRatesId(newRates._id, data);

//       newRates.forEach(
//         async (el) => await ratesService.updateRatesId(el._id, el)
//       );
//     } catch (error) {
//       dispatch(rateCategorysRequestFailed(error.message));
//     }
//   };

// export const getRateCategorysNewObject = () => (state) => {
//   if (state.rateCategorys.entities) {
//     const newObj = state.rateCategorys.entities.map((optionName) => ({
//       value: optionName._id,
//       label: optionName.sourceOfIncome,
//       color: optionName.color,
//       cardId: optionName.cardId,
//     }));
//     return newObj;
//   }
// };

// export const getRateCategorysList = (some, newObj) => (state) => {
//   if (some && newObj) {
//     const someArr = JSON.parse(JSON.stringify(some));
//     try {
//       const filterRateCategoryArr = newObj.filter((i) => {
//         if (someArr) {
//           return someArr.rateCategorys.includes(i.value);
//         }
//       });

//       someArr.rateCategorys = filterRateCategoryArr.map((i) => ({
//         label: i.label,
//         value: i.value,
//       }));

//       return someArr;
//     } catch (e) {
//       console.log(e.message);
//     }
//   }
// };

// export const getRateCategorys = () => (state) => {
//   try {
//     if (state.rateCategorys.entities) {
//       return state.rateCategorys.entities;
//     }
//   } catch (e) {
//     console.log(e.message);
//   }

// };

// export const getRateCategoryId = (id) => (state) => {
//   try {
//     if (state.rateCategorys.entities) {
//       return state.rateCategorys.entities.find((u) => u._id === id);
//     }
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// // export const getCommentsLoadingStatus = () => (state) =>
// //     state.comments.isLoading;

// export default rateCategorysReducer;

import { createSlice } from "@reduxjs/toolkit";
import rateCategorysService from "../services/rateCategorys.service";
import cardsService from "../services/cards.service";
import ratesService from "../services/rates.service";
// import { getReceipts } from './receipts';

const rateCategorysSlice = createSlice({
  name: "rateCategorys",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    rateCategorysRequested: (state) => {
      state.isLoading = true;
    },
    rateCategorysReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    rateCategorysRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addRateCategoryItem: (state, action) => {
      state.entities = action.payload;
    },
    removeRateCategoryItem: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: rateCategorysReducer, actions } = rateCategorysSlice;
const {
  rateCategorysRequested,
  rateCategorysReceived,
  rateCategorysRequestFailed,
  addRateCategoryItem,
  removeRateCategoryItem,
} = actions;

export const loadRateCategorysList = () => async (dispatch) => {
  dispatch(rateCategorysRequested());
  try {
    const { content } = await rateCategorysService.getRateCategorys();
    dispatch(rateCategorysReceived(content));
  } catch (error) {
    dispatch(rateCategorysRequestFailed(error.message));
  }
};

export const removeRateCategory =
  (id, categorys, rates) => async (dispatch, getState) => {
    dispatch(rateCategorysRequested());
    try {
      const categoryDelete = getState().rateCategorys.entities.filter(
        (i) => i._id !== id
      );

      dispatch(removeRateCategoryItem(categoryDelete));
      await rateCategorysService.removeRateCategoryId(id);

      const deleteRateCategory = categorys.filter((e) => e._id === id);
      const transformRateCategorys = deleteRateCategory.map(
        (el) => (el = el._id)
      );
      const { content } = await cardsService.getCards();

      const toRemove = new Set(transformRateCategorys);
      const transformCategoryCard = content.map((c) =>
        c.rateCategorys.filter((el) => !toRemove.has(el))
      );
      const removeDuplicatesCategoryId = content.map((el, i) => ({
        ...el,
        rateCategorys: transformCategoryCard[i],
      }));

      removeDuplicatesCategoryId.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      const transformRatesSomeValue = rates.filter(
        (e) => e.category === transformRateCategorys.join(" ")
      );

      transformRatesSomeValue.forEach(
        async (el) => await ratesService.removeRatesId(el._id)
      );
    } catch (error) {
      dispatch(rateCategorysRequestFailed(error.message));
    }
  };

export const addRateCategory =
  (cardById, data, id) => async (dispatch, getState) => {
    try {
      const transformCardById = [...cardById.rateCategorys, data._id];
      await rateCategorysService.createRateCategory(data);
      await cardsService.updateCard(id, {
        ...cardById,
        rateCategorys: transformCardById,
      });
    } catch (error) {
      dispatch(rateCategorysRequestFailed(error.message));
    }
  };

export const updateRateCategory =
  (data, rates, id) => async (dispatch, getState) => {
    try {
      const rateCategorys = getState().rateCategorys.entities;

      const rateCategorysIndex = rateCategorys.findIndex((i) => i._id === id);
      const updateCategorysArr = rateCategorys.map((el) =>
        id.includes(el._id)
          ? { ...rateCategorys[rateCategorysIndex], ...data }
          : el
      );
      dispatch(addRateCategoryItem(updateCategorysArr));
      await rateCategorysService.updateRateCategoryId(id, data);

      const filterRates = rates.filter((el) => el.category === id);

      const transformRateCategorys = filterRates.map(
        (el) => (el = el.category)
      );

      const newRates = rates.map((el) =>
        transformRateCategorys.includes(el.category)
          ? { ...el, sourceOfRate: data.sourceOfIncome }
          : el
      );
      await ratesService.updateRatesId(newRates._id, data);

      newRates.forEach(
        async (el) => await ratesService.updateRatesId(el._id, el)
      );
    } catch (error) {
      dispatch(rateCategorysRequestFailed(error.message));
    }
  };

export const getRateCategorysNewObject = () => (state) => {
  if (state.rateCategorys.entities) {
    const newObj = state.rateCategorys.entities.map((optionName) => ({
      value: optionName._id,
      label: optionName.sourceOfIncome,
      color: optionName.color,
      cardId: optionName.cardId,
    }));
    return newObj;
  }
};

export const getRateCategorysList = (some, newObj) => (state) => {
  if (some && newObj) {
    const someArr = JSON.parse(JSON.stringify(some));
    try {
      const filterRateCategoryArr = newObj.filter((i) => {
        if (someArr) {
          return someArr.rateCategorys.includes(i.value);
        }
      });

      someArr.rateCategorys = filterRateCategoryArr.map((i) => ({
        label: i.label,
        value: i.value,
      }));

      return someArr;
    } catch (e) {
      console.log(e.message);
    }
  }
};

export const getRateCategorys = () => (state) => {
  try {
    if (state.rateCategorys.entities) {
      return state.rateCategorys.entities;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getRateCategoryId = (id) => (state) => {
  try {
    if (state.rateCategorys.entities) {
      return state.rateCategorys.entities.find((u) => u._id === id);
    }
  } catch (e) {
    console.log(e.message);
  }
};

// export const getCommentsLoadingStatus = () => (state) =>
//     state.comments.isLoading;

export default rateCategorysReducer;
