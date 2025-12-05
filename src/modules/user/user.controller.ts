import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err: any) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
};

// 🔹 GET by ID
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userServices.getUserById(Number(id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
};

// 🔹 GET by name
const getUsersByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const users = await userServices.getUsersByName(name as string);

    res.status(200).json({
      success: true,
      message: "Users fetched by name",
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
};

// 🔹 GET by email
const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const user = await userServices.getUserByEmail(email as string);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched by email",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
};

// 🔹 GET by age
const getUsersByAge = async (req: Request, res: Response) => {
  try {
    const { age } = req.params;

    const users = await userServices.getUsersByAge(Number(age));

    res.status(200).json({
      success: true,
      message: "Users fetched by age",
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
};

// 🔹 GET by phone
const getUsersByPhone = async (req: Request, res: Response) => {
  try {
    const { phone } = req.params;

    const users = await userServices.getUsersByPhone(phone as string);

    res.status(200).json({
      success: true,
      message: "Users fetched by phone",
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
};

// 🔹 GET by address
const getUsersByAddress = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;

    const users = await userServices.getUsersByAddress(address as string);

    res.status(200).json({
      success: true,
      message: "Users fetched by address",
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
};

// 🔹 UPDATE by ID
const updateUserById = async (req: Request, res: Response) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty",
      });
    }

    const { id } = req.params;

    const updatedUser = await userServices.updateUserById(Number(id), req.body);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message,
    });
  }
};

// 🔹 DELETE by ID
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await userServices.deleteUserById(Number(id));

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
    });
  }
};

export const userControllers = {
  createUser,
  getUserById,
  getUsersByName,
  getUserByEmail,
  getUsersByAge,
  getUsersByPhone,
  getUsersByAddress,
  updateUserById,
  deleteUserById,
};
