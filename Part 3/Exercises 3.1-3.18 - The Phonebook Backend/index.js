require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");
const app = express();

const PORT = process.env.PORT || 10000;

morgan.token("body", (req) => {
	if (req.method === "POST") return JSON.stringify(req.body);

	return "";
});

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

// Requests

app.get("/api/persons", (req, res, next) => {
	Person.find()
		.then((result) => {
		res.json(result);
	})
		.catch(error => next(error))
});

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
		res.json(person);
	})
		.catch(error => next(error))
});

app.get("/info", (req, res, next) => {
	const requestTime = new Date().toString();

	Person.find()
		.then((result) => {
		res.send(`
		<p>Phonebook has info for ${result.length} people</p>
		<p>${requestTime}</p>
		`)
	})
		.catch(error => next(error))
});

app.post("/api/persons", (req, res,next) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({ error: `${!body.name ? "Name missing" : "Number missing"}` });
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person.save()
		.then((savedPerson) => {
		res.status(201).json(savedPerson);
	})
		.catch(error => next(error))
});

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then((result) => {
		res.status(204).end();
	})
		.catch(error => next(error))
});

app.put("/api/persons/:id", (req,res,next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number
	}

	Person.findByIdAndUpdate(req.params.id, person, {new: true})
		.then(updatedPerson => {
			res.status(201).json(updatedPerson)
		})
		.catch(error => next(error))
})

const unknownEndpoint =(req,res) => {
	res.status(404).send({error: "Unknown endpoint"})
}

app.use(unknownEndpoint)

const errorHandler = (error, req,res,next) => {
	console.log(error.message)

	if(error.name === "CastError") {
		res.status(400).send({error: "Malformatted id"})
		return
	}
	next(error)
}

app.use(errorHandler)
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
