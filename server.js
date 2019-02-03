//connection stuff
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connection = require("./db/connection");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

app.use(express.static(__dirname + '/public'));

//viewing the html pages

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
          //probably should have named sql table and this page two different things...
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


//API endpoints
// Get all from table
          // you can name /api/notes whatever you want
app.get("/api/typedNotes/", (req, res) => {
  const query = connection.query("SELECT * FROM notes", (error, notesDb) => {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }

    res.json(notesDb);
    
  });

});


//app.post to have data show up
app.post("/api/typedNotes", (req, res) => {
  const query = connection.query("SELECT * FROM notes", (error, notesPosted) => {
    console.log("req.body from POST:", req.body);
    
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }

    connection.query("INSERT INTO notes SET ?", req.body, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).json(error);
      }
      res.json(result);
    });

  });
});

app.delete("/api/typedNotes", (req, res) => {
  const query = connection.query("DELETE FROM notes WHERE ?", req.body, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    res.json(result);
  });
});

// wildcard route if somehow no routes are matched
app.get("*", (req, res) => {
  res.send(`<h1>Oh no you got a 404 Error!</h1>`);
})

//port. reminder this always goes last.
app.listen(PORT, () => console.log(`Server is up and running! ${PORT}`));