import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = process.env.GATEWAY_PORT || 3000;

app.use(
  "/user",
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true,
    pathRewrite: { "^/user": "" },
  }),
);

app.use(
  "/product",
  createProxyMiddleware({
    target: "http://localhost:4002",
    changeOrigin: true,
    pathRewrite: { "^/product": "" },
  }),
);

app.listen(port, () => {
  console.log(`API Gateway ажиллаж байна: http://localhost:${port}`);
});

