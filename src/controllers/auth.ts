import { Request, Response } from "express";
import { User } from "../models";
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "../validators";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    }).save();

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
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Email must be in right format.",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).send("Internal Server Error");
  }
};
