const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(cors());
app.use(express.json());

const dbo = require("./connection");

// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//add a new registerdUser
app.post("/record/addNewUser", async function (req, response) {
  const dbConnect = dbo.getDb();
  const newUser = {
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
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

// get a list of all the records
app.get("/record", async function (req, response) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

//add a new record in AdoptionForm.js
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

// get a single record by id in Edit.js
app.get("/record/:id", async function (req, response) {
  const dbConnect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    response.json(result);
  });
});

// get a list of all the records
app.get("/user", async function (req, response) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      let length = result.length;
      for (var i = 0; i < length; i++) {
        //console.log(result[i].email);
      }
      response.json(result);
    });
});

// get a single record by id in Edit.js
// get a list of all the records
app.get("/user/:email", async function (req, response) {
  const dbConnect = dbo.getDb();
  let myquery = { email: String(req.params.email) };
  dbConnect
    .collection("users")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

//update a record by id in Edit.js
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

//delete a record in List.js
app.delete("/:id", async function (req, response) {
  const dbConnect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

//articles
// get a list of all the articles
app.get("/articles", async function (req, response) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("articles")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

//add a new record
app.post("/articles/add", async function (req, response) {
  const dbConnect = dbo.getDb();
  const item = {
    title1: req.body.title1,
    title2: req.body.title2,
    title3: req.body.title3,
    title4: req.body.title4,
    title5: req.body.title5,
    title6: req.body.title6,
    title7: req.body.title7,
    title8: req.body.title8,
    title9: req.body.title9,
    title10: req.body.title10,
    title11: req.body.title11,
    title12: req.body.title12,
    title13: req.body.title13,
    title14: req.body.title14,
    title15: req.body.title15,
    title16: req.body.title16,
    title17: req.body.title17,
    title18: req.body.title18,
    title19: req.body.title19,
    title20: req.body.title20,
    title21: req.body.title21,
    title22: req.body.title22,
    title23: req.body.title23,
    title24: req.body.title24,
    title25: req.body.title25,
    title26: req.body.title26,
    title27: req.body.title27,
    title28: req.body.title28,
    title29: req.body.title29,
    title30: req.body.title30,
    title31: req.body.title31,
    title32: req.body.title32,
    title33: req.body.title33,
    title34: req.body.title34,
    title35: req.body.title35,
    title36: req.body.title36,
    title37: req.body.title37,
    title38: req.body.title38,
    image: req.body.image,
  };
  dbConnect
    .collection("articles")
    .insertOne(item, async function (err, result) {
      if (err) {
        response.status(400).send("Error fetching listings!");
      } else {
        response.json(result);
      }
    });
});

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
