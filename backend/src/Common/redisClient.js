const redis = require("redis")

const client = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,

});


client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

const connectToRedis = async () => {
  await client.connect();
};

const saveRefreshToken = async (
  token,
  userId,
  expiryInSeconds
) => {
  try {
    await client.set(token, userId.toString(), {
      EX: expiryInSeconds,
    });
    console.log("Token saved to Redis");
  } catch (err) {
    console.error("Error saving token to Redis:", err);
  }
};

const verifyRefreshToken = async (token) => {
  try {
    const userId = await client.get(token);
    if (userId) {
      console.log('Token is valid');
      return userId;
    } else {
      console.log('Token is invalid');
      return null;
    }
  } catch (err) {
    console.error('Error verifying token in Redis:', err);
    return null;
  }
};

module.exports = { verifyRefreshToken, saveRefreshToken, connectToRedis }

