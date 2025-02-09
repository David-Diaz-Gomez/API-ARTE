const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post("/add-product", upload.single('image'), productModel.add_product);

// Ruta para obtener todos los productos
router.get("/read-product", productModel.read_product);

// Ruta para obtener un producto por ID
router.get("/read-product/:productId", productModel.read_productById);

// Ruta para eliminar un producto por ID
router.delete("/delete-product/:productId", productModel.delete_product);

// Ruta para actualizar el estado del producto a 'false'
router.patch("/update-acceso-product/:productId", productModel.updateAcceso_product);

// Ruta para actualizar un producto
router.put("/update-product/:productId", upload.single('image'), productModel.update_product);

// Ruta para obtener todos los productos
router.get("/read-by-categoria", productModel.count_products_by_category);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - unitPrice
 *         - quali
 *         - category
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         unitPrice:
 *           type: number
 *           format: float
 *           description: Precio unitario del producto
 *         quali:
 *           type: string
 *           description: Calidad del producto
 *         category:
 *           type: string
 *           description: Categoría del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         state:
 *           type: boolean
 *           description: Estado del producto (activo/inactivo)
 *         image:
 *           type: string
 *           format: uri
 *           description: URL de la imagen del producto
 */

/**
 * @swagger
 * tags:
 *   - name: Productos
 *     description: Operaciones sobre productos
 */

/**
 * @swagger
 * /product/add-product:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               unitPrice:
 *                 type: number
 *                 format: float
 *               quali:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               state:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto (archivo)
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error en la solicitud (por ejemplo, imagen faltante)
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /product/read-product:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /product/read-product/{productId}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /product/delete-product/{productId}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /product/update-acceso-product/{productId}:
 *   patch:
 *     summary: Actualizar el estado de un producto a "false" (inactivo)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Estado del producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /product/update-product/{productId}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               unitPrice:
 *                 type: number
 *                 format: float
 *               quali:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               state:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto (archivo)
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /product/read-by-categoria:
 *   get:
 *     summary: Obtener el conteo de productos por categoría
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Retorna el número de productos por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 *       500:
 *         description: Error en el servidor
 */
