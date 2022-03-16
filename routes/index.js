// use for GET route

const express = require("express");
const router = express.Router();

// @route       GET /:code
// @desc        Redirect to the long / original URL
router.get("/:code", async (req, res) => {
  try {
    const client = require("../config/db");
    const longUrl = await client.get(req.params.code);

    if (longUrl !== null) {
      return res.redirect(longUrl);
    }
  } catch (err) {}
});

module.exports = router;
