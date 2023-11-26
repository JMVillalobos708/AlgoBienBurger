const pool = require('../config/db');
const MenuService = require('./MenuService');

const _MenuService = new MenuService();
class CuentaService{
    constructor(){

    }
    async Add(cuentaRequest){
        try{
            //var pedidoReq = new PedidoRequest(pedidoRequest.id, pedidoRequest.item, pedidoRequest.cantidad);
            var total = 0;
            var mesa = cuentaRequest.mesa;
            var n_cuenta;
            console.log("LOS PEDIDOS: ", typeof cuentaRequest.pedidos);
            var misPedidos = cuentaRequest.pedidos;
            //Calculamos el total
            for (const element of misPedidos){
                let precioIndividual = await _MenuService.obtenerPrecio(element.id);
                console.log("Cantidad: ", element.cantidad, "Precio: ", precioIndividual.precio_p);
                total += element.cantidad * precioIndividual.precio_p;
                console.log("total dentro del for es actualmente: ", total);
            }
        
            //Realizamos query para crear la cuenta
            console.log("total fuera del for es actualmente: ", total);
            const query = 'INSERT INTO public.cuenta(n_mesa, total) VALUES ($1, $2) RETURNING id_cuenta';
            const {rows} =  await pool.query(query, [mesa,total]);
            //Obtenemos el ID de la cuenta creada
            
            n_cuenta = rows[0].id_cuenta;
            console.info("N CUENTA: ", n_cuenta)
            //Creamos los pedidos
            for (const pedido of misPedidos){
                let precioIndividual = await _MenuService.obtenerPrecio(pedido.id);
                let subTotal = precioIndividual.precio_p * pedido.cantidad;
                console.info("El subtotal es actualmente: ", subTotal)
                const queryPedido = `INSERT INTO pedido(id_cuenta, id_producto, subtotal, cantidad) VALUES ($1, $2, $3, $4);`
                pool.query(queryPedido, [n_cuenta, pedido.id, subTotal, pedido.cantidad]);
            }
        }
        catch(error){
        console.error("ERORR EN LA QUERY", error);
    }
    return


    }
}

module.exports = CuentaService;