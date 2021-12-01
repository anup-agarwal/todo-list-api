require("dotenv").config();
const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");

app.use(require("body-parser").json());
app.use(require("cors")());

let items = [];

app.get("/todos", (req, res) => {
  console.log(items);
  res.send(items);
});

app.delete("/todo/:id", (req, res) => {
  let found = false;
  items = items.filter((item) => {
    if (item.id !== req.params.id) found = true;
    return item.id !== req.params.id;
  });
  if (found) return res.send({ msg: `${req.params.id} deleted successfully` });
  return res.status(404).send({ msg: `${req.params.id} not found` });
});

app.post("/createtodo", (req, res) => {
  const item = req.body.item;
  const id = uuid();
  items.push({ item, id });
  res.send({ item, id });
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
