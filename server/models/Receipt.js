const {Schema, model} = require("mongoose")

const schema = new Schema({
    data: {
        type: String
    },
    category: {
        type: String
    },
    sourceOfIncome: {
        type: String
    },
    color: {
        type: String
    },
    nameCardReceipt: {
        type: String
    },
    profit: {
        type: Number
    },
    cardId: {type: Schema.Types.ObjectId, ref: "Card"},
    userId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model("Receipt", schema)