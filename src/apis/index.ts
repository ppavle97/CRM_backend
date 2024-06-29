import {  Router } from "express";
import { getUsers, loginUser, registerUser } from "../controllers";

const API = (router: Router) => {
  // GET /api/users
  router.get("/users", getUsers);

  // POST /api/register
  router.post("/register", registerUser);

  // POST /api/login
  router.post("/login", loginUser);
};

export default API;
