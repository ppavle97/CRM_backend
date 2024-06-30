import { Request, Response } from "express";
import passport from "passport";
import { getRepository } from "typeorm";
import { User } from "../../models";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      select: ["id", "fullName", "email", "created_at", "updated_at"],
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      async (err: Error, user: any) => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }
        if (!user) {
          return res.status(401).send("Unauthorized");
        }

        const userRepository = getRepository(User);
        const userData = await userRepository.findOne({
          where: { id: user.id },
          select: ["id", "fullName", "email", "created_at", "updated_at"], // Select fields to include
        });

        if (!userData) {
          return res.status(404).send("User not found");
        }

        return res.status(200).json({ status: 200, userData });
      }
    )(req, res);
  } catch (error) {
    console.error("Error during getting user details:", error);
    return res.status(500).send("Internal Server Error");
  }
};
