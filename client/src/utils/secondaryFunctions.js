// import dailyExpensesService from "../services/dailyExpenses.service";

// export const getDaysInMonth = (month, year, count) => {
//     const date = new Date(year, month, 1);
//     const days = [];
//     while (date.getMonth() === month) {
//         const obj = {
//             _id: String((count += Date.now())),
//             data: date.toLocaleDateString(),
//             quantityRate: [],
//             spent: 0,
//             budget: 0,
//             balance: 0,
//             cardId: []
//         };
//         days.push(obj);
//         date.setDate(date.getDate() + 1);
//     }
//     return days;
// };

// const transformdailyExpenses = (d) => d.map((el) => (el = el.data));


// async function some() {
  
   
    
//     const month = new Date().getMonth();
//     const year = new Date().getFullYear();

    // if (!content) {
    //    getDaysInMonth(month, year, 1).forEach(async(el) => await dailyExpensesService.createDailyExpenses(el));
    // }


    
    // if (content) {
    
    //     let flag = false;
    //     const dailyExpenses = [...content]
    //     const dailyExpensesThisMonth = getDaysInMonth(month, year, 1);
    //     const dailyExpensesThisMonthData = transformdailyExpenses(
    //         dailyExpensesThisMonth
    //     );
    //     const dailyExpensesThisMonthSlice = dailyExpensesThisMonthData.map((d) =>
    //         d.slice(3)
    //     );
    
    //     const dailyExpensesThisMonthRemoveDublicate = [
    //         ...new Set(dailyExpensesThisMonthSlice)
    //     ];
    
    //     const dailyExpensesData = transformdailyExpenses(dailyExpenses);
    //     const dailyExpensesSlice = dailyExpensesData.map((d) => d.slice(3));
    
    //     dailyExpensesSlice.forEach((el) =>
    //         dailyExpensesThisMonthRemoveDublicate.includes(el)
    //             ? (flag = false)
    //             : (flag = true)
    //     );
    //     const splicingArray = dailyExpenses.concat(dailyExpensesThisMonth);
    //     flag &&
    //     splicingArray.forEach(async(el) => await dailyExpensesService.createDailyExpenses(el));

    // }


// }

// some()

export const convertArrayOfElementsToId = (arr) => arr.map((el) => el._id)

export const lookingForTheRightItem = (arr, elem) => arr.filter(
        (el) => elem.includes(el.data))
