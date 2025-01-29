const Rol = require('../dtos/rolDTO');

function add_rol(req, res) {
    const rol = new Rol({
      name: req.body.name,
      state: req.body.state,
    });
    rol
      .save()
      .then((result) => {
        res.status(201).json({
          error: false,
          message: "Se creó el rol",
          data: result,
        });
      })
      .catch((error) => {
        res.status(404).json({
          error: true,
          message: `Server error: ${error}`,
        });
      });
  }

  async function read_rol(req, res) {
    try {
      const roles = await Rol.find();
      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: `Server error: ${error}`,
        code: 0,
      });
    }
  }

module.exports = {
    add_rol,
    read_rol
};