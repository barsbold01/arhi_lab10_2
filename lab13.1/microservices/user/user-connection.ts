import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const userDataSource = new DataSource({
  type: "mongodb",
  url: process.env.USER_DB_URI ?? "mongodb://localhost:27017/user-service",
  entities: [User],
  synchronize: true,
});

let userDataSourcePromise: Promise<DataSource> | null = null;

export async function getUserDataSource() {
  if (userDataSource.isInitialized) {
    return userDataSource;
  }

  userDataSourcePromise ??= userDataSource.initialize().catch((error) => {
    userDataSourcePromise = null;
    console.error(
      "Хэрэглэгчийн өгөгдлийн сангийн холболтыг эхлүүлэх үед алдаа гарлаа:",
      error,
    );
    throw error;
  });

  return userDataSourcePromise;
}

