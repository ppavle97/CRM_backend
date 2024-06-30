import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUser } from "../..";
import { User } from "../../../../models";

jest.mock("../../../../models");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("loginUser", () => {
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

  it("should return 400 if email or password is missing", async () => {
    req.body = { email: "" };

    await loginUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message: "Email and password are required",
    });
  });

  it("should return 400 if email format is invalid", async () => {
    req.body = { email: "invalid-email", password: "password" };

    await loginUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message: "Email must be in right format.",
    });
  });

  it("should return 401 if user is not found", async () => {
    req.body = { email: "test@example.com", password: "password" };
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await loginUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({
      message: "Invalid email or password",
    });
  });

  it("should return 401 if password is invalid", async () => {
    req.body = { email: "test@example.com", password: "wrongpassword" };
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      password: "hashedpassword",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await loginUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({
      message: "Invalid email or password",
    });
  });

  it("should return 200 if login is successful", async () => {
    req.body = { email: "test@example.com", password: "password" };
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      password: "hashedpassword",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("token");

    await loginUser(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "token",
    });
  });
});
