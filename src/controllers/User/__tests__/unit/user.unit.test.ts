import { Request, Response } from "express";
import { getUsers } from "../../index";
import { User } from "../../../../models";

describe("getUsers", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch users successfully", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockUsers = [
      {
        id: 1,
        fullName: "John Doe",
        email: "john.doe@example.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    jest.spyOn(User, "find").mockResolvedValue(mockUsers as any);

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it("should handle errors", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(User, "find").mockRejectedValue(new Error("Database error"));

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch users" });
  });
});
