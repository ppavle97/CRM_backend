import { Request, Response, Router } from "express";

const API = (router: Router) => {
  // GET /api/users
  router.get("/users", (req: Request, res: Response) => {
    res.send("All Users");
  });

  // POST /api/register
  router.post("/register", (req: Request, res: Response) => {
    res.send("Registration");
  });

  // POST /api/login
  router.post("/login", (req: Request, res: Response) => {
    res.send("Login logic");
  });
};

export default API;
