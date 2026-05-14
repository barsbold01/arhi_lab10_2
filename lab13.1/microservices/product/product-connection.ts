import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";

export const productDataSource = new DataSource({
  type: "mongodb",
  url:
    process.env.PRODUCT_DB_URI ?? "mongodb://localhost:27017/product-service",
  entities: [Product],
  synchronize: true,
});

let productDataSourcePromise: Promise<DataSource> | null = null;

export async function getProductDataSource() {
  if (productDataSource.isInitialized) {
    return productDataSource;
  }

  productDataSourcePromise ??= productDataSource.initialize().catch((error) => {
    productDataSourcePromise = null;
    console.error(
      "Бүтээгдэхүүний өгөгдлийн сангийн холболтыг эхлүүлэх үед алдаа гарлаа:",
      error,
    );
    throw error;
  });

  return productDataSourcePromise;
}

