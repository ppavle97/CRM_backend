import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connect } from "./config/db";
import API from "./src/apis";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*", methods: ["POST", "GET", "DELETE", "PUT"] }));
app.use(bodyParser.json()); // Add this line for JSON parsing

const router = express.Router();
API(router);

connect()
  .then(() => {
    app.use("/api", router);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
