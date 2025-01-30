const express = require('express');
const router = express.Router();
const cpModel = require('../models/categoryProdModel')


/**
 * @swagger
 * components:
 *  schemas:
 *     CategoryProd:
 *          type: object
 *          properties:
 *              state:
 *                  type: Boolean
 *                  description: Estado del rol
 *              name:
 *                  type: String
 *                  description: Nombre del rol
 *          required:
 *              - name
 *          example:
 *              state: true
 *              name: indígena
 * 
 */

/**
 * @swagger
 * /categoriaProd/add-cp:
 *  post:
 *      summary: Crear un nuevo rol
 *      tags: [Categoria Producto]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/CategoryProd'
 *      responses:
 *          201:
 *              description: Se creó la categoría
 *          404:
 *              description: Error interno
 *                  
 * 
 */
router.post("/add-cp", cpModel.add_cp);

/**
 * @swagger
 * /categoriaProd/read-cp:
 *  get:
 *      summary: Todos los roles
 *      tags: [Categoria Producto]
 *      responses:
 *          200:
 *              description: Todos los roles
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/CategoryProd'
 * 
 *               
 *                  
 * 
 */
router.get("/read-cp", cpModel.read_cp);

/**
 * @swagger
 * /categoriaProd/read-cp/{id}:
 *  get:
 *      summary: Obtener una categoría de producto por ID
 *      tags: [Categoria Producto]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID de la categoría de producto a consultar
 *      responses:
 *          200:
 *              description: Categoría de producto encontrada exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CategoryProd'
 *          404:
 *              description: Categoría de producto no encontrada
 *          500:
 *              description: Error en el servidor
 */
router.get("/read-cp/:id", cpModel.read_cpById);


module.exports = router;