const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();
const puppeteer = require('puppeteer'); // Adding Puppeteer
const path = require('path');

const AuthController = require('./controllers/AuthController');
const CrudController = require('./controllers/CrudController')
const CoverController = require('./controllers/CoverController')
const ExperienceController = require('./controllers/ExperienceController')
const EducationController = require('./controllers/EducationController')
const BioController = require('./controllers/BioController')
const SkillsController = require('./controllers/SkillsController')
/**
 * APIs V1 Routes
 */
Route.route('/')
	.get((req, res) =>
		Utilities.apiResponse(res, 200, 'Cover Letter MERN App', {
			By: 'Cesar Granda',
		}),
	)
	.all(Utilities.send405);

Route.route('/api')
	.get((req, res) => Utilities.apiResponse(res, 200, 'Welcome API'))
	.all(Utilities.send405);

Route.route('/api/v1')
	.get((req, res) => Utilities.apiResponse(res, 200, 'APIs V1'))
	.all(Utilities.send405);

Route.route('/api/v1/login')
	.post(AuthController.login)
	.all(Utilities.send405);

Route.route('/api/v1/signup')
	.post(AuthController.signup)
	.all(Utilities.send405);

Route.route('/api/v1/users/:userId?')
	.post(CrudController.create)
	.get(CrudController.read)
	.put(CrudController.update)
	.delete(CrudController.delete)
	.all(Utilities.send405);


Route.route('/api/v1/covers/:coverId?')
	.post(CoverController.addCover)
	.delete(CoverController.deleteCover)
	.get(CoverController.readCover)
	.put(CoverController.updateCover)
	.all(Utilities.send405);

Route.route('/api/v1/c/:coverId?')
	.put(CoverController.updateCover)
	.all(Utilities.send405);

Route.route('/api/v1/publish/:id?')
	.get(CoverController.readCoverUser)
	.all(Utilities.send405);

Route.route('/api/v1/publishAll/:id?')
	.get(CoverController.readCoverUserAll)
	.all(Utilities.send405);


Route.route('/api/v1/experience/:experienceId?')
	.post(ExperienceController.addExperience)
	.get(ExperienceController.readExperience)
	.all(Utilities.send405);

Route.route('/api/v1/bioAll/')
	.get(BioController.readBioUserAll)
	.all(Utilities.send405);


Route.route('/api/v1/bio/:bioId?')
	.post(BioController.addBio)
	.get(BioController.readBio)
	.put(BioController.updateBio)
	.all(Utilities.send405);

Route.route('/api/v1/education/:educationId?')
	.post(EducationController.addEducation)
	.get(EducationController.readEducation)
	.all(Utilities.send405);


Route.route('/api/v1/skills/:skillsId?')
	.post(SkillsController.addSkills)
	.get(SkillsController.readSkills)
	.all(Utilities.send405);

Route.use('/api/v1/pdf/covers/:id?', (req, res, next) => {
	// Launching the Puppeteer controlled headless browser and navigate to the Digimon website
	url = `${process.env.FRONT_URL}/covers/only/` + req.params.id;
	// url="https://cover-letter-mern-front.onrender.com/covers/only/" + req.params.id;
	loc = "public/uploads/cover-" + req.params.id + ".pdf";
	console.log(url);
	(async () => {
		const browser = await puppeteer.launch({});
		const cPage = await browser.newPage();


		await cPage.goto(url, {
			waitUntil: "networkidle0"
		});

		await cPage.pdf({
			path: loc,
			format: "Letter",
			printBackground: true
		});

		await browser.close();
	})()
	// res.json({ message: 'Hello World' });
	next()

});
Route.use('/api/v1/pdf/resume', (req, res, next) => {
	url = `${process.env.FRONT_URL}/view-resume/only`;
	loc = "public/uploads/resume.pdf";
	console.log(url);
	(async () => {
		const browser = await puppeteer.launch({ headless: true });
		const resumePage = await browser.newPage();


		await resumePage.goto(url, {
			waitUntil: "networkidle0"
		});

		await resumePage.pdf({
			path: loc,
			format: "Letter",
		});

		await browser.close();
	})()
	// res.json({ message: 'Hello World' });
	next()

});
Route.use(express.static('public'));
module.exports = Route;
