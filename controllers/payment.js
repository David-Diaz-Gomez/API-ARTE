const express = require('express');
const router = express.Router();
const paymentModel = require('../models/paymentModel');

/**
 * @swagger
 * components:
 *  schemas:
 *     Payment:
 *          type: object
 *          properties:
 *              idPayPortal:
 *                  type: string
 *                  description: ID del portal de pago
 *              idMeansOP:
 *                  type: string
 *                  description: ID del medio de pago
 *              total:
 *                  type: number
 *                  description: Monto total del pago
 *              totalTax:
 *                  type: number
 *                  description: Impuestos totales
 *              userId:
 *                  type: string
 *                  description: ID del usuario que realiza el pago
 *              products:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          idProduct:
 *                              type: string
 *                              description: ID del producto
 *                          quantity:
 *                              type: integer
 *                              description: Cantidad del producto
 *                          idPOS:
 *                              type: string
 *                              description: ID del punto de venta
 *          required:
 *              - idPayPortal
 *              - idMeansOP
 *              - total
 *              - userId
 *              - products
 *          example:
 *              idPayPortal: "12345"
 *              idMeansOP: "67890"
 *              total: 150.50
 *              totalTax: 19.50
 *              userId: "abc123"
 *              products:
 *                  - idProduct: "prod001"
 *                    quantity: 2
 *                    idPOS: "pos001"
 * 
 */

/**
 * @swagger
 * /payment/process-payment:
 *  post:
 *      summary: Procesar un pago
 *      tags: [Pagos]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Payment'
 *      responses:
 *          201:
 *              description: Pago procesado exitosamente
 *          400:
 *              description: Datos de pago inválidos
 *          500:
 *              description: Error interno del servidor
 * 
 */
router.post("/process-payment", paymentModel.processPayment);

/**
 * @swagger
 * /payment/details/{transactionId}:
 *  get:
 *      summary: Obtener todos los detalles de un pago
 *      tags: [Payment]
 *      parameters:
 *          - in: path
 *            name: transactionId
 *            schema:
 *                type: string
 *            required: true
 *            description: ID de la transacción a consultar
 *      responses:
 *          200:
 *              description: Información completa del pago
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              transaction:
 *                                  $ref: '#/components/schemas/Transaction'
 *                              invoice:
 *                                  $ref: '#/components/schemas/Invoice'
 *                              productDetails:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/ProductDetails'
 *          404:
 *              description: No se encontró la transacción o factura
 *          500:
 *              description: Error interno del servidor
 */
router.get("/details/:transactionId", paymentModel.getPaymentDetails);

module.exports = router;
