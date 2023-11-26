const express = require('express');
const router  = express.Router();
const PedidoController = require('../Controllers/PedidoController')

router.get('/pedido', PedidoController.Get);


module.exports = router;
