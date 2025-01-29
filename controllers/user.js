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
 *                  type: string
 *                  description: Nombre de usuario
 *              lastName:
 *                  type: string
 *                  description: Apellido del usuario
 *              email:
 *                  type: string
 *                  description: Correo de usuario
 *              documentId:
 *                  type: string
 *                  description: Documento de identidad (único)
 *              pss:
 *                  type: string
 *                  description: Contraseña
 *              state:
 *                  type: boolean
 *                  description: Estado del usuario
 *              adress:
 *                  type: string
 *                  description: Dirección del usuario
 *              phone:
 *                  type: number
 *                  description: Teléfono del usuario
 *              dateOfBirth:
 *                  type: string
 *                  format: date
 *                  description: Fecha de nacimiento
 *              creationDate:
 *                  type: string
 *                  format: date-time
 *                  description: Fecha de creación (generada automáticamente)
 *              rol:
 *                  type: string
 *                  format: uuid
 *                  description: ID del rol asignado al usuario
 *          required:
 *              - name
 *              - lastName
 *              - email
 *              - documentId
 *              - pss
 *              - adress
 *              - phone
 *              - dateOfBirth
 *              - rol
 *          example:
 *              name: Cristian
 *              lastName: Arrieta
 *              email: craparrag@udistrital.edu.co
 *              documentId: "123456789"
 *              pss: "1234"
 *              state: true
 *              adress: "Calle 123 #45-67"
 *              phone: 3201234567
 *              dateOfBirth: "1990-05-15"
 *              creationDate: "2024-02-10T12:34:56Z"
 *              rol: "65d1b92e6e6a6f4c12345678"
 */

/**
 * @swagger
 * /usuario/add-usuario:
 *  post:
 *      summary: Crear un nuevo usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: Usuario creado exitosamente
 *          400:
 *              description: Error de validación en los datos enviados
 *          500:
 *              description: Error interno del servidor
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