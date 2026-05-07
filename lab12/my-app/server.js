import express from "express";

const app = express();
const PORT = 4000;
const HOST = "127.0.0.1";
const allowedOrigins = new Set(["http://localhost:3000", "http://localhost:3001"]);

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const users = [
  { id: 1, name: "Тэмүүлэн", email: "temuulen@example.com" },
  { id: 2, name: "Мөнхцэцэг", email: "munkhtsetseg@example.com" },
];

const products = [
  { id: 1, name: "Гар утас", price: 500000 },
  { id: 2, name: "Нөүтбүүк", price: 1500000 },
];

app.get("/api/users", (req, res) => res.json(users));
app.get("/api/products", (req, res) => res.json(products));

const server = app.listen(PORT, HOST, (error) => {
  if (error) {
    console.error("Express.js сервер асаахад алдаа гарлаа:", error.message);
    process.exit(1);
  }

  console.log(`Express.js сервер http://${HOST}:${PORT} дээр ажиллаж байна`);
});

server.on("error", (error) => {
  console.error("Express.js сервер асаахад алдаа гарлаа:", error.message);
  process.exit(1);
});
