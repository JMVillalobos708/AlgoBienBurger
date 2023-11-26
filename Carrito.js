//Logica de carrito de compras.add

const Tamanyos = {
    GRANDE: 1,
    PEQUENYO: 2
}

const TIPO = {
  COMIDA: 1,
  BEBIDA: 2

}
class Item{
    constructor(id, nombre, precio, tamanyos, tipo) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.tamanyos = tamanyos;
        this.tipo = tipo;
      }
}
class Concepto{
  constructor(item){
    this.id;
    this.item = item;
    this.cantidad = 1;
  }
}

class Cuenta{
  constructor(mesa, pedidos){
    this.mesa = mesa;
    this.pedidos = pedidos;
  }
}
class Carrito{
    constructor(){
        this.productos = [];
    }

    // Agregar un producto al carrito
  agregarProducto(concepto) {
    this.productos.push(concepto);
    console.log(`Producto agregado: ${concepto.item.nombre}`);
  }

  // Eliminar un producto del carrito
  eliminarProducto(producto) {
    const index = this.productos.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      console.log(`Producto eliminado: ${producto.nombre}`);
    } else {
      console.log("El producto no está en el carrito.");
    }
  }

  // Calcular el total de la compra
  calcularTotal() {
    const total = this.productos.reduce((sum, producto) => sum + (producto.item.precio * producto.cantidad), 0);
    //console.log(`Total de la compra: ${total}`);
    return total;
  }

  // Vaciar el carrito
  vaciarCarrito() {
    this.productos = [];
    //console.log("Carrito vaciado.");
  }

  getCantidadProductos(){
    return this.productos.length;
  }
}


export {Carrito, Item, Tamanyos, Concepto, TIPO, Cuenta};