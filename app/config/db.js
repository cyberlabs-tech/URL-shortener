const redis = require("redis");
const config = require("config");
const db = config.get("redisConfig");

const client = redis.createClient({
  url: db.url,
});

const connectDB = async () => {
  try {
    // console.log(db.host);
    // console.log(db.port);

    await client.connect();
    console.log("Redis connected....");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { client, connectDB };
