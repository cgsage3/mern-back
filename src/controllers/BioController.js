const Utilities = require('../Utilities');
const Bio = require('../models/Bio');
const User = require('../models/User');

class BioController {

	async addBio(req, res) {
		try {
			const bio = new Bio(req.body);
			const savedBio = await bio.save();
			// const user = await User.findOne({ email: req.body.email });
			const user = await User.findById({ _id: bio.user })
			console.log(user);

			// await user.save();
			const data = {
				_id: savedBio._id,
				biography: savedBio.biography,
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

	async readBio(req, res) {

		try {
			const options = {
				page: req.query?.page || 1,
				limit: req.query?.limit || 10,
			};
			let bio = []
			console.log(req.params);
			if (req.params.bioId) {
				bio = await Bio.findOne({ _id: req.params.bioId })
			} else {
				bio = await Bio.paginate({}, options)
			}
			Utilities.apiResponse(res, 200, 'Get Bio Successfully', bio)
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

module.exports = new BioController();