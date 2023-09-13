const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');

const ExperienceSchema = new Schema(
    {
        year: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },    
        companyName: {
            type: String,
            required: true,
            unique: true,
        },
        details: {
            type: [String],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
        }        
    },
    { timestamps: { currentTime: () => Date.now() } },    
);

ExperienceSchema.plugin(mongoosePaginate)



const Experience = mongoose.model('Experience', ExperienceSchema);
module.exports = Experience;
