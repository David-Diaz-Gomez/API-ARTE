const Usuario = require('../dtos/userDTO');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10; // Número de rondas de sal. Cuanto mayor, más seguro, pero más lento.
const mongoose = require("mongoose");

const CLIENTE_ROL_ID = "679ae9132f83de4cf11761fc";

//usuarios
async function add_usuario(req, res) {
    try {
        // Espera a que se complete la verificación del token
        await verifyToken(req, res);

        // Generar un hash de la contraseña antes de almacenarla
        bcrypt.hash(req.body.pss, saltRounds, async (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: `Error al hashear la contraseña: ${err}`
                });
            }

            const usuario = new Usuario({
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                documentId: req.body.documentId,
                pss: hashedPassword,
                state: req.body.state !== undefined ? req.body.state : true,
                adress: req.body.adress,
                phone: req.body.phone,
                dateOfBirth: req.body.dateOfBirth,
                creationDate: new Date(),
                rol: req.body.rol
            });

            try {
                const result = await usuario.save();
                res.status(201).json({
                    error: false,
                    message: 'Se creó el usuario',
                    data: result
                });
            } catch (error) {
                res.status(500).json({
                    error: true,
                    message: `Error al guardar el usuario: ${error}`
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error}`,
            code: 0
        });
    }
}
async function read_usuario(req, res) {
    try {
        // Espera a que se complete la verificación del token
       await verifyToken(req, res);

        // Si la verificación del token es exitosa, continúa con la lógica
        const usuarios = await Usuario.aggregate([
            {
                $lookup: {
                    from: 'rols',
                    localField: 'rol',
                    foreignField: '_id',
                    as: 'rol'
                }
            },
            {
                $unwind: '$rol'
            }
        ]);

        res.status(200).json({ usuarios });
    } catch (error) {
        
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error}`,
            code: 0
        });
    }
}
async function read_usuarioById(req, res) {
    try {
        const usuarios = await Usuario.findOne({_id: req.params.id});
        res.status(200).json({  usuarios });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Server error: ${error}`,
            code: 0
        });
    }
}
async function read_usuarioByIdPost(req, res) {
    try {
        const usuarios = await Usuario.findOne({_id: req.body.id});
        res.status(200).json({  usuarios });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Server error: ${error}`,
            code: 0
        });
    }
}
async function update_usuario(req, res) {
    const usuarioId = req.params.id;

    try {
        const updatedData = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            documentId: req.body.documentId,
            state: req.body.state !== undefined ? req.body.state : true,
            adress: req.body.adress,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            rol: req.body.rol
        };

        // Si se proporciona una nueva contraseña, se encripta antes de actualizar
        if (req.body.pss) {
            updatedData.pss = await bcrypt.hash(req.body.pss, saltRounds);
        }

        // Evitar la modificación de creationDate
        const result = await Usuario.findByIdAndUpdate(usuarioId, { $set: updatedData }, { new: true });

        if (result) {
            res.status(200).json({
                resultado: true,
                msg: 'Usuario modificado exitosamente',
                data: result
            });
        } else {
            res.status(404).json({
                resultado: false,
                msg: 'No se pudo modificar el usuario, verifique el ID'
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: false,
            msg: 'Ocurrió un error al modificar el usuario',
            error: error.message
        });
    }
}
async function delete_usuario(req, res) {
    const usuarioId = req.params.id;

    try {
        const result = await Usuario.findOneAndDelete({ _id: usuarioId });

        if (result) {
            res.status(200).json({
                resultado: true,
                msg: 'Usuario eliminado exitosamente'
            });
        } else {
            res.status(404).json({
                resultado: false,
                msg: 'No se pudo encontrar el usuario para eliminar, verifique el id'
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: false,
            msg: 'Ocurrió un error al eliminar el usuario',
            error: error
        });
    }
}
async function updateAcceso_usuario(req, res) {
    const usuarioId = req.params.id;
    
    const updatedData = {
        state: req.body.state
    };

    try {
        const result = await Usuario.findOneAndUpdate({ _id: usuarioId }, { $set: updatedData });
        console.log(result);

        if (result) {
            res.status(200).json({
                resultado: true,
                msg: 'Usuario modificado exitosamente'
            });
        } else {
            res.status(404).json({
                resultado: false,
                msg: 'No se pudo modificar el usuario, verifique el id'
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: false,
            msg: 'Ocurrió un error al modificar el usuario',
            error: error
        });
    }
}
//
//clientes
async function add_cliente(req, res) {
    try {
        // await verifyToken(req, res);
        bcrypt.hash(req.body.pss, saltRounds, async (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: `Error al hashear la contraseña: ${err}`
                });
            }

            const cliente = new Usuario({
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                documentId: req.body.documentId,
                pss: hashedPassword,
                state: req.body.state !== undefined ? req.body.state : true,
                adress: req.body.adress,
                phone: req.body.phone,
                dateOfBirth: req.body.dateOfBirth,
                creationDate: new Date(),
                rol: CLIENTE_ROL_ID
            });

            try {
                const result = await cliente.save();
                res.status(201).json({ error: false, message: 'Cliente creado exitosamente', data: result });
            } catch (error) {
                res.status(500).json({ error: true, message: `Error al guardar el cliente: ${error}` });
            }
        });
    } catch (error) {
        res.status(500).json({ error: true, message: `Error en el servidor: ${error}` });
    }
}

async function read_cliente(req, res) {
    try {
        await verifyToken(req, res);
        const clientes = await Usuario.aggregate([
            {
                $lookup: {
                    from: "rols",
                    localField: "rol",
                    foreignField: "_id",
                    as: "rol",
                },
            },
            { $unwind: "$rol" },
            { $match: { "rol._id": new mongoose.Types.ObjectId(CLIENTE_ROL_ID) } } // Ahora sí podemos filtrar por el ID del rol
        ]);

        res.status(200).json({ clientes });
        
    } catch (error) {
        res.status(500).json({ error: true, message: `Error en el servidor: ${error}` });
    }
}

async function read_clienteById(req, res) {
    try {
        const cliente = await Usuario.findOne({ 
            _id: req.params.id, 
            rol: new mongoose.Types.ObjectId(CLIENTE_ROL_ID) // Convertimos a ObjectId
        });

        console.log("Cliente encontrado:", cliente);

        res.status(200).json({ cliente });
    } catch (error) {
        console.error("Error en read_clienteById:", error);
        res.status(500).json({ error: true, message: `Error en el servidor: ${error}` });
    }
}


async function update_cliente(req, res) {
    const clienteId = req.params.id;
    try {
        const updatedData = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            documentId: req.body.documentId,
            state: req.body.state !== undefined ? req.body.state : true,
            adress: req.body.adress,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            rol: CLIENTE_ROL_ID
        };

        if (req.body.pss) {
            updatedData.pss = await bcrypt.hash(req.body.pss, saltRounds);
        }

        const result = await Usuario.findByIdAndUpdate(clienteId, { $set: updatedData }, { new: true });

        if (result) {
            res.status(200).json({ resultado: true, msg: 'Cliente modificado exitosamente', data: result });
        } else {
            res.status(404).json({ resultado: false, msg: 'No se pudo modificar el cliente, verifique el ID' });
        }
    } catch (error) {
        res.status(500).json({ resultado: false, msg: 'Error en el servidor', error: error.message });
    }
}

async function delete_cliente(req, res) {
    const clienteId = req.params.id;
    try {
        const result = await Usuario.findOneAndDelete({ _id: clienteId, rol: CLIENTE_ROL_ID });
        if (result) {
            res.status(200).json({ resultado: true, msg: 'Cliente eliminado exitosamente' });
        } else {
            res.status(404).json({ resultado: false, msg: 'No se pudo encontrar el cliente para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ resultado: false, msg: 'Error en el servidor', error: error.message });
    }
}

async function updateAcceso_cliente(req, res) {
    const clienteId = req.params.id;
    try {
        const updatedData = { state: req.body.state };
        const result = await Usuario.findOneAndUpdate(
            { _id: clienteId, rol: CLIENTE_ROL_ID },
            { $set: updatedData },
            { new: true }
        );

        if (result) {
            res.status(200).json({ resultado: true, msg: 'Acceso del cliente actualizado correctamente' });
        } else {
            res.status(404).json({ resultado: false, msg: 'No se pudo modificar el acceso del cliente' });
        }
    } catch (error) {
        res.status(500).json({ resultado: false, msg: 'Error en el servidor', error: error.message });
    }
}


//login
async function login(req, res) {
    const { email, pss } = req.body;

    try {
        // Buscar el usuario por correo electrónico y estado activo, incluyendo la información del rol
        const usuario = await Usuario.findOne({ email, state: true }).populate('rol');

        // Verificar si el usuario existe y la contraseña es válida
        if (usuario && await bcrypt.compare(pss, usuario.pss)) {
            // Generar un token con el ID del usuario y la clave de sesión
            const token = generateToken(usuario._id);

            // Enviar la respuesta con el token, ID y detalles del rol
            res.status(200).json({
                error: false,
                message: 'Inicio de sesión exitoso',
                token,
                id: usuario._id,
                rol: usuario.rol // Aquí rol incluirá toda su información
            });
        } else {
            res.status(401).json({
                error: true,
                message: 'Correo electrónico o contraseña incorrectos'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error}`,
            code: 0
        });
    }
}


function generateToken(userId) {

    const payload = { userId };
    
    const token = jwt.sign(payload, process.env.SERVER_SECRET_KEY, { expiresIn : '1h' });
    
    return token;
}

async function verifyToken(req, res) {
    const token = req.headers.authorization;
    
    if (!token) {
        throw new Error('Token de acceso no proporcionado');
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SERVER_SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(new Error('Token de acceso inválido. Inicie sesión para obtener un token válido.'));
            }
            req.user = decoded;
            resolve();
        });
    });
}
  


module.exports = {
    add_usuario,
    read_usuario,
    read_usuarioById,
    read_usuarioByIdPost,
    update_usuario,
    delete_usuario,
    updateAcceso_usuario,
    login,
    add_cliente,
    read_cliente,
    read_clienteById,
    update_cliente,
    delete_cliente,
    updateAcceso_cliente,

}
