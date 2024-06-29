import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connect } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is a CRM backend app!");
});

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
