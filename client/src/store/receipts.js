import { createSlice } from "@reduxjs/toolkit";
import receiptsService from "../services/receipts.service";
// Вынести

const receiptsSlice = createSlice({
    name: "receipts",
    initialState: {
        entities: null,
        showHistoryCardId: null,
        // updateHistoryCardId: null,
        isLoading: true,
        error: null
    },
    reducers: {
        receiptsRequested: (state) => {
            state.isLoading = true;
        },
        receiptsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        showHistoryCardIdReceived: (state, action) => {
          state.showHistoryCardId = action.payload;
          state.isLoading = false;
      },
    //   updateHistoryCardId: (state, action) => {
    //     state.showHistoryCardId = action.payload;
    //     state.isLoading = false;
    // },
        receiptsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        // addReceiptsItem: (state, action) => {
        //     state.entities = action.payload;
        // },
        // removeReceiptsItem: (state, action) => {
        //      state.showHistoryCardId = action.payload;
        //     //  state.isLoading = false;
        // }
    }
});


const { reducer: receiptsReducer, actions } = receiptsSlice;
const { receiptsRequested, receiptsReceived, receiptsRequestFailed,
     addReceiptItem, 
     showHistoryCardIdReceived,
      removeReceiptItem
    //    updateHistoryCardId
     } = actions;

export const loadReceiptsList = (cardId) => async (dispatch) => {
    dispatch(receiptsRequested());
    try {
        const { content } = await receiptsService.getReceipts();
       
        const receiptCards = content.filter((c) => c.cardId === cardId);
       
        dispatch(showHistoryCardIdReceived(receiptCards))
        dispatch(receiptsReceived(content));
    } catch (error) {
        dispatch(receiptsRequestFailed(error.message));
    }
};



export const removeReceipt = (id) => async (dispatch, getState) => {
    try {
      const receipts = getState().receipts.showHistoryCardId;
      const deleteReceipt = receipts.filter((receipt) => receipt._id !== id);
      dispatch(showHistoryCardIdReceived(deleteReceipt))
      await receiptsService.removeReceiptId(id)
    } catch (error) {
      dispatch(receiptsRequestFailed(error.message));
    }
  };

  export const handleSubmitReceipt = (edit, data) => async (dispatch, getState) => {
    try {


        // Вынести
        const transformData = ({ profit, ...object }) => ({
            profit: Number(profit),
            ...object
        }); 



        const updateReceipts = getState().receipts.showHistoryCardId.map(
            (e) =>
              data._id.includes(e._id) ? {
                ...e,
                ...transformData(data)
              } : e
          );

          console.log(updateReceipts)
          dispatch(showHistoryCardIdReceived(updateReceipts))

        await receiptsService.updateReceiptId(edit, transformData(data))
    } catch (error) {
      dispatch(receiptsRequestFailed(error.message));
    }
  };

export const addReceipt = (data) => async (dispatch, getState) => {
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
    //     await receiptsService.createComment(content);
    //     dispatch(addCommentItem(comments));
    //     dispatch(commentsRequestFailed());
    // } catch (error) {
    //     dispatch(commentsRequestFailed(error.message));
    // }
};

export const getReceipts = () => (state) => state.receipts.showHistoryCardId;
export const getReceiptsAll = () => (state) => state.receipts.entities;

export const takeReceipt = (id) => (state) => {
    if(state.receipts.showHistoryCardId) {
        let receiptId = {}
        state.receipts.showHistoryCardId.filter(el => el._id === id && ( receiptId = el)) 
        return receiptId
    }
}
// export const getReceiptsLoadingStatus = () => (state) =>
//     state.receipts.isLoading;

export default receiptsReducer;





