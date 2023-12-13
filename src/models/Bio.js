const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const BioSchema = new Schema(
	{
		phone: {
			type: Number,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		website: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		biography: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "user",
		}
	},
	{ timestamps: { currentTime: () => Date.now() } },
);

BioSchema.plugin(mongoosePaginate)



const Bio = mongoose.model('Bio', BioSchema);
module.exports = Bio;
