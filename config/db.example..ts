import { createConnection } from "typeorm";

export async function connect() {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "",
      password: "",
      database: "",
      entities: ["src/models/*.ts"],
      synchronize: true, 
    });
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error; 
  }
}
