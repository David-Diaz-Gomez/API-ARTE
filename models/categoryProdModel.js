const CP = require('../dtos/categoryProdDTO');

function add_cp(req, res) {
    const cp = new CP({
      name: req.body.name,
      state: req.body.state,
    });
    cp
      .save()
      .then((result) => {
        res.status(201).json({
          error: false,
          message: "Se creó la categoria de producto",
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

  async function read_cp(req, res) {
    try {
      const cps = await CP.find();
      res.status(200).json({ cps });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: `Server error: ${error}`,
        code: 0,
      });
    }
  }

  async function read_cpById(req, res) {
    try {
        const { id } = req.params;
        const cp = await CP.findById(id);

        if (!cp) {
            return res.status(404).json({
                error: true,
                message: "Categoría no encontrada",
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
    add_cp,
    read_cp,
    read_cpById
};