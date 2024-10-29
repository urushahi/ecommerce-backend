import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import {
  cancelOrder,
  changeStatus,
  createOrder,
  getOrderById,
  listOrders,
  listUserOrders,
} from "../controllers/orders";
import adminMiddleware from "../middlewares/admin";

const orderRoutes: Router = Router();

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create order
 *     tags: [Order]
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
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error 
 * 
 */
orderRoutes.get("/", [authMiddleware], errorHandler(listOrders));

/** 
 * @swagger
 * /order/:id/cancel:
 *   put:
 *     summary: Cancel order  
 *     tags: [Order]
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
 *         description: Order canceled successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 */
orderRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));

/** 
 * @swagger
 * /order/:id:
 *   get:
 *     summary: Get order by id
 *     tags: [Order]
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
 *         description: Order found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));

/**
 * @swagger
 * /order/users/:id:
 *   get:
 *     summary: Get all orders by user
 *     tags: [Order]
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
 *         description: Orders found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 */
orderRoutes.get(
  "/users/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(listUserOrders)
);

/** 
 * @swagger
 * /order/:id/status:
 *   put:
 *     summary: Change order status
 *     tags: [Order]
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
 *               status:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Order status changed successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
orderRoutes.put(
  "/:id/status",
  [authMiddleware, adminMiddleware],
  errorHandler(changeStatus)
);

/** 
 * @swagger
 * /order/:id:
 *   get:
 *     summary: Get order by id
 *     tags: [Order]
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
 *         description: Order found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));

export default orderRoutes;
