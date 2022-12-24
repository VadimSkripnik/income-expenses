// import { createSlice } from "@reduxjs/toolkit";
// import ratesService from "../services/rates.service";
// import dailyExpensesService from "../services/dailyExpenses.service";

// const ratesSlice = createSlice({
//   name: "rates",
//   initialState: {
//     entities: null,
//     ratesSum: null,
//     ratesFilterId: null,
//     isLoading: true,
//     error: null,
//   },
//   reducers: {
//     ratesRequested: (state) => {
//       state.isLoading = true;
//     },
//     ratesReceived: (state, action) => {
//       state.entities = action.payload;
//       state.isLoading = false;
//     },
//     ratesRequestFailed: (state, action) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     },
//     addRatesSum: (state, action) => {
//       state.ratesSum = action.payload;
//     },
//     addRatesFilterId: (state, action) => {
//       state.ratesFilterId = action.payload;
//     }
//   },
// });

// const { reducer: ratesReducer, actions } = ratesSlice;
// const {
//   ratesRequested,
//   ratesReceived,
//   ratesRequestFailed,
//   addRatesFilterId,
//   addRatesSum,
// } = actions;

// export const loadRatesList = () => async (dispatch) => {
//   dispatch(ratesRequested());
//   try {
//     const { content } = await ratesService.getRates();
//     dispatch(ratesReceived(content));
//   } catch (error) {
//     dispatch(ratesRequestFailed(error.message));
//   }
// };

// export const removeRates = (id) => async (dispatch, getState) => {
  
// };

// export const getQuantityRate = (id) => async (dispatch, getState) => {
//   try {
//     const rates = getState().rates.entities;
//     const { content } = await dailyExpensesService.getDailyExpenseId(id);
  

//     const ratesFilterId = rates.filter((r) =>
//       content.quantityRate.includes(r._id)
//     );
//     // console.log(ratesFilterId)
//     // console.log(content)
//     dispatch(addRatesFilterId(ratesFilterId));
//     const ratesSum = ratesFilterId.reduce(
//       (sum, r) => sum + r.sum * r.quantity,
//       0
//     );
//     dispatch(addRatesSum(ratesSum));
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// export const getHandleSubmitAddRates =
//   (data, rateCategorys, rateId, dailyExpenses) =>
//   async (getState, dispatch) => {
//     try {
//       const updateDailyExpenseCardIdAndQuantityRate = (cardId, elem) => {
//         cardId.push(elem);
//         const res = [...new Set(cardId)];
//         return res;
//       };

//       const objRate = {
//         // _id: String(Date.now()),
//         data: new Date().toLocaleDateString(),
//         category: data.category,
//         itemName: data.itemName,
//         sourceOfRate: rateCategorys[0].sourceOfIncome,
//         color: rateCategorys[0].color,
//         position: "",
//         sum: Number(data.sum),
//         quantity: data.quantity,
//         cardId: rateCategorys[0].cardId,
//       };

//       await dailyExpensesService.updateDailyExpense({
//         ...dailyExpenses,
//         cardId: updateDailyExpenseCardIdAndQuantityRate(
//           dailyExpenses.cardId,
//           objRate.cardId
//         ),
//         quantityRate: updateDailyExpenseCardIdAndQuantityRate(
//           dailyExpenses.quantityRate,
//           objRate._id
//         ),
//       });
//       await ratesService.createRateId({
//         ...objRate,
//         position: dailyExpenses.quantityRate.indexOf(objRate._id) + 1,
//       });
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

// export const getRates = () => (state) => state.rates.entities;
// export const getRatesSum = () => (state) => state.rates.ratesSum;
// export const getRatesFilterId = () => (state) => state.rates.ratesFilterId;
// // export const getCommentsLoadingStatus = () => (state) =>
// //     state.comments.isLoading;

// export default ratesReducer;


import { createSlice } from "@reduxjs/toolkit";
import ratesService from "../services/rates.service";
import dailyExpensesService from "../services/dailyExpenses.service";

const ratesSlice = createSlice({
  name: "rates",
  initialState: {
    entities: null,
    ratesSum: null,
    ratesFilterId: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    ratesRequested: (state) => {
      state.isLoading = true;
    },
    ratesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    ratesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addRatesSum: (state, action) => {
      state.ratesSum = action.payload;
    },
    addRatesFilterId: (state, action) => {
      state.ratesFilterId = action.payload;
    }
  },
});

const { reducer: ratesReducer, actions } = ratesSlice;
const {
  ratesRequested,
  ratesReceived,
  ratesRequestFailed,
  addRatesFilterId,
  addRatesSum,
} = actions;

export const loadRatesList = () => async (dispatch) => {
  dispatch(ratesRequested());
  try {
    const { content } = await ratesService.getRates();
    dispatch(ratesReceived(content));
  } catch (error) {
    dispatch(ratesRequestFailed(error.message));
  }
};

export const removeRates = (id) => async (dispatch, getState) => {
  
};

export const getQuantityRate = (id) => async (dispatch, getState) => {
  try {
    const rates = getState().rates.entities;
    const { content } = await dailyExpensesService.getDailyExpenseId(id);
  

    const ratesFilterId = rates.filter((r) =>
      content.quantityRate.includes(r._id)
    );
    dispatch(addRatesFilterId(ratesFilterId));
    const ratesSum = ratesFilterId.reduce(
      (sum, r) => sum + r.sum * r.quantity,
      0
    );
    dispatch(addRatesSum(ratesSum));
  } catch (e) {
    console.log(e.message);
  }
};

export const getHandleSubmitAddRates =
  (data, rateCategorys, rateId, dailyExpenses) =>
  async (getState, dispatch) => {
    try {
      const updateDailyExpenseCardIdAndQuantityRate = (cardId, elem) => {
        cardId.push(elem);
        const res = [...new Set(cardId)];
        return res;
      };

      const objRate = {
        data: new Date().toLocaleDateString(),
        category: data.category,
        itemName: data.itemName,
        sourceOfRate: rateCategorys[0].sourceOfIncome,
        color: rateCategorys[0].color,
        position: "",
        sum: Number(data.sum),
        quantity: data.quantity,
        cardId: rateCategorys[0].cardId,
      };
      console.log(dailyExpenses.quantityRate.length)

      await ratesService.createRateId({
        ...objRate,
        position: dailyExpenses.quantityRate.length + 1,
      });

      await dailyExpensesService.updateDailyExpense({
        ...dailyExpenses,
        cardId: updateDailyExpenseCardIdAndQuantityRate(
          dailyExpenses.cardId,
          objRate.cardId
        ),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

export const getRates = () => (state) => state.rates.entities;
export const getRatesSum = () => (state) => state.rates.ratesSum;
export const getRatesFilterId = () => (state) => state.rates.ratesFilterId;
// export const getCommentsLoadingStatus = () => (state) =>
//     state.comments.isLoading;

export default ratesReducer;
