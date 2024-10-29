import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from "../controllers/cart";

const cartRoutes: Router = Router();

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *                 required: true
 *               quantity:
 *                 type: number
 *                 required: true
 *     responses:
 *       201:
 *         description: Item added to cart
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));

/** 
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Change quantity of item in cart
 *     tags: [Cart]
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
 *               quantity:
 *                 type: number
 *                 required: true 
 *     responses:
 *       200:
 *         description: Item quantity changed successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));

/** 
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete item from cart
 *     tags: [Cart]
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
 *         description: Item deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));

export default cartRoutes;
