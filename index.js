require('dotenv').config();
const express = require("express");
const cors = require("cors");
const session = require('express-session');
const mongoSingleton  = require('./configs/connection');
const router = require("./routers");
const passport = require('passport');
require('./service/passport');
const keys = require('./configs/key');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
(async () => {
  try {
    await mongoSingleton.connectDB();
    console.log("Database connected and ready");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process with failure
  }

  // Session middleware
  app.use(session({ secret: 'tnhubh', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Define routes
  router(app);

  // Simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to TTN application." });
  });

  // Set port and start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})();

process.on('SIGINT', async () => {
  await mongoSingleton.close();
  process.exit(0);
});
