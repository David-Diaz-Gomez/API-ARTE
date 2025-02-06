const express = require('express');
const router = express.Router();
const wishListModel = require('../models/wishListModel');

/**
 * @swagger
 * components:
 *  schemas:
 *     WishList:
 *          type: object
 *          properties:
 *              productId:
 *                  type: string
 *                  description: ID del producto
 *              userId:
 *                  type: string
 *                  description: ID del usuario
 *          required:
 *              - productId
 *              - userId
 *          example:
 *              productId: "60d5f9b7b5a5a2b5c8a2b3f1"
 *              userId: "60d5f9b7b5a5a2b5c8a2b3f2"
 */

/**
 * @swagger
 * /wishlist/add-wishList:
 *  post:
 *      summary: Agregar un producto a la lista de deseos
 *      tags: [Lista de deseos]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/WishList'
 *      responses:
 *          201:
 *              description: Producto agregado a la lista de deseos exitosamente
 *          400:
 *              description: Datos inválidos
 */
router.post("/add-wishList", wishListModel.add_wishList);

/**
 * @swagger
 * /wishlist/read-wishlist:
 *  get:
 *      summary: Obtener la lista de deseos
 *      tags: [Lista de deseos]
 *      responses:
 *          200:
 *              description: Lista de deseos obtenida exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/WishList'
 */
router.get("/read-wishList", wishListModel.read_wishList);

/**
 * @swagger
 * /wishlist/delete-wishList/{id}:
 *  delete:
 *      summary: Eliminar un producto de la lista de deseos
 *      tags: [Lista de deseos]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del elemento de la lista de deseos a eliminar
 *      responses:
 *          200:
 *              description: Producto eliminado de la lista de deseos exitosamente
 *          404:
 *              description: Elemento no encontrado
 */
router.delete("/delete-wishList/:id", wishListModel.delete_wishList);


/**
 * @swagger
 * /wishlist/read-wishListByUserId/{id}:
 *  get:
 *      summary: Obtener la lista de deseos de un usuario específico
 *      tags: [Lista de deseos]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del usuario para obtener su lista de deseos
 *      responses:
 *          200:
 *              description: Lista de deseos del usuario obtenida exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/WishList'
 *          404:
 *              description: No se encontraron listas de deseos para este usuario
 */

router.get("/read-wishListByUserId/:userId", wishListModel.read_wishListByUserId);

module.exports = router;
