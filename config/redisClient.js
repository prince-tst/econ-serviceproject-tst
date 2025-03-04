const { createClient } = require("redis");
//const { createOrSearchIndexRedis } = require("../product/productServices");
const url = `redis://default:PXdTLDWZpCUooyRNKPNNkwLBafytCBWp@yamanote.proxy.rlwy.net:21186`; // local
// const { cl } = require("../utils/service");

const redisClient = createClient({
  url,
});

// connect the redis
(async function () {
  await redisClient.connect();
  //await createOrSearchIndexRedis();
})();

redisClient.on("ready", () => {
  console.log("Redis connected successfully");
  console.log("----> redis url:", url);
});

redisClient.on("error", (err) => {
  console.log("Error in Redis Connection", err);
});

module.exports = redisClient;
