require('../database/dbconfig/DB_mongodb_connection');
const mongoose = require('mongoose');
const User = require('../models/User');

async function listUsers() {
	// wait for the connection established in DB_mongodb_connection to be ready
	await mongoose.connection.asPromise();

	const users = await User.find({}, 'name email password');
	console.log(users);

	await mongoose.connection.close();
}

listUsers();
