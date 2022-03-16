const redis = require("redis");
const config = require("config");

const db = config.get("redisConfig");

const connectDB = async () => {
  const client = redis.createClient({
    host: db.host,
    port: db.port,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  await client.set("Mike", "Tran");
  const value = await client.get("Mike");
  console.log(value);
};

connectDB();
