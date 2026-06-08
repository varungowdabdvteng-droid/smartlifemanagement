/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Full-Stack REST API Proxies

  // 1. Health Probe
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", engine: "Express 3NF Master Engine" });
  });

  // 2. Authentication Mock Route
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required query params." });
    }
    // Auth validation simulator mapping seed arrays
    let mockAccount = {
      user_id: 1,
      full_name: "Alex Rivers",
      email,
      role: "Premium Member",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    };

    if (email.toLowerCase().includes("sarah")) {
      mockAccount.full_name = "Sarah Jenkins";
      mockAccount.role = "Admin";
    }

    return res.json(mockAccount);
  });

  // 3. User Register Mock Route
  app.post("/api/auth/register", (req, res) => {
    const { full_name, email, phone, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: "Required fields are blank." });
    }
    return res.status(201).json({
      user_id: Date.now(),
      full_name,
      email,
      role: "Premium Member",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    });
  });

  // Vite development vs production serving layers config
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartLife Fullstack Server booted on port ${PORT}`);
  });
}

startServer();
