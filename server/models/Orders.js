const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema(
    {
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Client"
        },

        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Branches"
        },

        // name: {
        //     type: String,
        //     required: true,
        //     unique: true,
        // },

        sweets: {
            type: [mongoose.Schema.Types.ObjectId],
            ref:"Bsket",
            required: true
        },


        address: {
            city:String,
            street: String,
            building: Number
        },

        status: {
            type:String,
            enum: ["accepted", "done", "closed","canceled"],
            default: "accepted"
        }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Orders', ordersSchema)