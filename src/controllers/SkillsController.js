const Utilities = require('../Utilities');
const Skills = require('../models/Skills');
const User = require('../models/User');

class SkillsController {

	async addSkills(req, res) {
		try {
			const edu = new Skills(req.body);
			const savedSkills = await edu.save();
			// const user = await User.findOne({ email: req.body.email });
			const user = await User.findById({ _id: edu.user })
			console.log(user);

			// await user.save();
			const data = {
				_id: savedSkills._id,
				category: savedSkills.category,
				skills: savedSkills.skills,
				user: user
			};




			// const accessToken = await Utilities.signAccessToken(data);
			Utilities.apiResponse(res, 200, 'Biography Created Successfully!', {
				...data,
				// accessToken,
			});
		} catch (error) {
			Utilities.apiResponse(res, 500, error);
		}
	}

	async readSkills(req, res) {

		try {
			const options = {
				page: req.query?.page || 1,
				limit: req.query?.limit || 10,
			};
			let skills = []
			if (req.params.bioId) {
				skills = await Skills.findOne({ _id: req.params.skillsId })
			} else {
				skills = await Skills.paginate({}, options)
			}
			Utilities.apiResponse(res, 200, 'Get Skills Successfully', skills)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async update(req, res) {
		try {
			const doesExist = await User.findOne({ email: req.body.email })
			if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
			await User.findOneAndUpdate({ _id: req.body.user_id }, req.body)
			Utilities.apiResponse(res, 200, 'User Has Been Updated Successfully')
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async delete(req, res) {
		try {
			// await User.findOneAndDelete({ _id: req.body.user_id }, req.body)
			await User.find({ _id: req.params.userId }).remove().exec();
			Utilities.apiResponse(res, 200, 'User Deleted Successfully')
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}
}

module.exports = new SkillsController();