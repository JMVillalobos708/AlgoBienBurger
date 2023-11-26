const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

// Obtener todas las tareas
router.get('/user', UserController.getAllUsers);

// Obtener una tarea por ID
router.get('/user/:id', UserController.getUserById);

// Crear una nueva tarea
router.post('/user', UserController.createUser);

// Actualizar una tarea por ID
router.put('/user/:id', UserController.updateUser);

// Eliminar una tarea por ID
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;
