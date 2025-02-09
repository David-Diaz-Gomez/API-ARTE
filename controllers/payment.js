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

/**
 * @swagger
 * /payment/read-total-pos-sales:
 *  get:
 *      summary: Obtener el total de ventas por punto de venta
 *      tags: [Pagos]
 *      responses:
 *          200:
 *              description: Total de ventas por punto de venta obtenidas correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              totalSales:
 *                                  type: number
 *                                  description: Monto total de ventas
 *                              posSales:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          idPOS:
 *                                              type: string
 *                                              description: ID del punto de venta
 *                                          salesAmount:
 *                                              type: number
 *                                              description: Monto total vendido en ese punto de venta
 *          500:
 *              description: Error interno del servidor
 */

router.get("/read-total-pos-sales", paymentModel.getTotalAndPOSSales);

/**
 * @swagger
 * /payment/transaction-count:
 *  get:
 *      summary: Obtener el conteo de transacciones por usuario
 *      tags: [Pagos]
 *      responses:
 *          200:
 *              description: Conteo de transacciones por usuario obtenido correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  userId:
 *                                      type: string
 *                                      description: ID del usuario
 *                                  userName:
 *                                      type: string
 *                                      description: Nombre del usuario
 *                                  transactionCount:
 *                                      type: integer
 *                                      description: Número de transacciones del usuario
 *          500:
 *              description: Error interno del servidor
 */
router.get("/transaction-count", paymentModel.getTransactionCountByUser);

/**
 * @swagger
 * /payment/read-total-pos-sales/{idPOS}:
 *  get:
 *      summary: Obtener el total de ventas de un punto de venta específico
 *      tags: [Pagos]
 *      parameters:
 *          - in: path
 *            name: idPOS
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del punto de venta a consultar
 *      responses:
 *          200:
 *              description: Total de ventas del punto de venta obtenido correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              salesByPOS:
 *                                  type: object
 *                                  properties:
 *                                      idPOS:
 *                                          type: string
 *                                          description: ID del punto de venta
 *                                      namePOS:
 *                                          type: string
 *                                          description: Nombre del punto de venta
 *                                      totalSold:
 *                                          type: number
 *                                          description: Cantidad total vendida en ese punto de venta
 *          400:
 *              description: ID de punto de venta no proporcionado
 *          404:
 *              description: No se encontraron ventas para el punto de venta especificado
 *          500:
 *              description: Error interno del servidor
 */

router.get("/read-total-pos-sales/:idPOS", paymentModel.getTotalSalesByPOS);


module.exports = router;
