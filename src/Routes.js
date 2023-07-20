const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();
const puppeteer = require('puppeteer'); // Adding Puppeteer
const path = require('path');

const AuthController = require('./controllers/AuthController');
const CrudController = require('./controllers/CrudController')
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

Route.route('/api/v1/addCover')
    .post(AuthController.addCover)
    .all(Utilities.send405);

Route.route('/api/v1/users/:userId?')
    .post(CrudController.create)
    .get(CrudController.read)
    .put(CrudController.update)
    .delete(CrudController.delete)
    .all(Utilities.send405);

Route.route('/api/v1/covers/:coverName?')
    .get(CrudController.readCover)
    .delete(CrudController.deleteCover)
    .all(Utilities.send405);

Route.route('/api/v1/del/covers/:coverId?')
    .delete(CrudController.deleteCover)
    .all(Utilities.send405);


Route.use('/api/v1/pdf/covers/:id?', (req, res, next) => {
    // Launching the Puppeteer controlled headless browser and navigate to the Digimon website
    url="https://cover-letter-mern-front.onrender.com/covers/only/" + req.params.id;
    loc="public/uploads/cover"+req.params.id+".pdf";
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
    })();
}, (req, res, next) => {
  res.send('Done printing')
  next()
})
Route.use(express.static('public'))
module.exports = Route;
