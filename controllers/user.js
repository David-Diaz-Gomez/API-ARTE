const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')



/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: String
 *                  description: Nombre de usuario
 *              email:
 *                  type: String
 *                  description: Correo de usuario
 *              pss:
 *                  type: String
 *                  description: Contraseña
 *              state:
 *                  type: Boolean
 *                  description: Estado del usuario
 *          required:
 *              - name
 *              - email
 *              - pss
 *          example:
 *              name: Cristian
 *              email: craparrag@udistrital.edu.co
 *              pss: 1234
 *              state: true
 * 
 */

/**
 * @swagger
 * /usuario/add-usuario:
 *  post:
 *      summary: crear nuevo usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: Se creo el usuario
 *          404:
 *              description: Error interno
 *                  
 * 
 */
router.post('/add-usuario', userModel.add_usuario);

/**
 * @swagger
 * /usuario/read-usuario:
 *  get:
 *      summary: Todos los usuarios
 *      tags: [User]
 *      responses:
 *          200:
 *              description: todos los usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 * 
 *               
 *                  
 * 
 */
router.get('/read-usuario', userModel.read_usuario);
router.get('/read-usuario/:id', userModel.read_usuarioById);
router.post('/read-usuario-post', userModel.read_usuarioByIdPost);
router.put('/update-usuario/:id', userModel.update_usuario);
router.delete('/delete-usuario/:id', userModel.delete_usuario);
router.put('/update-acceso-usuario/:id', userModel.updateAcceso_usuario);
router.post('/login', userModel.login);
module.exports = router;