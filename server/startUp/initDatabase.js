// const Card = require("../models/Card")
// const DailyExpense = require("../models/DailyExpense")
// const IncomeCategory = require("../models/IncomeCategory")
// const RateCategory = require("../models/RateCategory")
// const Rate = require("../models/Rate")
// const Receipt = require("../models/Receipt")
// const User = require("../models/User")

// const cardsMock = require("../mock/cards.json")
// const dailyExpensesMock = require("../mock/dailyExpenses.json")
// const incomeCategorysMock = require("../mock/incomeCategorys.json")
// const rateCategorysMock = require("../mock/rateCategorys.json")
// const ratesMock = require("../mock/rates.json")
// const receiptsMock = require("../mock/receipts.json")
// // const usersMock = require("../mock/user.json")



// module.exports = async () => {
//     const cards = await Card.find()
//     if (cards.length !== cardsMock.length) {
//         await createInitialEntity(Card, cardsMock)
//     }
//     const dailyExpenses= await DailyExpense.find()
//     if (dailyExpenses.length !== dailyExpensesMock.length) {
//         await createInitialEntity(DailyExpense, dailyExpensesMock)
//     }
//     const incomeCategorys= await IncomeCategory.find()
//     if (incomeCategorys.length !== incomeCategorysMock.length) {
//         await createInitialEntity(IncomeCategory, incomeCategorysMock)
//     }
//     const rateCategorys= await RateCategory.find()
//     if (rateCategorys.length !== rateCategorysMock.length) {
//         await createInitialEntity(RateCategory, rateCategorysMock)
//     }
//     const rates= await Rate.find()
//     if (rates.length !== ratesMock.length) {
//         await createInitialEntity(Rate, ratesMock)
//     }
//     const receipts= await Receipt.find()
//     if (receipts.length !== receiptsMock.length) {
//         await createInitialEntity(Receipt, receiptsMock)
//     }
//     // const users= await User.find()
//     // if (users.length !== usersMock.length) {
//     //     await createInitialEntity(User, usersMock)
//     // }

// }

// async function createInitialEntity(Model, data) {
//     await Model.collection.drop()
//      return Promise.all(
//         data.map(async item => {
//             try {
//                 delete item._id
//                 const newItem = new Model(item)
//                 await newItem.save()
//                 return newItem
//             } catch (e) {
//                 return e
//             }
//         })
//      )
// }

const Card = require("../models/Card")
const DailyExpense = require("../models/DailyExpense")
const IncomeCategory = require("../models/IncomeCategory")
const RateCategory = require("../models/RateCategory")
const Rate = require("../models/Rate")
const Receipt = require("../models/Receipt")
const User = require("../models/User")

// const cardsMock = require("../mock/cards.json")
const dailyExpensesMock = require("../mock/dailyExpenses.json")
// const incomeCategorysMock = require("../mock/incomeCategorys.json")
// const rateCategorysMock = require("../mock/rateCategorys.json")
// const ratesMock = require("../mock/rates.json")
// const receiptsMock = require("../mock/receipts.json")
// const usersMock = require("../mock/user.json")



module.exports = async () => {
    // const cards = await Card.find()
    // if (cards.length !== cardsMock.length) {
    //     await createInitialEntity(Card, cardsMock)
    // }
    const dailyExpenses= await DailyExpense.find()
    if (dailyExpenses.length !== dailyExpensesMock.length) {
        await createInitialEntity(DailyExpense, dailyExpensesMock)
    }
    // const incomeCategorys= await IncomeCategory.find()
    // if (incomeCategorys.length !== incomeCategorysMock.length) {
    //     await createInitialEntity(IncomeCategory, incomeCategorysMock)
    // }
    // const rateCategorys= await RateCategory.find()
    // if (rateCategorys.length !== rateCategorysMock.length) {
    //     await createInitialEntity(RateCategory, rateCategorysMock)
    // }
    // const rates= await Rate.find()
    // if (rates.length !== ratesMock.length) {
    //     await createInitialEntity(Rate, ratesMock)
    // }
    // const receipts= await Receipt.find()
    // if (receipts.length !== receiptsMock.length) {
    //     await createInitialEntity(Receipt, receiptsMock)
    // }
    // const users= await User.find()
    // if (users.length !== usersMock.length) {
    //     await createInitialEntity(User, usersMock)
    // }

}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
     return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
     )
}