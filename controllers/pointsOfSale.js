const express = require('express');
const router = express.Router();
const posModel = require('../models/pointsOfSaleModel');

/**
 * @swagger
 * components:
 *  schemas:
 *     PointsOfSale:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Nombre del punto de venta
 *              city:
 *                  type: string
 *                  description: Ciudad del punto de venta
 *              state:
 *                  type: boolean
 *                  description: Estado del punto de venta (activo/inactivo)
 *              adress:
 *                  type: string
 *                  description: Dirección del punto de venta
 *              departament:
 *                  type: number
 *                  description: Código del departamento
 *          required:
 *              - name
 *              - city
 *              - adress
 *              - departament
 *          example:
 *              name: "Tienda Central"
 *              city: "Bogotá"
 *              adress: "Calle 123 #45-67"
 *              departament: 11
 */

/**
 * @swagger
 * /pos/add-pos:
 *  post:
 *      summary: Crear un nuevo punto de venta
 *      tags: [Puntos de venta]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PointsOfSale'
 *      responses:
 *          201:
 *              description: Se creó el punto de venta
 *          500:
 *              description: Error interno
 */
router.post("/add-pos", posModel.add_pos);

/**
 * @swagger
 * /pos/read-pos:
 *  get:
 *      summary: Obtener todos los puntos de venta
 *      tags: [Puntos de venta]
 *      responses:
 *          200:
 *              description: Lista de todos los puntos de venta
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/PointsOfSale'
 *          500:
 *              description: Error interno
 */
router.get("/read-pos", posModel.read_pos);

/**
 * @swagger
 * /pos/read-pos/{id}:
 *  get:
 *      summary: Obtener un punto de venta por ID
 *      tags: [Puntos de venta]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del punto de venta a consultar
 *      responses:
 *          200:
 *              description: Punto de venta encontrado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PointsOfSale'
 *          404:
 *              description: Punto de venta no encontrado
 *          500:
 *              description: Error en el servidor
 */
router.get("/read-pos/:id", posModel.read_posById);

/**
 * @swagger
 * /pos/update-pos/{id}:
 *  put:
 *      summary: Actualizar un punto de venta
 *      tags: [Puntos de venta]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del punto de venta a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PointsOfSale'
 *      responses:
 *          200:
 *              description: Punto de venta actualizado correctamente
 *          404:
 *              description: No se encontró el punto de venta
 *          500:
 *              description: Error en el servidor
 */
router.put("/update-pos/:id", posModel.update_pos);

/**
 * @swagger
 * /pos/delete-pos/{id}:
 *  delete:
 *      summary: Eliminar un punto de venta
 *      tags: [Puntos de venta]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del punto de venta a eliminar
 *      responses:
 *          200:
 *              description: Punto de venta eliminado exitosamente
 *          404:
 *              description: No se encontró el punto de venta
 *          500:
 *              description: Error en el servidor
 */
router.delete("/delete-pos/:id", posModel.delete_pos);

/**
 * @swagger
 * /pos/update-acceso-pos/{id}:
 *  patch:
 *      summary: Deshabilitar el acceso a un punto de venta (cambiar estado a false)
 *      tags: [Puntos de venta]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del punto de venta a deshabilitar
 *      responses:
 *          200:
 *              description: Estado del punto de venta cambiado a false
 *          404:
 *              description: No se encontró el punto de venta
 *          500:
 *              description: Error en el servidor
 */
router.patch("/update-acceso-pos/:id", posModel.updateAcceso_pos);

module.exports = router;
