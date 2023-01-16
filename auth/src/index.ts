import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
	try {
        if(!process.env.JWT_KEY){
            throw new Error("JWT_KEY must be defined")
        }
		await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
		console.log("Connected to mongoDb");
	} catch (e) {
		console.log("e: ", e);
	}

	app.listen(3000, () => {
		console.log("Listening on port 3000!!!!!");
	});
};

start();
