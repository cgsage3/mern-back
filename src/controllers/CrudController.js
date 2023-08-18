const Utilities = require('../Utilities');
const User = require('../models/User');
const Cover = require('../models/Cover');

class CrudController {

    async create(req, res) {
        try {
            const doesExist = await User.findOne({ email: req.body.email })
            if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
            const user = new User(req.body)
            const savedUser = await user.save()
            let data = {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
            Utilities.apiResponse(res, 200, 'User Created Successfully!', data)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async read(req, res) {
        
        try {
            const options = {
                page: req.query?.page || 1,
                limit: req.query?.limit || 10,
            };
            let users = []
            if (req.params.userId) {
                users = await User.findOne({ _id: req.params.userId })
            } else {
                users = await User.paginate({}, options)
            }
            Utilities.apiResponse(res, 200, 'Get Users Successfully', users)
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

    async addCover(req, res) {
        try {
            // const doesExist = await Cover.findOne({ coverName: req.body.coverName });
            // if (doesExist) {
            //     return Utilities.apiResponse(
            //         res,
            //         422,
            //         'Cover Letter already exists',
            //     );
            // }
            const cover = new Cover(req.body);
            const savedCover = await cover.save();

            // const user = await User.findOne({ email: req.body.email });
            const publisher = await User.findById({_id: cover.user})
            // await publisher.save();
            const data = {
                _id: savedCover._id,
                coverName: savedCover.coverName,
                dear: savedCover.dear,
                letter: savedCover.letter,
                user: publisher
            };

            console.log(publisher);



            const accessToken = await Utilities.signAccessToken(data);
            Utilities.apiResponse(res, 200, 'Cover Created Successfully!', {
                ...data,
                accessToken,
            });
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }  
    async readCoverUser(req, res) {       
        try {
            // const options = {
            //     page: req.query?.page || 1,
            //     limit: req.query?.limit || 10,
            // };
            const page = req.query?.page || 1; // Specify the page number you want to retrieve
            const perPage = req.query?.limit || 2; // Specify the number of covers per page            
            let covers = []
            covers = await  User
                            .findOne({ _id: req.params.id }, '_id')
                            .populate(
                                {
                                    path: 'coversPublished', 
                                    select: 'coverName dear letter',
                                    options: {
                                        skip: (page - 1) * perPage,
                                        limit: perPage
                                    }                                    
                                }
                            );

            console.log(req.query);
            Utilities.apiResponse(res, 200, 'Get Covers from User Successfully', covers)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async readCoverUserAll(req, res) {       
        try {
            // const options = {
            //     page: req.query?.page || 1,
            //     limit: req.query?.limit || 10,
            // };
            let covers = []
            covers = await  User
                            .findOne({ _id: req.params.id }, '_id')
                            .populate(
                                {
                                    path: 'coversPublishedAll', 
                                    select: 'coverName dear letter',                                    
                                }
                            );

            console.log(req.query);
            Utilities.apiResponse(res, 200, 'Get all covers count Successfully', covers)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async readCover(req, res) {
        try {
            const options = {
                page: req.query?.page || 1,
                limit: req.query?.limit || 10,
            };
            let covers = []
            if (req.params.coverId) {
                covers = await Cover.findOne({ _id: req.params.coverId })
            } else {
                covers = await Cover.paginate({}, options)
            }
            console.log(req.params);
            Utilities.apiResponse(res, 200, 'Get Covers Successfully', covers)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async updateCover(req, res) {
        try {
        
            const data = {
                _id: req.params.coverId,
                coverName: req.body.coverName,
                dear: req.body.dear,
                letter: req.body.letter,
            };
            // const cover = new Cover(req.body);
            // const savedCover = await cover.save();  
            await Cover.updateOne({ _id: req.params.coverId }, data)

            console.log(req.body);
            // Cover.updateOne({_id: req.params.coverId}, data);
            const accessToken = await Utilities.signAccessToken(data);
            Utilities.apiResponse(res, 200, 'Cover updated Successfully!', {
                ...data,
                accessToken,
            });
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }
    async deleteCover(req, res) {
        try {
            await Cover.find({ _id: req.params.coverId }).remove().exec();
            Utilities.apiResponse(res, 200, 'Cover Deleted Successfully');
            console.log(req.params);
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }
  
}

module.exports = new CrudController();