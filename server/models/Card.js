// const {Schema, model} = require("mongoose")

// const schema = new Schema({
//     nameCard: {
//         type: String
//     },
//     name: {
//         type: String
//     },
//     userId: {type: String},
//     incomeCategorys: [{type: Schema.Types.ObjectId, ref: "incomeCategorys"}],
//     rateCategorys: [{type: String}]
// }, {
//     timestamps: true
// })

// module.exports = model("Card", schema)

const {Schema, model} = require("mongoose")

const schema = new Schema({
    data: {
        type: String
    },
    nameCard: {
        type: String
    },
    name: {
        type: String
    },
    userId: {type: String},
    incomeCategorys: [{type: Schema.Types.ObjectId, ref: "IncomeCategory"}],
    incomeCategorys: [],
    rateCategorys: [{type: Schema.Types.ObjectId, ref: "RateCategory"}]
}, {
    timestamps: true
})

module.exports = model("Card", schema)