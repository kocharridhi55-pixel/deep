
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:8081",
    "http://localhost:5173",
    "http://localhost:3000"
  ]
}));
app.use(express.json({ limit: "10kb" }));

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
  try {
    await client.connect();

    console.log("MongoDB connected successfully!");

    const db = client.db("portfolio");
    const contacts = db.collection("contacts");

    app.post("/api/contact", async (req, res) => {
      try {
        const { name, email, phone, message, social } = req.body;

        if (
          typeof name !== "string" ||
          typeof email !== "string" ||
          typeof message !== "string" ||
          name.trim().length < 2 ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
          message.trim().length < 10 ||
          name.length > 100 ||
          email.length > 254 ||
          message.length > 5000
        ) {
          return res.status(400).json({
            success: false,
            message: "Please enter valid contact information."
          });
        }

        const newContact = {
          name: name.trim(),
          email: email.trim(),
          phone: typeof phone === "string" ? phone.trim() : "",
          message: message.trim(),
          social: typeof social === "string" ? social.trim() : "",
          createdAt: new Date(),
          read: false
        };

        await contacts.insertOne(newContact);

        res.status(201).json({
          success: true,
          message: "Your message has been saved successfully!"
        });

      } catch (error) {
        console.error("Contact error:", error);

        res.status(500).json({
          success: false,
          message: "Unable to save your message."
        });
      }
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

startServer();
