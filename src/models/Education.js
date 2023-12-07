const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const EducationSchema = new Schema(
	{
		degree: {
			type: String,
			required: true,
		},
		field: {
			type: String,
			required: true,
		},
		institution: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
		},
		year: {
			type: String,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "user",
		}
	},
	{ timestamps: { currentTime: () => Date.now() } },
);

EducationSchema.plugin(mongoosePaginate)



const Education = mongoose.model('Education', EducationSchema);
module.exports = Education;
