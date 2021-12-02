require("dotenv").config();
const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const morgan = require("morgan");

app.use(require("body-parser").json());
app.use(require("cors")());
app.use(morgan("tiny"));

let items = [];

app.get("/todos", (req, res) => {
  res.send(items);
});

app.delete("/todo/:id", (req, res) => {
  let found = false;
  items = items.filter((item) => {
    if (item.id === req.params.id) found = true;
    return item.id !== req.params.id;
  });
  if (found) return res.send({ msg: `${req.params.id} deleted successfully` });
  return res.status(404).send({ msg: `${req.params.id} not found` });
});

app.post("/createtodo", (req, res) => {
  const item = req.body.item;
  const id = uuid();
  items.push({ item, id });
  res.status(201).send({ item, id });
});

app.delete("/todos", (req, res) => {
  items = [];
  res.status(200).send({ items });
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
