// NOTE: This is just a placeholder for now and will likely be rewritten soon

const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const groupSchema = new Schema({
    secretary: {
        name: {
            type: String,
            required: true,
            trim: true,
            minlenth: 1,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            validate: [
                {
                    validator: value => {
                        return validator.isEmail(value);
                    },
                    message: "{VALUE} is not a valid email.",
                },
            ],
        },
        phone: String,
    },
    members: [
        { id: ObjectId, name: String, profile: String, standing: String },
    ],
    groupName: String,
    premium: String,
    groupDocs: [String],
    groupStanding: String,
    accessCode: String,
});

groupSchema.statics.findByAccessCode = function(accessCode) {
    return this.findOne({ accessCode });
};

module.exports = mongoose.model("groups", groupSchema);
