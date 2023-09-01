import express from "express";
import next from "next";
import path from "path";
import rateLimit from 'express-rate-limit';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Enable rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.prepare().then(() => {
  const server = express();
  // Apply rate limiting to the /app route
  server.use('/app', limiter);

  // Serve index.html when someone navigates to /app
  server.get("/app", (req, res) => {
    res.sendFile(path.join(__dirname, "public/app/index.html"));
  });

  // Serve other static files under /app
  server.use("/app", express.static(path.join(__dirname, "public/app")));

  // Handle Next.js routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
