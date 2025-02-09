const express = require('express');
const router = express.Router();
const stockModel = require('../models/stockModel');

/**
 * @swagger
 * components:
 *  schemas:
 *     Stock:
 *          type: object
 *          properties:
 *              amount:
 *                  type: number
 *                  description: Cantidad de stock
 *              idProduct:
 *                  type: string
 *                  description: ID del producto
 *              idPOS:
 *                  type: string
 *                  description: ID del punto de venta
 *          required:
 *              - amount
 *              - idProduct
 *              - idPOS
 *          example:
 *              amount: 10
 *              idProduct: "60d5f9b7b5a5a2b5c8a2b3f1"
 *              idPOS: "60d5f9b7b5a5a2b5c8a2b3f2"
 */

/**
 * @swagger
 * /stock/add-stock:
 *  post:
 *      summary: Agregar nuevo stock
 *      tags: [Stock]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Stock'
 *      responses:
 *          201:
 *              description: Stock agregado exitosamente
 *          400:
 *              description: Datos inválidos
 */
router.post("/add-stock", stockModel.add_stock);

/**
 * @swagger
 * /stock/read-stock:
 *  get:
 *      summary: Obtener todos los registros de stock
 *      tags: [Stock]
 *      responses:
 *          200:
 *              description: Lista de stock obtenida exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Stock'
 */
router.get("/read-stock", stockModel.read_stock);

/**
 * @swagger
 * /stock/read-stockProducto/{idProduct}:
 *  get:
 *      summary: Obtener stock por ID de producto
 *      tags: [Stock]
 *      parameters:
 *          - in: path
 *            name: idProduct
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del producto a consultar
 *      responses:
 *          200:
 *              description: Stock del producto obtenido exitosamente
 *          404:
 *              description: Producto no encontrado en stock
 */
router.get("/read-stockProducto/:idProduct", stockModel.read_stockProducto);

/**
 * @swagger
 * /stock/read-stockPOS/{idPOS}:
 *  get:
 *      summary: Obtener stock por ID de punto de venta
 *      tags: [Stock]
 *      parameters:
 *          - in: path
 *            name: idPOS
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del punto de venta a consultar
 *      responses:
 *          200:
 *              description: Stock del punto de venta obtenido exitosamente
 *          404:
 *              description: Punto de venta no encontrado en stock
 */
router.get("/read-stockPOS/:idPOS", stockModel.read_stockPOS);

/**
 * @swagger
 * /stock/update-stock/{id}:
 *  put:
 *      summary: Actualizar un stock existente
 *      tags: [Stock]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del stock a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Stock'
 *      responses:
 *          200:
 *              description: Stock actualizado exitosamente
 *          404:
 *              description: Stock no encontrado
 */
router.put("/update-stock/:id", stockModel.update_stock);

/**
 * @swagger
 * /stock/delete-stock/{id}:
 *  delete:
 *      summary: Eliminar un stock por ID
 *      tags: [Stock]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del stock a eliminar
 *      responses:
 *          200:
 *              description: Stock eliminado exitosamente
 *          404:
 *              description: Stock no encontrado
 */
router.delete("/delete-stock/:id", stockModel.delete_stock);


/**
 * @swagger
 * /stock/read-cout-stock-by-pos:
 *  get:
 *      summary: Obtener la cantidad total de productos por punto de venta
 *      tags: [Stock]
 *      responses:
 *          200:
 *              description: Lista de stock por punto de venta
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Stock'
 *          500:
 *              description: Error en el servidor
 */
router.get("/read-cout-stock-by-pos", stockModel.count_products_by_POS);

/**
 * @swagger
 * /stock/read-stock_by_category:
 *  get:
 *      summary: Obtener la cantidad total de stock por categoría de producto
 *      tags: [Stock]
 *      responses:
 *          200:
 *              description: Lista de stock por categoría de producto
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Stock'
 *          500:
 *              description: Error en el servidor
 */
router.get("/read-stock_by_category", stockModel.count_stock_by_category);

module.exports = router;
