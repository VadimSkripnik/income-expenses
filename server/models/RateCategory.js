const {Schema, model} = require("mongoose")

const schema = new Schema({
    data: {
        type: String
    },
    sourceOfIncome: {
        type: String
    },
    color: {
        type: String
    },
    cardId: {type: Schema.Types.ObjectId, ref: "Card"},
    userId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model("RateCategory", schema)