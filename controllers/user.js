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


/**
 * @swagger
 * /usuario/read-usuario/{id}:
 *  get:
 *      summary: Obtener un usuario por ID
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *            description: ID del usuario a obtener
 *      responses:
 *          200:
 *              description: Usuario encontrado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              usuarios:
 *                                  $ref: '#/components/schemas/User'
 *          404:
 *              description: Usuario no encontrado
 *          500:
 *              description: Error en el servidor
 */

router.get('/read-usuario/:id', userModel.read_usuarioById);


/**
 * @swagger
 * /usuario/read-usuario-post:
 *  post:
 *      summary: Obtener un usuario por ID mediante el cuerpo de la solicitud
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              description: ID del usuario a obtener
 *                      required:
 *                          - id
 *      responses:
 *          200:
 *              description: Usuario encontrado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              usuarios:
 *                                  $ref: '#/components/schemas/User'
 *          404:
 *              description: Usuario no encontrado
 *          500:
 *              description: Error en el servidor
 */

router.post('/read-usuario-post', userModel.read_usuarioByIdPost);


/**
 * @swagger
 * /usuario/update/{id}:
 *  put:
 *      summary: Actualizar un usuario por ID
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *            description: ID del usuario a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nombre del usuario
 *                          lastName:
 *                              type: string
 *                              description: Apellido del usuario
 *                          email:
 *                              type: string
 *                              format: email
 *                              description: Correo electrónico del usuario
 *                          documentId:
 *                              type: string
 *                              description: Identificación del usuario
 *                          state:
 *                              type: boolean
 *                              description: Estado del usuario (activo/inactivo)
 *                          adress:
 *                              type: string
 *                              description: Dirección del usuario
 *                          phone:
 *                              type: string
 *                              description: Teléfono del usuario
 *                          dateOfBirth:
 *                              type: string
 *                              format: date
 *                              description: Fecha de nacimiento del usuario
 *                          rol:
 *                              type: string
 *                              description: Rol del usuario
 *                          pss:
 *                              type: string
 *                              description: Nueva contraseña (se encripta antes de actualizar)
 *      responses:
 *          200:
 *              description: Usuario modificado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              resultado:
 *                                  type: boolean
 *                                  example: true
 *                              msg:
 *                                  type: string
 *                                  example: "Usuario modificado exitosamente"
 *                              data:
 *                                  $ref: '#/components/schemas/User'
 *          404:
 *              description: Usuario no encontrado
 *          500:
 *              description: Error en el servidor
 */

router.put('/update-usuario/:id', userModel.update_usuario);


/**
 * @swagger
 * /usuario/delete-usuario/{id}:
 *  delete:
 *      summary: Eliminar un usuario por ID
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *            description: ID del usuario a eliminar
 *      responses:
 *          200:
 *              description: Usuario eliminado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              resultado:
 *                                  type: boolean
 *                                  example: true
 *                              msg:
 *                                  type: string
 *                                  example: "Usuario eliminado exitosamente"
 *          404:
 *              description: Usuario no encontrado
 *          500:
 *              description: Error en el servidor
 */

router.delete('/delete-usuario/:id', userModel.delete_usuario);


/**
 * @swagger
 * /usuario/update-acceso-usuario/{id}:
 *  put:
 *      summary: Modificar el acceso de un usuario (estado)
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *            description: ID del usuario a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          state:
 *                              type: boolean
 *                              description: Nuevo estado del usuario
 *                      required:
 *                          - state
 *      responses:
 *          200:
 *              description: Usuario modificado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              resultado:
 *                                  type: boolean
 *                                  example: true
 *                              msg:
 *                                  type: string
 *                                  example: "Usuario modificado exitosamente"
 *          404:
 *              description: Usuario no encontrado
 *          500:
 *              description: Error en el servidor
 */

router.put('/update-acceso-usuario/:id', userModel.updateAcceso_usuario);





/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: Correo electrónico del usuario
 *              pss:
 *                  type: string
 *                  description: Contraseña del usuario
 *          required:
 *              - email
 *              - pss
 *          example:
 *              email: usuario@example.com
 *              pss: contraseña123
 */

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Iniciar sesión en la plataforma
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: Inicio de sesión exitoso, devuelve un token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: boolean
 *                                  example: false
 *                              message:
 *                                  type: string
 *                                  example: Inicio de sesión exitoso
 *                              token:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *          401:
 *              description: Credenciales incorrectas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: Correo electrónico o contraseña incorrectos
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: Error en el servidor
 *                              code:
 *                                  type: integer
 *                                  example: 0
 */
router.post('/login', userModel.login);


module.exports = router;