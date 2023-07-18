const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');

const CoverSchema = new Schema(
    {
        coverName: {
            type: String,
            required: true,
        },
        dear: {
            type: String,
            required: true,            
        },
        letter: {
            type: String,
            required: true,
        },

    },
    { timestamps: { currentTime: () => Date.now() } },
);

CoverSchema.plugin(mongoosePaginate)



const Cover = mongoose.model('coverletter', CoverSchema);
module.exports = Cover;
