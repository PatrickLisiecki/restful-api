const express = require("express");
const app = express();
const port = 7777;

const { v4: uuidv4 } = require("uuid");

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to my RESTful API");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get("/fruits", (req, res) => {
    if (fruits) {
        res.send(fruits);
    } else {
        res.status(404).send({ message: "Fruits not found" });
    }
});

app.get("/fruits/:fruitId", (req, res) => {
    // Grab id from parameters
    const targetId = req.params.fruitId;
    const targetFruit = fruits.find((fruit) => fruit.id === targetId);

    // Check if fruit with target id exists
    if (targetFruit) {
        res.send(targetFruit);
    } else {
        res.status(404).send({
            message: `Fruit with Id: ${targetId} not found.`,
        });
    }
});

app.post("/fruits", (req, res) => {
    // Create random id
    let uuid = uuidv4();
    let shortenedId = uuid.substring(0, 2);

    // Create new fruit object
    const newFruit = {
        id: shortenedId,
        ...req.body,
    };

    console.log("New Fruit:", newFruit);
    fruits.push(newFruit);
    res.status(204).send(newFruit);
});

app.patch("/fruits/:fruitId", (req, res) => {
    const targetId = req.params.id;

    const updates = req.body;

    const targetIndex = fruits.findIndex((fruit) => fruit.id === targetId);
    const updatedFruit = { ...fruits[targetIndex], ...updates };

    fruits[targetIndex] = updatedFruit;
    res.status(204).send(updatedFruit);
});

app.delete("/fruits/:fruitId", (req, res) => {
    const targetId = req.params.id;

    const targetIndex = fruits.findIndex((fruit) => fruit.id === targetId);

    fruits.splice(targetIndex, 1);

    res.status(204).send({ message: "Delete was successful." });
});

const fruits = [
    {
        id: "7f",
        name: "apple",
        calories: 95,
    },
    {
        id: "dd",
        name: "peach",
        calories: 50,
    },
    {
        id: "4e",
        name: "banana",
        calories: 105,
    },
    {
        id: "a2",
        name: "strawberry",
        calories: 6,
    },
];
