const express = require("express");
const JSTemplate = require("../index");

const app = express();
const port = 3000;

// Initialize JSTemplate with static files root
const jsTemplate = new JSTemplate("/static/");

// Serve static files
app.use("/static", express.static("public"));

// Route: Home page
app.get("/", (req, res) => {
  const html = jsTemplate.render("index", {
    title: "Welcome",
    user: "John Doe",
    message: "Hello from JS-templater!",
  });
  res.send(html);
});

// Route: Dashboard
app.get("/dashboard", (req, res) => {
  const html = jsTemplate.render("dashboard", {
    user: {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    stats: {
      totalUsers: 150,
      activeUsers: 120,
      revenue: 50000,
    },
  });
  res.send(html);
});

// Route: Profile
app.get("/profile", (req, res) => {
  const html = jsTemplate.render("profile", {
    user: {
      name: "John Doe",
      email: "john@example.com",
      bio: "Software Developer",
    },
    preferences: {
      theme: "dark",
      notifications: true,
    },
  });
  res.send(html);
});

// Route: Without context
app.get("/simple", (req, res) => {
  const html = jsTemplate.render("simple");
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
