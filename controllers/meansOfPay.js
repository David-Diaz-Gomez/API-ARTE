const express = require('express');
const router = express.Router();
const MOPModel = require('../models/meansOfPayModel');

/**
 * @swagger
 * components:
 *  schemas:
 *     MeansOfPay:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Nombre del método de pago
 *              state:
 *                  type: boolean
 *                  description: Estado del método de pago (activo/inactivo)
 *          required:
 *              - name
 *              - state
 *          example:
 *              name: "Tarjeta"
 *              state: true
 */

/**
 * @swagger
 * /mop/add-MOP:
 *  post:
 *      summary: Agregar un nuevo método de pago
 *      tags: [Métodos de pago]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MeansOfPay'
 *      responses:
 *          201:
 *              description: Método de pago creado exitosamente
 *          400:
 *              description: Datos inválidos
 */
router.post('/add-MOP', MOPModel.add_MOP);

/**
 * @swagger
 * /mop/read-MOP:
 *  get:
 *      summary: Obtener todos los métodos de pago
 *      tags: [Métodos de pago]
 *      responses:
 *          200:
 *              description: Lista de métodos de pago obtenida exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/MeansOfPay'
 */
router.get('/read-MOP', MOPModel.read_MOP);

/**
 * @swagger
 * /mop/read-MOP/{id}:
 *  get:
 *      summary: Obtener un método de pago por ID
 *      tags: [Métodos de pago]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del método de pago
 *      responses:
 *          200:
 *              description: Método de pago obtenido exitosamente
 *          404:
 *              description: Método de pago no encontrado
 */
router.get('/read-MOP/:id', MOPModel.read_MOPById);

module.exports = router;
