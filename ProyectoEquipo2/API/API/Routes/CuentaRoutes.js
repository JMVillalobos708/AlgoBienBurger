const express = require('express');
const router = express.Router();
const CuentaController = require('../Controllers/CuentaController');

// Obtener todas las tareas
router.post('/cuenta', CuentaController.createCuenta);


module.exports = router;
