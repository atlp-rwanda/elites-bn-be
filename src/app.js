/* eslint-disable no-console */
import express from 'express';
import routes from './routes/index';
import db from './models';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "development";

try {
	const { sequelize } = db;
	//TESTING DATABASE CONNECTION
	if (mode === "development") {
		sequelize
			.authenticate()
			.then(() => {
				console.log("DEV DB CONNECTED...");
			})
			.catch((err) => {
				console.log("Unable to connect to the database: ", err);
			});
	}
	if (mode === "test") {
		sequelize
			.authenticate()
			.then(() => {
				console.log("TEST DB CONNECTED...");
			})
			.catch((err) => {
				console.log("Unable to connect to the database: ", err);
			});
	}
	if (mode === "production") {
		sequelize
			.authenticate()
			.then(() => {
				console.log("PRODUCTION DB CONNECTED...");
			})
			.catch((err) => {
				console.log("Unable to connect to the database: ", err);
			});
	}
	app.use("/api/v1", routes);
	app.listen(port, () => {
		console.log(`The server is running on port ${port}`);
	});
} catch (error) {
    console.log(error);
}
export default app;