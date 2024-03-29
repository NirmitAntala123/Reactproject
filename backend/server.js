let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
require("dotenv").config();
// Express Route
const studentRoute = require("../backend/routes/userRoute.js");
const sessions = require("express-session");

// Configure mongoDB Database
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
mongoose.set("strictQuery", false);
const app = express();
// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database successfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.JWT_SECRET,
    saveUninitialized:true,
    name:"secret",
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({
  origin:["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials:true
}));
app.use('/public',express.static('public'));
app.use("/users", studentRoute);

// console.log(process.env.JWT_SECRET);
// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  res.status(404).send("Error 404!");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
