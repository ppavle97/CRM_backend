import { Request, Response } from "express";
import { User } from "../models";
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "../validators";

export const registerUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "Full name, email, password are required fields",
    });
  }

  if (!validateFullName(fullName)) {
    return res.status(400).json({
      message: "The full name should be at least 5 characters long",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Email must be in right format.",
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "The password should be at least 8 characters with at least one number and one character.",
    });
  }

  try {
    let existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    const newUser = new User();
    newUser.fullName = fullName;
    newUser.email = email;
    newUser.password = password;

    await newUser.hashPassword();

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  res.send("Login logic");
};
