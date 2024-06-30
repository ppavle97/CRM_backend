import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connect } from "./config/db";
import API from "./src/apis";
import cors from "cors";
import configurePassport from "./src/middlewares/passport-config";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*", methods: ["POST", "GET", "DELETE", "PUT"] }));
app.use(bodyParser.json());

const passport = configurePassport();
app.use(passport.initialize());

const requireAuth = passport.authenticate("jwt", { session: false });

const router = express.Router();

router.get("/api/users/me", requireAuth, (req, res, next) => {
  next();
});

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
