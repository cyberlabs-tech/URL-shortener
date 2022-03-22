const express = require("express");
// console.log(express);
// console.log(typeof express);

const { connectDB } = require("./config/db");

const app = express();

// Connect to the database
connectDB();

// Add middleware to this app so that it can receive the JSON data from POST requests, for example.
app.use(express.json({ extended: false })); // It accepts JSON data into our API

// Define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.PORT_LISTEN;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
