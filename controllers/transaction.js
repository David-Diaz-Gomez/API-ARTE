const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactionModel');

/**
 * @swagger
 * components:
 *  schemas:
 *     Transaction:
 *          type: object
 *          properties:
 *              date:
 *                  type: string
 *                  format: date-time
 *                  description: Fecha y hora de la transacción
 *              idPayPortal:
 *                  type: string
 *                  description: ID del pago en el portal
 *              idMeansOP:
 *                  type: string
 *                  description: ID del medio de pago (referencia a otro modelo)
 *          required:
 *              - idPayPortal
 *              - idMeansOP
 *          example:
 *              date: "2024-02-01T12:00:00.000Z"
 *              idPayPortal: "PAY12345"
 *              idMeansOP: "65fabc1234d56789e0123456"
 */


/**
 * @swagger
 * /transaction/all:
 *  get:
 *      summary: Obtener todas las transacciones
 *      tags: [transaccción]
 *      responses:
 *          200:
 *              description: Lista de todas las transacciones
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Transaction'
 *          500:
 *              description: Error interno del servidor
 */
router.get("/all", transactionModel.getAllPayments);

module.exports = router;
