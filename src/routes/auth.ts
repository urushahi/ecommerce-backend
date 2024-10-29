import { Router } from "express";
import { login, signup, me } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes = Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signup
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:  
 *                 type: string 
 *                 required: true
 *               name:          
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 
 */
authRoutes.post("/signup", errorHandler(signup));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:  
 *                 type: string 
 *                 required: true
 *     responses:
 *       200:
 *         description: User created
 */
authRoutes.post("/login", errorHandler(login));

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
authRoutes.get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
