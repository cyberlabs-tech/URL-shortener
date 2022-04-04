// use for POST route

const express = require("express");
const router = express.Router();

const validUrl = require("valid-url");
const config = require("config");

// @route       POST /api/url/shorten
// @desc        Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = `${process.env.PROTOCOL}://${process.env.HOST_NAME}`;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  // [START] URL code generation
  const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz".split();
  const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split();
  const num = "0123456789".split();
  const charToRandom = lowerAlphabet + upperAlphabet + num;

  const genUrlCode = async () => {
    let urlCode = "";
    let longUrlToCheck = "";
    const { client } = require("../config/db");
    do {
      for (i = 0; i < config.get("lengthOfURLcode"); i++) {
        ind = Math.floor(Math.random() * charToRandom.length);
        urlCode += charToRandom[ind];
      }
      longUrlToCheck = await client.get(urlCode);
    } while (longUrlToCheck !== null);
    return urlCode;
  };

  const urlCodeGen = await genUrlCode();
  // [END] URL code generation

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      const { client } = require("../config/db");
      const urlCode = await client.get(longUrl);
      if (urlCode !== null) {
        res.set("content-type", "text/plain");
        res.json(`${baseUrl}/${urlCode}`);
      } else {
        // Insert this new long url to the database
        const newUrlCode = urlCodeGen;
        await client.set(longUrl, newUrlCode);
        await client.set(newUrlCode, longUrl);

        res.set("content-type", "text/plain");
        res.json(`${baseUrl}/${newUrlCode}`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
