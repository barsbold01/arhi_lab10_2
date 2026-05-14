const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(express.json());

const Product = mongoose.model("Product", {
  name: String
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find().sort({ name: 1 });
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const product = await Product.create({ name: req.body.name });
  res.status(201).json(product);
});

async function seedProducts() {
  const count = await Product.countDocuments();

  if (count === 0) {
    await Product.insertMany([
      { name: "Laptop" },
      { name: "Mouse" },
      { name: "Keyboard" }
    ]);
  }
}

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  await seedProducts();

  app.listen(port, () => {
    console.log(`Product-service ${port} порт дээр ажиллаж байна`);
  });
}

start().catch((error) => {
  console.error("Product-service эхлэхэд алдаа гарлаа", error);
  process.exit(1);
});

