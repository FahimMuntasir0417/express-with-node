import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewere/auth";

const router = express.Router();

// CREATE
router.post("/", userControllers.createUser);

// READ (various)

// Get by ID    -> GET /api/v1/users/1
router.get("/:id", auth("admin", "user"), userControllers.getUserById);

// Get by name  -> GET /api/v1/users/name/Muntasir
router.get("/name/:name", userControllers.getUsersByName);

// Get by email -> GET /api/v1/users/email/sarah.islam@example.com
router.get("/email/:email", userControllers.getUserByEmail);

// Get by age   -> GET /api/v1/users/age/25
router.get("/age/:age", userControllers.getUsersByAge);

// Get by phone -> GET /api/v1/users/phone/01711112222
router.get("/phone/:phone", userControllers.getUsersByPhone);

// Get by address -> GET /api/v1/users/address/Dhaka
router.get("/address/:address", userControllers.getUsersByAddress);

// UPDATE by ID -> PUT /api/v1/users/1
router.put("/:id", userControllers.updateUserById);

// DELETE by ID -> DELETE /api/v1/users/1
router.delete("/:id", userControllers.deleteUserById);

export const userRoutes = router;
