const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
	{
		id: 5,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
	{
		id: 6,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const generateUniqueID = (persons) => {
	const randomID = () => Math.floor(Math.random() * 10000);

	const checkID = (id) => persons.some((person) => person.id === id);

	let newId;

	do {
		newId = randomID();
	} while (checkID(newId));

	return newId;
};

morgan.token("body", (req) => {
	if (req.method === "POST") return JSON.stringify(req.body);

	return "";
});

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
	res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.get("/info", (req, res) => {
	const requestTime = new Date().toString();

	res.send(`
	<p>Phonebook has info for ${persons.length} people</p>
	<p>${requestTime}</p>
	`);
});

app.post("/api/persons", (req, res) => {
	const body = req.body;
	const nameExists = persons.find(
		(person) => person.name.toLowerCase() === body.name.toLowerCase()
	);

	if (!body.name || !body.number) {
		return res
			.status(400)
			.json({ error: `Error 400: ${!body.name ? "Name missing" : "Number missing"}` });
	}

	if (nameExists) {
		return res.status(409).json({ error: "Error 409: Name must be unique" });
	}

	const person = {
		id: generateUniqueID(persons),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);

	res.status(201).json(person);
});

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);

	persons = persons.filter((person) => person.id !== id);

	res.status(204).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
