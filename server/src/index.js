const express = require("express");
const app = express();
const { PORT, SERVER_URL, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

// passport middleware
require("./middlewares/passport-middleware");

// initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// import routes
const authRoutes = require("./routes/auth");
const objectRoutes = require("./routes/objects");

// initialize routes
app.use("/api/accounts/", authRoutes);
app.use("/api/objects/", objectRoutes);

// start application
const startApplication = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at ${SERVER_URL}.`);
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

startApplication();
