const pool = require('../config/db');

//Create a enum
const Types = {
    administrador : 0,
    mesero: 1,
    cocinero: 2
}

class UserModel {
  async getAllUsers() {
    try{

      const query = 'SELECT id_usuario, contrasenia FROM public.usuario;'
      const { rows } = await pool.query(query);
      console.info(`rows: ${rows}`);
      return rows;
    }catch(error){
      console.error("Error: ", error);
    }
    return rows;
  }

  async getUserById(id) {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async createUser(user) {
    const {userNameInput, nameInput, emailInput, passwordInput, typeInput} = user;
    var myType = ((typeInput == Types.administrador)) ? true : false;
    var query;
    var query2;
    var tipo;
    if (typeInput == Types.administrador){
      try{  
        query = `INSERT INTO public.usuario( id_usuario, contrasenia) VALUES ($1, $2);`
        query2 = `INSERT INTO public.administrador (nombre_a, correo_a, id_usuario) VALUES ( $1, $2, $3);`
        const {rows} = await pool.query(query, [userNameInput, passwordInput]);
        await pool.query(query2, [nameInput, emailInput, userNameInput]);
        return rows[0];
      } catch (error){
        console.error(error);
      }
    }
    else{
      if (typeInput == Types.mesero){
        tipo="Mesero";
      }
      else if (typeInput == Types.cocinero){
        tipo="Cocinero";
      }
      try{
        console.info("DEBUG TIPO: ", tipo);
        query =`INSERT INTO public.usuario( id_usuario, contrasenia) VALUES ($1, $2);` 
        query2 = `INSERT INTO public.empleado (nombre_e, correo_e, cargo_e, id_usuario) VALUES ( $1, $2, $3, $4);`
        const { rows } = await pool.query(query, [userNameInput, passwordInput]);
        await pool.query(query2, [ nameInput, emailInput, tipo, userNameInput]);
        return rows[0];
      } catch (error){
        console.error(error);
      }
    }
  }

  async updateUser(id, task) {
    const { description, completed } = task;
    const query = 'UPDATE tasks SET description = $1, completed = $2 WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [description, completed, id]);
    return rows[0];
  }

  async deleteUser(id) {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = UserModel  ;
