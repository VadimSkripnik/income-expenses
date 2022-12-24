const {Schema, model} = require("mongoose")

const schema = new Schema({
    data: {
        type: String
    },
    color: {
        type: String
    },
    sourceOfIncome: {
        type: String
    },
    cardId: {type: Schema.Types.ObjectId, ref: "Card"},
    userId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model("IncomeCategory", schema)