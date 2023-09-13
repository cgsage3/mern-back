const Utilities = require('../Utilities');
const User = require('../models/User');
const Experience = require('../models/Experience');

class ExperienceController {

    async addExperience(req, res) {
        try {
            const experience = new Experience(req.body);
            const savedExperience = await experience.save();
            // const user = await User.findOne({ email: req.body.email });
            const publisher = await User.findById({_id: experience.user})

            // await publisher.save();
            const data = {
                _id: savedExperience._id,
                year: savedExperience.year,
                position: savedExperience.position,
                companyName: savedExperience.companyName,
                details: savedExperience.details,
                user: publisher
            };

            console.log(req.body);


            // const accessToken = await Utilities.signAccessToken(data);
            // Utilities.apiResponse(res, 200, 'Experience Created Successfully!', {
            //     ...data,
            //     // accessToken,
            // });
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }  
  
}

module.exports = new ExperienceController();