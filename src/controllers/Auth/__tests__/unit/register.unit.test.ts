import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { registerUser } from "../..";
import { User } from "../../../../models";

jest.mock("../../../../models");
jest.mock("bcryptjs");

describe("registerUser", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    json = jest.fn();
    status = jest.fn(() => ({ json }));
    req = {
      body: {},
    };
    res = {
      status,
    };
  });

  it("should return 400 if fullName, email, or password is missing", async () => {
    req.body = { fullName: "", email: "", password: "" };

    await registerUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message: "Full name, email, password are required fields",
    });
  });

  it("should return 400 if fullName is invalid", async () => {
    req.body = {
      fullName: "John",
      email: "test@example.com",
      password: "password123",
    };

    await registerUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message: "The full name should be at least 5 characters long",
    });
  });

  it("should return 400 if email format is invalid", async () => {
    req.body = {
      fullName: "John Doe",
      email: "invalid-email",
      password: "password123",
    };

    await registerUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message: "Email must be in right format.",
    });
  });

  it("should return 400 if password is invalid", async () => {
    req.body = {
      fullName: "John Doe",
      email: "test@example.com",
      password: "pass",
    };

    await registerUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message:
        "The password should be at least 8 characters with at least one number and one character.",
    });
  });

  it("should return 400 if user already exists", async () => {
    req.body = {
      fullName: "John Doe",
      email: "test@example.com",
      password: "password123",
    };
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
    });

    await registerUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: "User already exists with this email",
    });
  });

  it("should return 201 if user is registered successfully", async () => {
    req.body = {
      fullName: "John Doe",
      email: "test@example.com",
      password: "password123",
    };
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
    (User.create as jest.Mock).mockReturnValue({
      save: jest.fn().mockResolvedValue({
        id: 1,
        fullName: "John Doe",
        email: "test@example.com",
      }),
    });

    await registerUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({
      message: "User registered successfully",
      user: {
        id: 1,
        fullName: "John Doe",
        email: "test@example.com",
      },
    });
  });

  it("should return 500 if an error occurs", async () => {
    req.body = {
      fullName: "John Doe",
      email: "test@example.com",
      password: "password123",
    };
    (User.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

    await registerUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
