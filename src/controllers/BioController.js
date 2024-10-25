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
				phone: savedBio.phone,
				email: savedBio.email,
				website: savedBio.website,
				address: savedBio.address,
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
	async readBioUser(req, res) {
		try {
			// const options = {
			//     page: req.query?.page || 1,
			//     limit: req.query?.limit || 10,
			// };
			const page = req.query?.page || 1; // Specify the page number you want to retrieve
			const perPage = req.query?.limit || 2; // Specify the number of covers per page            
			let covers = []
			covers = await User
				.findOne({ _id: req.params.id }, '_id')
				.populate(
					{
						path: 'userBio',
						select: 'phone email website address biography',
						options: {
							skip: (page - 1) * perPage,
							limit: perPage
						}
					}
				);

			console.log(covers);
			Utilities.apiResponse(res, 200, 'Get Bios from User Successfully', covers)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}
	async readBio(req, res) {

		try {
			const options = {
				page: req.query?.page || 1,
				limit: req.query?.limit || 10,
			};
			let bio = []
			if (req.params.bioId) {
				console.log(req.params);
				bio = await Bio.findOne({ _id: req.params.bioId })
			} else {
				bio = await Bio.find().sort({ createdAt: -1 }).limit(1);
			};
			Utilities.apiResponse(res, 200, 'Get Bio Successfully', bio)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}
	async updateBio(req, res) {
		try {

			const data = {
				_id: req.params.bioId,
				phone: req.body.phone,
				email: req.body.email,
				website: req.body.website,
				address: req.body.address,
				biography: req.body.biography,
			};
			// const Bio = new Bio(req.body);
			// const savedBio = await Bio.save();  
			await Bio.updateOne({ _id: req.params.bioId }, data)

			// console.log(req.body);

			Utilities.apiResponse(res, 200, 'Bio updated Successfully!', {
				...data,
				// accessToken,
			});
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}
	async readBioUserAll(req, res) {
		try {
			const options = {
				page: req.query?.page || 1,
				limit: req.query?.limit || 10,
			};
			let bios = []

			bios = await Bio.paginate({}, options)
			Utilities.apiResponse(res, 200, 'Get Bio Successfully', bios)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	// async update(req, res) {
	// 	try {
	// 		const doesExist = await User.findOne({ email: req.body.email })
	// 		if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
	// 		await User.findOneAndUpdate({ _id: req.body.user_id }, req.body)
	// 		Utilities.apiResponse(res, 200, 'User Has Been Updated Successfully')
	// 	} catch (error) {
	// 		Utilities.apiResponse(res, 500, error)
	// 	}
	// }

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