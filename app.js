const express = require("express");
const { getItems, addOrUpdateCharacter, getItemById, deleteId, csvAll, csvId } = require('./dynamo');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello world");
});

// get all items
app.get('/items', async (req, res) => {
    try {
        const items = await getItems();
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(400).json({ err: "Can't get items" });
    }
});

// get specific item from id
app.get('/items/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const item = await getItemById(id);
        res.status(200).json(item);
    } catch (error) {
        console.log(error);
        res.status(400).json({ err: "Can't get items" });
    }
});

// add item to inventory
app.post('/item', async (req, res) => {
    const item = req.body;
    try {
        const newItem = await addOrUpdateCharacter(item);
        res.status(200).json(newItem);
    } catch (error) {
        console.log(error);
        res.status(400).json({ err: "Can't get items" });
    }
});

// update item to inventory
app.put('/item/:id', async (req, res) => {
    const item = req.body;
    const { id } = req.params;
    item.id = id;
    try {
        const updatedItem = await addOrUpdateCharacter(item);
        res.status(200).json(updatedItem);
    } catch (error) {
        console.log(error);
        res.status(400).json({ err: "Can't get items" });
    }
});

// delete item to inventory
app.delete('/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedItem = await deleteId(id);
        res.status(200).json(updatedItem);
    } catch (error) {
        console.log(error);
        res.status(400).json({ err: "Can't get items" });
    }
});

// get csv link for all items
app.get('/csv', async (req, res) => {
    try {
        const csv = await csvAll();
        res.status(200).json(csv);
    } catch (error) {
        console.log(error);
        res.status(400).json({ err: "Can't get items" });
    }
});

// get csv link for one item
app.get('/csv/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const csv = await csvId(id);
        res.status(200).send(csv);
    } catch (error) {
        console.log(error);
        res.status(400).json({ err: "Can't get items" });
    }
});


const port = 3001;

app.listen(port, () => {
    console.log("listening on port 3001");
});