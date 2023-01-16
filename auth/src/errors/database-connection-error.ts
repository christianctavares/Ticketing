import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = "Error connecting to database";
	constructor() {
		super('Error connecting to DB');
		//Only because we are extenting a build in class
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeError() {
		return [
			{
				message: this.reason,
			}
		];
	}
}
