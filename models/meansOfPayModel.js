const MOP = require('../dtos/meansOfPayDTO');

function add_MOP(req, res) {
    const mop = new MOP({
      name: req.body.name,
      state: req.body.state,
    });
    mop
      .save()
      .then((result) => {
        res.status(201).json({
          error: false,
          message: "Se creó el método de pago",
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

  async function read_MOP(req, res) {
    try {
      const mops = await MOP.find();
      res.status(200).json({ mops });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: `Server error: ${error}`,
        code: 0,
      });
    }
  }

   async function read_MOPById(req, res) {
      try {
          const { id } = req.params;
          const mop = await MOP.findById(id);
  
          if (!rol) {
              return res.status(404).json({
                  error: true,
                  message: "Método de pago no encontrada",
                  code: 1,
              });
          }
  
          res.status(200).json({ cp });
      } catch (error) {
          res.status(500).json({
              error: true,
              message: `Server error: ${error}`,
              code: 0,
          });
      }
  }

module.exports = {
    add_MOP,
    read_MOP,
    read_MOPById
};