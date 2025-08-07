import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_URL, {
  // Upstash-specific configuration
  tls: {},
  enableReadyCheck: false,
  maxRetriesPerRequest: 3, // Reduced from default 20
  retryStrategy: (times) => {
    console.log(`Redis connection attempt ${times}`);
    if (times >= 3) {
      console.error("Max Redis connection attempts reached");
      return null; // Stop retrying
    }
    return Math.min(times * 100, 2000); // Exponential backoff
  },
});

// Connection event handlers
redis.on("connect", () => {
  console.log("Connected to Upstash Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err.message);
});

// Graceful shutdown handler
process.on("SIGINT", async () => {
  await redis.quit();
  process.exit(0);
});
