import {Item} from './Carrito.js'
class Menu{

    constructor(){
        this.menuList = []
    }

    agregarItem(id, nombre, precio, tamanyos, tipo){
        let newItem = new Item(id, nombre, precio, tamanyos, tipo)
        this.menuList.push(newItem);
    }

    obtenerMenu(){
        return this.menuList;
    }
}

export {Menu}