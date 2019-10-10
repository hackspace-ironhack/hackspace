require("dotenv").config();
//asked for but dont have here:
//serve favicon
//morgan
const bodyParser = require("body-parser");//
const cookieParser = require("cookie-parser");//
const express = require("express"); //
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");//

// WHEN INTRODUCING USERS DO THIS:
// INSTALL THESE DEPENDENCIES: passport-local, passport, bcrypt, express-session
// AND UN-COMMENT OUT FOLLOWING LINES:

const session = require("express-session");
const passport = require("passport");
// for scheduler 


require("./configs/passport");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev")); //
app.use(bodyParser.json());//
app.use(bodyParser.urlencoded({ extended: false }));//
app.use(cookieParser());//

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, process.env.STATIC_FOLDER)));

// 

const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
// 
app.use(passport.initialize());
app.use(passport.session());

// 
app.locals.title = "HackSpace";

// 

// var users = require ('./routes/users');

const index = require("./routes/index");
app.use("/", index);


const postRoutes = require("./routes/post");
app.use("/api/post", postRoutes);

const portfolioRoutes = require("./routes/portfolio");
app.use("/api/portfolio", portfolioRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// chat
const chatRoutes = require("./routes/chat");
app.use("/api/chat", chatRoutes);

// user
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

app.use((req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
