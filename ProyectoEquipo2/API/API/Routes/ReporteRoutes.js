const express = require('express')
const router = express.Router();
const ReporteController = require('../Controllers/ReporteController')
router.get('/reporte', ReporteController.Get)

module.exports = router;