const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const SkillsSchema = new Schema(
	{
		category: {
			type: String,
			required: true,
		},
		skills: {
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

SkillsSchema.plugin(mongoosePaginate)



const Skills = mongoose.model('Skills', SkillsSchema);
module.exports = Skills;
