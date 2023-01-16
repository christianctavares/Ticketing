import request from "supertest";
import { app } from "../../app";

it("returns 201 on successful signin", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);
	return request(app)
		.post("/api/users/signin")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(200);
});

it("fails when a email that does not exist is supplied", async () => {
	return request(app)
		.post("/api/users/signin")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(400);
});

it("fails when an incorrect password is supplied", async () => {
	await request(app)
	.post("/api/users/signup")
	.send({
		email: "test@test.com",
		password: "password",
	})
	.expect(201);
	return request(app)
		.post("/api/users/signin")
		.send({
			email: "test@test.com",
			password: "dsfghjgfdgs",
		})
		.expect(400);
});

it("returns 400  with a invalid password", async () => {
	return request(app)
		.post("/api/users/signin")
		.send({
			email: "test@test.com",
			password: "123",
		})
		.expect(400);
});

it("returns 400  with missing email and password", async () => {
	await request(app)
		.post("/api/users/signin")
		.send({ email: "test@test.com" })
		.expect(400);
	return request(app)
		.post("/api/users/signin")
		.send({ password: "123456789" })
		.expect(400);
});

it("responds with a cookie after successful signin", async () => {
	await request(app)
	.post("/api/users/signup")
	.send({
		email: "test@test.com",
		password: "password",
	})
	.expect(201);
	const response = await request(app)
		.post("/api/users/signin")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(200);
	expect(response.get("Set-Cookie")).toBeDefined();
});
