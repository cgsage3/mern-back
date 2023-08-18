const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');

const CoverSchema = new Schema(
    {
        coverName: {
            type: String,
        },
        dear: {
            type: String,
        },
        letter: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
    }
);

CoverSchema.plugin(mongoosePaginate)



const Cover = mongoose.model('coverletters', CoverSchema);
module.exports = Cover;
