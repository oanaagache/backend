const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(cors());
app.use(express.json());

const dbo = require("./connection");

// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// get a list of all the records
app.get("/record", async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// get a single record by id
app.get("/record/:id", async function (req, res) {
  const dbConnect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

//add a new record
app.post("/record/add", async function (req, response) {
  const dbConnect = dbo.getDb();
  const newUser = {
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    code: req.body.code,
    status: req.body.status,
    routine: req.body.routine,
    name: req.body.name,
  };
  dbConnect
    .collection("users")
    .insertOne(newUser, async function (err, result) {
      if (err) {
        response.status(400).send("Error fetching listings!");
      } else {
        response.json(result);
      }
    });
});

//update a record by id
app.post("/update/:id", async function (req, response) {
  const dbConnect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      firstName: req.body.firstName,
      surname: req.body.surname,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      code: req.body.code,
      status: req.body.status,
      routine: req.body.routine,
    },
  };
  dbConnect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

//delete a record
app.delete("/:id", async function (req, response) {
  const dbConnect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
