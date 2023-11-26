const pool = require('../config/db');

class PedidoService{
    constructor(){

    }

    async Get(){
        const query = `
        SELECT
        c.id_cuenta,
        m.nombre_p AS nombre_P,
        m.precio_p AS precio_P,
        p.cantidad,
        c.bol_pago,
        c.fecha
        FROM
        public.cuenta c
        JOIN
        public.pedido p ON c.id_cuenta = p.id_cuenta
        JOIN
        public.menu m ON p.id_producto = m.id_producto
        ORDER BY
        c.id_cuenta DESC`
        try{
            let {rows} = await pool.query(query);
            console.info("Caca: ", rows)
            return rows;
        }   
        catch(error){
            console.error("ERROR Pedido", error);
        }
    }
}

module.exports = PedidoService;