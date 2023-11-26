const pool = require('../config/db');

class MenuService{
    constructor(){

    }

    async obtenerPrecio(id){
        console.log("LA ID ES: ", id);
        const query = `SELECT precio_p FROM menu WHERE id_producto=$1`;
        try{
            let {rows} = await pool.query(query, [id]);
            console.info("precio: ", rows[0])
            return rows[0]
        }   
        catch(error){
            console.error("ERROR OBTENER PRECIO", error);
        }
    }
}

module.exports = MenuService;