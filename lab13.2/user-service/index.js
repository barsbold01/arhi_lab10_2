const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.use(express.json());

const User = mongoose.model("User", {
  name: String
});

app.get("/api/users", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const user = await User.create({ name: req.body.name });
  res.status(201).json(user);
});

async function seedUsers() {
  const count = await User.countDocuments();

  if (count === 0) {
    await User.insertMany([{ name: "Anu" }, { name: "Bataa" }, { name: "Saraa" }]);
  }
}

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  await seedUsers();

  app.listen(port, () => {
    console.log(`User-service ${port} порт дээр ажиллаж байна`);
  });
}

start().catch((error) => {
  console.error("User-service эхлэхэд алдаа гарлаа", error);
  process.exit(1);
});

