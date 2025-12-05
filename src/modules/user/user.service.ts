import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, role, email, password, age, phone, address } = payload;

  if (!name || !role || !email || !password) {
    throw new Error("name, role, email, password are required");
  }

  // email already exists check
  const exists = await pool.query(`SELECT id FROM users WHERE email = $1`, [
    email,
  ]);

  if (exists.rowCount && exists.rowCount > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users(name, role, email, password, age, phone, address)
     VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [name, role, email, hashedPassword, age, phone, address]
  );

  return result.rows[0];
};

// 🔹 Get by ID
const getUserById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

// 🔹 Get by name (multiple, partial match)
const getUsersByName = async (name: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE name ILIKE $1`, [
    `%${name}%`,
  ]);
  return result.rows;
};

// 🔹 Get by email (single)
const getUserByEmail = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};

// 🔹 Get by age (multiple)
const getUsersByAge = async (age: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE age = $1`, [age]);
  return result.rows;
};

// 🔹 Get by phone (multiple)
const getUsersByPhone = async (phone: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE phone = $1`, [
    phone,
  ]);
  return result.rows;
};

// 🔹 Get by address (multiple, partial)
const getUsersByAddress = async (address: string) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE address ILIKE $1`,
    [`%${address}%`]
  );
  return result.rows;
};

// 🔹 Update user by ID (full update)
const updateUserById = async (id: number, payload: Record<string, unknown>) => {
  const { name, role, email, password, age, phone, address } = payload;

  if (!name || !role || !email || !password) {
    throw new Error("name, role, email, password are required");
  }

  const emailOwner = await pool.query(
    `SELECT id FROM users WHERE email = $1 AND id <> $2`,
    [email, id]
  );

  if (emailOwner.rowCount && emailOwner.rowCount > 0) {
    throw new Error("Email already in use by another user");
  }

  const result = await pool.query(
    `UPDATE users
     SET name = $1,
         role = $2,
         email = $3,
         password = $4,
         age = $5,
         phone = $6,
         address = $7,
         updated_at = NOW()
     WHERE id = $8
     RETURNING *`,
    [name, role, email, password, age, phone, address, id]
  );

  return result.rows[0];
};

// 🔹 Delete user by ID
const deleteUserById = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );

  return result.rows[0];
};

export const userServices = {
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
