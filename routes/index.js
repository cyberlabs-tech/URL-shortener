// use for GET route

const express = require("express");
const router = express.Router();

// @route       GET /:code
// @desc        Redirect to the long / original URL
router.get("/:code", async (req, res) => {
  try {
    const { client } = require("../config/db");
    const longUrl = await client.get(req.params.code);

    if (longUrl !== null) {
      return res.redirect(longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
