require('../database/dbconfig/DB_mongodb_connection');
const mongoose = require('mongoose');
const User = require('../models/User');

// Usage: node src/scripts/createUser.js "Name" "email@example.com" "password"
async function createUser() {
	const [name, email, password] = process.argv.slice(2);
	if (!name || !email || !password) {
		console.log('Usage: node src/scripts/createUser.js "Name" "email@example.com" "password"');
		process.exit(1);
	}

	await mongoose.connection.asPromise();

	const user = new User({ name, email, password });
	const savedUser = await user.save();
	console.log(`User created: ${savedUser.name} <${savedUser.email}>`);

	await mongoose.connection.close();
}

createUser().catch((error) => {
	console.error(error);
	process.exit(1);
});
