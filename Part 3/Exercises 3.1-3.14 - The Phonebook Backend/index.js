require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

const PORT = process.env.PORT || 10000;

morgan.token("body", (req) => {
	if (req.method === "POST") return JSON.stringify(req.body);

	return "";
});

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.static("dist"));

// Requests

app.get("/api/persons", (req, res) => {
	Person.find().then((result) => {
		res.json(result);
	});
});

app.get("/api/persons/:id", (req, res) => {
	Person.findById(req.params.id).then((person) => {
		res.json(person);
	});
});

app.get("/info", (req, res) => {
	const requestTime = new Date().toString();

	Person.find().then((result) => {
		res.send(`
		<p>Phonebook has info for ${result.length} people</p>
		<p>${requestTime}</p>
		`);
	});
});

app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({ error: `${!body.name ? "Name missing" : "Number missing"}` });
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person.save().then((savedPerson) => {
		res.status(201).json(savedPerson);
	});
});

app.delete("/api/persons/:id", (req, res) => {
	Person.findByIdAndDelete(req.params.id).then((result) => {
		res.status(204).end();
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
