import request from "supertest";
import { app } from "../../app";

it("returns 201 on successful signup", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);
});

it("returns 400  with a invalid email", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "testtest.com",
			password: "password",
		})
		.expect(400);
});

it("returns 400  with a invalid password", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "123",
		})
		.expect(400);
});

it("returns 400  with missing email and password", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({ email: "test@test.com" })
		.expect(400);
	return request(app)
		.post("/api/users/signup")
		.send({ password: "123456789" })
		.expect(400);
});

it("disallows duplicate email", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(400);
});

it("set a cookie after successful signup", async () => {
	const response = await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);
	expect(response.get("Set-Cookie")).toBeDefined();
});
