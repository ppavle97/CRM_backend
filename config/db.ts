import { createConnection } from "typeorm";

export async function connect() {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "0611307581",
      database: "CRM",
      entities: ["src/models/*.ts"], // Path to your entity files
      synchronize: true, // Auto-create database schema (not recommended for production)
    });
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error; // Optionally rethrow the error to handle it in the caller
  }
}
