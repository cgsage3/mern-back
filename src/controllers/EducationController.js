const Utilities = require('../Utilities');
const Education = require('../models/Education');
const User = require('../models/User');

class EducationController {

	async addEducation(req, res) {
		try {
			const edu = new Education(req.body);
			const savedEducation = await edu.save();
			// const user = await User.findOne({ email: req.body.email });
			const user = await User.findById({ _id: edu.user })
			console.log(user);

			// await user.save();
			const data = {
				_id: savedEducation._id,
				degree: savedEducation.degree,
				field: savedEducation.field,
				institution: savedEducation.institution,
				address: savedEducation.address,
				year: savedEducation.year,
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

	async readEducation(req, res) {

		try {
			const options = {
				page: req.query?.page || 1,
				limit: req.query?.limit || 10,
			};
			let edu = []
			if (req.params.eduId) {
				edu = await Education.findOne({ _id: req.params.eduId })
			} else {
				edu = await Education.paginate({}, options)
			}
			Utilities.apiResponse(res, 200, 'Get Education Successfully', edu)
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

module.exports = new EducationController();