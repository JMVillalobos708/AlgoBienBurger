const PedidoService = require('../Services/PedidoService');

const _pedidoService = new PedidoService();

const PedidoController = {
 

  async Get(req, res) {
    console.log("Estamos en obtener pedidos");
    console.info("Request de pedidos: ", req.body);
    const cuenta = req.body;
    try {
      const coso = await _pedidoService.Get();
      res.status(201).json(coso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PedidoController;
