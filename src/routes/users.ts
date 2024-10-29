import { Router } from "express";
import { errorHandler } from "../error-handler";

import authMiddleware from "../middlewares/auth";
import {
  addAddress,
  changeUserRole,
  deleteAddress,
  getUserById,
  listAddress,
  listUsers,
  updateUser,
} from "../controllers/users";
import adminMiddleware from "../middlewares/admin";

const userRoutes: Router = Router();

/** 
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User found
 *       401:
 *         description: Unauthorized        
 *       500:           
 *         description: Internal server error
 */
userRoutes.get("/me", [authMiddleware], errorHandler(getUserById));

/** 
 * @swagger
 * /auth/me/address:
 *   post:
 *     summary: Add address
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Address added
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRoutes.post("/address", [authMiddleware], errorHandler(addAddress));

/**
 * @swagger
 * /auth/me/address/{id}:
 *   delete:
 *     summary: Delete address
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Address deleted
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);

/** 
 * @swagger
 * /auth/me/address:
 *   get:
 *     summary: Get all addresses
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRoutes.get("/address", [authMiddleware], errorHandler(listAddress));

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRoutes.put("/", [authMiddleware], errorHandler(updateUser));

/** 
 * @swagger
 * /users/:id/role:
 *   put:
 *     summary: Change user role
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: User updated
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
userRoutes.put(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(changeUserRole)
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: 
 *         description: Users found 
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRoutes.get("/", [authMiddleware, adminMiddleware], errorHandler(listUsers));

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: Get user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id 
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getUserById)
);

export default userRoutes;
