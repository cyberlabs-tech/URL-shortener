const redis = require("redis");
const config = require("config");

const db = config.get("redisConfig");

const connectDB = () => {
  const client = redis.createClient({
    host: db.host,
    port: db.port,
  });

  client.on("error", (err) => {
    console.log("Error :" + err);
  });

  console.log("Redis connected...");
};
