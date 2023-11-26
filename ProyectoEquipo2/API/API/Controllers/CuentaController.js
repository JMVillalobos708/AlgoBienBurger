const CuentaService = require('../Services/CuentaService');

const _cuentaService = new CuentaService();

const CuentaController = {
 

  async createCuenta(req, res) {
    console.log("Estamos en create cuenta");
    console.info("Request: ", req.body);
    const cuenta = req.body;
    try {
      const coso = await _cuentaService.Add(cuenta);
      res.status(201);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CuentaController;
