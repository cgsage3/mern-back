const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const BioSchema = new Schema(
	{
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
