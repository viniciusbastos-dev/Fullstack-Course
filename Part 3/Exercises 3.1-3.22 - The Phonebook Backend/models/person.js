const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connected to", url);

mongoose
    .connect(url)
    .then(({ connections }) => {
        const connection = connections[0];
        console.log(`Connected to MongoDB on aplication ${connection.name}`);
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (v) => /^\d{2,3}-\d{5,}$/.test(v),
            message: (props) =>
                `${props.value} isn't a valid number valid. The correct format is xxx-xxxxxx`,
        },
        required: true,
    },
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Person", personSchema);
