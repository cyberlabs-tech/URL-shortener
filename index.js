const express = require("express");

// console.log(express);
// console.log(typeof express);

const app = express();

// Add middleware to this app so that it can receive the JSON data from POST requests, for example.
app.use(express.json({ extended: false })); // It accepts JSON data into our API

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
