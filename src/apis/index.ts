import { Router } from "express";
import { getUser, getUsers, loginUser, registerUser } from "../controllers";
import passport from "passport";
const API = (router: Router) => {
  // GET /api/users
  router.get("/users", getUsers);

  // POST /api/register
  router.post("/register", registerUser);

  // POST /api/login
  router.post("/login", loginUser);

  // GET /api/users/me
  router.get(
    "/users/me",
    passport.authenticate("jwt", { session: false }),
    getUser
  );
};

export default API;
