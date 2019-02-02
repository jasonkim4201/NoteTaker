//connection stuff
const express = require("express");
const app = express();
const path = require("path");
const connection = require("./db/connection");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//viewing the html pages

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// wildcard route if somehow no routes are matched
app.get("*", (req, res) => {
  res.send(`<h1>Oh no you got a 404 Error!</h1>`);
})

// conneciton to APIS

//port. reminder this always goes last.
app.listen(PORT, () =>{
  console.log(`Server is up and running! ${PORT}`);
})