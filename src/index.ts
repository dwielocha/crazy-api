import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Crazy api!");
});

app.get("/api/howlongbreak/:i", (c) => {
  const i = Number.parseInt(c.req.param("i"));

  if (Number.isNaN(i)) {
    return c.json({ error: "Invalid number of people on break before you." });
  }

  if (i < 1) {
    return c.json({
      result: "Congrats! You are first, so take as long as you want!",
    });
  }

  const minutes = Math.round(7.5 * (i * i) - 17.5 * i + 25);

  return c.json({
    result: `You are ${
      i + 1
    }th in line. You can take a break up to ${minutes} minutes.`,
  });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
