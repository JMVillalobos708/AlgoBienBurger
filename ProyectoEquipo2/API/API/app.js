const express = require('express');
const app = express();
const UserRoutes = require('./Routes/UserRoutes');
const CuentaRoutes = require('./Routes/CuentaRoutes')
const PedidoRoutes = require('./Routes/PedidoRoutes')
const pool = require('./config/db');

// Middleware para analizar solicitudes JSON
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite solicitudes desde cualquier origen. Puedes configurar un dominio específico en lugar de '*'.
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Rutas de la API
app.use('/api', UserRoutes);
app.use('/api', CuentaRoutes)
app.use('/api', PedidoRoutes)
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// Cierre adecuado de la conexión con la base de datos al cerrar la aplicación
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Conexión a la base de datos cerrada');
    process.exit(0);
  });
});
