const express = require('express');
const router = express.Router();
const personalizationModel = require('../models/personalizationModel');

/**
 * @swagger
 * components:
 *  schemas:
 *      Personalization:
 *          type: object
 *          properties:
 *              category:
 *                  type: string
 *                  description: Categoría de la personalización
 *              state:
 *                  type: string
 *                  enum: ['pendiente', 'aceptado', 'rechazado']
 *                  description: Estado de la personalización
 *              description:
 *                  type: string
 *                  description: Descripción de la personalización
 *              budget:
 *                  type: number
 *                  description: Presupuesto sugerido
 *              userId:
 *                  type: string
 *                  format: uuid
 *                  description: ID del usuario relacionado
 *          required:
 *              - category
 *              - state
 *              - description
 *              - budget
 *              - userId
 *          example:
 *              category: "Diseño"
 *              state: "pendiente"
 *              description: "Personalización de diseño gráfico"
 *              budget: 500
 *              userId: "60d9f123f5b8b12f09f80d4a"
 */

/**
 * @swagger
 * /personalization/add-personalization:
 *  post:
 *      summary: Crear una nueva personalización
 *      tags: [Personalización]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Personalization'
 *      responses:
 *          201:
 *              description: Personalización creada exitosamente
 *          400:
 *              description: Error de validación en los datos enviados
 *          500:
 *              description: Error interno del servidor
 */
router.post('/add-personalization', personalizationModel.add_personalization);

/**
 * @swagger
 * /personalization/read-personalizations:
 *  get:
 *      summary: Obtener todas las personalizaciones
 *      tags: [Personalización]
 *      responses:
 *          200:
 *              description: Lista de personalizaciones
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Personalization'
 *          500:
 *              description: Error interno del servidor
 */
router.get('/read-personalizations', personalizationModel.read_personalizations);

/**
 * @swagger
 * /personalization/read-personalization/{id}:
 *  get:
 *      summary: Obtener una personalización por su ID
 *      tags: [Personalización]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID de la personalización
 *            schema:
 *              type: string
 *              format: uuid
 *      responses:
 *          200:
 *              description: Personalización encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Personalization'
 *          404:
 *              description: Personalización no encontrada
 *          500:
 *              description: Error interno del servidor
 */
router.get('/read-personalization/:id', personalizationModel.read_personalizationById);

/**
 * @swagger
 * /personalization/update-personalization/{id}:
 *  put:
 *      summary: Actualizar una personalización por su ID
 *      tags: [Personalización]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID de la personalización
 *            schema:
 *              type: string
 *              format: uuid
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Personalization'
 *      responses:
 *          200:
 *              description: Personalización actualizada exitosamente
 *          404:
 *              description: Personalización no encontrada
 *          500:
 *              description: Error interno del servidor
 */
router.put('/update-personalization/:id', personalizationModel.update_personalization);

/**
 * @swagger
 * /personalization/delete-personalization/{id}:
 *  delete:
 *      summary: Eliminar una personalización por su ID
 *      tags: [Personalización]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID de la personalización
 *            schema:
 *              type: string
 *              format: uuid
 *      responses:
 *          200:
 *              description: Personalización eliminada exitosamente
 *          404:
 *              description: Personalización no encontrada
 *          500:
 *              description: Error interno del servidor
 */
router.delete('/delete-personalization/:id', personalizationModel.delete_personalization);

module.exports = router;
