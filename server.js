const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(cors());
app.use(express.json());

const dbo = require("./connection");

// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
//const String = require("mongodb").String;

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

// get a single record by id in Edit.js
// get a list of all the records
app.get("/email", async function (req, response) {
  const dbConnect = dbo.getDb();
  let myquery = { email: "oana.luciana.agache@gmail.com" };
  dbConnect
    .collection("users")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// //update a record by id in Edit.js
// app.post("/update/:id", async function (req, response) {
//   const dbConnect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   let newvalues = {
//     $set: {
//       firstName: req.body.firstName,
//       surname: req.body.surname,
//       email: req.body.email,
//       address: req.body.address,
//       city: req.body.city,
//       country: req.body.country,
//       code: req.body.code,
//       status: req.body.status,
//       routine: req.body.routine,
//     },
//   };
//   dbConnect
//     .collection("users")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
// });

// //delete a record in List.js
// app.delete("/:id", async function (req, response) {
//   const dbConnect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   dbConnect.collection("users").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });

// //articles
// // get a list of all the articles
// app.get("/articles", async function (req, response) {
//   const dbConnect = dbo.getDb();
//   dbConnect
//     .collection("articles")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       response.json(result);
//     });
// });

// //add a new record
// app.post("/articles/add", async function (req, response) {
//   const dbConnect = dbo.getDb();
//   const item = {
//     title1: req.body.title1,
//     title2: req.body.title2,
//     image: req.body.image,
//   };
//   dbConnect
//     .collection("articles")
//     .insertOne(item, async function (err, result) {
//       if (err) {
//         response.status(400).send("Error fetching listings!");
//       } else {
//         response.json(result);
//       }
//     });
// });

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
