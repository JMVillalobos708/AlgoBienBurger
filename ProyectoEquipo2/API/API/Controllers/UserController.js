const UserModel = require('../Models/UserModel');

const userModel = new UserModel();

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.debug("ERROR", error);
      res.status(500).json({ error: error.message });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const task = await taskModel.getTaskById(id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createUser(req, res) {
    console.log("Estamos en create User");
    console.info("Request: ", req.body);
    const { userNameInput, nameInput, emailInput, passwordInput, typeInput} = req.body;
    console.info("debug: ", userNameInput);
    const user = { userNameInput, nameInput, emailInput, passwordInput, typeInput};
    console.info("DEBUG -CREATE USER: USER: ", user);
    try {
      const newUser = await userModel.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { description, completed } = req.body;
    const task = { description, completed };
    try {
      const updatedTask = await userModel.updateTask(id, task);
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedTask = await taskModel.deleteTask(id);
      if (deletedTask) {
        res.json(deletedTask);
      } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;
