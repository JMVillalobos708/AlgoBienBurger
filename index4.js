import {Carrito, Item, Tamanyos, Concepto, TIPO, Cuenta} from "./Carrito.js";
import { Menu } from "./Menu.js";


const menu = new Menu();
const carrito = new Carrito();
//var CheeseburgerG = new Item(1, "Cheeseburger", 120, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(1, "Cheeseburger Grande", 120, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(2, "Cheeseburger Chica", 80, Tamanyos.PEQUENYO, TIPO.COMIDA)
menu.agregarItem(3, "Chickenburger Grande", 130, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(4, "Chickenburger Chica", 85, Tamanyos.PEQUENYO, TIPO.COMIDA)
menu.agregarItem(6, "Hotburger Grande", 130, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(5, "Hotburger Chica", 85, Tamanyos.PEQUENYO, TIPO.COMIDA)
menu.agregarItem(7, "Guacamole Burger Grande", 130, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(8, "Guacamole Burger Chica", 85, Tamanyos.PEQUENYO, TIPO.COMIDA)
menu.agregarItem(9, "Refresco", 15, Tamanyos.GRANDE, TIPO.BEBIDA)
menu.agregarItem(10, "Malteada", 35, Tamanyos.GRANDE, TIPO.BEBIDA)
menu.agregarItem(11, "Café", 20, Tamanyos.GRANDE, TIPO.BEBIDA)
menu.agregarItem(12, "Jugo de naranja", 20, Tamanyos.GRANDE, TIPO.BEBIDA)
menu.agregarItem(13, "Aros de Cebolla", 45, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(14, "Galleta", 25, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(15, "BBQ Bites", 55, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(16, "Papas con Queso", 55, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(17, "Croissant", 55, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(18, "Huevo con tocino", 65, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(19, "Burrito", 35, Tamanyos.GRANDE, TIPO.COMIDA)
menu.agregarItem(20, "Hotcakes", 55, Tamanyos.GRANDE, TIPO.COMIDA)


//var items = [CheeseburgerG, CheeseburgerC, ChickenburgerC, ChickenburgerG, HotburgerC, HotburgerG, Guacamole_BurgerC, Guacamole_BurgerG, Refresco, Malteada, Cafe, Jugo_naranja]
function toggleActivarInfoCarrito(){
    const infoCarrito = document.getElementById("carrito-info");
    const controlsCarrito = document.getElementById("carrito-controls");
    if (carrito.getCantidadProductos() < 1){
        infoCarrito.classList.add('hide');
        controlsCarrito.classList.add('hide');
    }
    else{
        infoCarrito.classList.remove('hide');
        controlsCarrito.classList.remove('hide');
    }
}

function actualizarTotal(){
    const total = document.getElementById("total");
    total.textContent=`$ ${carrito.calcularTotal()}`
    //console.log(total);
}
const openCarritoButton = document.getElementById("openCarrito");
const carrito_aside = document.getElementById("carrito-wrapper");
function showCarrito(){
    if (carrito_aside.classList.contains("hide")){
        carrito_aside.classList.remove("hide");
    }
    else{
        carrito_aside.classList.add("hide");
    }
}

function borrarElementosCarrito(){
    const lista = document.getElementById("carrito-lista");
    carrito.productos.forEach(producto => {
        let elementoEliminar = lista.querySelector(`#item-${producto.item.id}`);
        //console.log(lista);
        lista.removeChild(elementoEliminar);
    });
}
function obtenerMesaSeleccionada(){
    const mesa = document.getElementById("mesa").value;
    
    return parseInt(mesa);
    
}
function realizarCompra(){
    actualizarTotal();
    var pedidos = [];
    carrito.productos.forEach((e) =>{
        pedidos.push(e);
    });
    // const cuenta = new Cuenta(obtenerMesaSeleccionada(), pedidos);
    const cuenta = {
        mesa: obtenerMesaSeleccionada(),
        pedidos: pedidos
    }
    console.log("La cuenta es: ", cuenta);
    console.log("Los pedidos son: ", pedidos);
    const url = 'http://127.0.0.1:5200/api/cuenta';
    const data = cuenta;

    fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json' // Ajusta el tipo de contenido según tus necesidades
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
    console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
    console.error('Error:', error);
    });
    borrarElementosCarrito();
    carrito.vaciarCarrito();
    toggleActivarInfoCarrito();
    }
function insertarEnCarrito(item){
    const item_selected = menu.obtenerMenu().find(p => p.id == item);
    var concepto = new Concepto(item_selected);
    concepto.id = item_selected.id;
    if(carrito.productos.some(c => c.id === concepto.id)){
        let producto = carrito.productos.find(p => p.id === concepto.id);
        producto.cantidad += 1;
        const item_in_list = document.getElementById(item_selected.id).querySelector("#cantidad");
        item_in_list.textContent = `Cantidad: ${producto.cantidad}`;
        
    }
    else{
        carrito.agregarProducto(concepto);

    
    const carrito_items = document.getElementById("carrito-lista");
    let image = ``
    if (concepto.item.tipo === TIPO.BEBIDA){
        image = `<img style="height: 56px; width: 56px;" src="./src/imgs/icons/soft-drink.png">`
    }
    else{
        image = `<img style="height: 56px; width: 56px;" src="./src/imgs/icons/burger-icon.png">`
    }
    let card = `
    <li id="item-${concepto.item.id}">
        <div class="carrito-item" id="${concepto.item.id}">
            <div>
                ${image}
            </div>
            <div class="carrito-item-info">
            <p>${concepto.item.nombre}</p>
            <p>Costo: $${concepto.item.precio}</p>
            <p id="cantidad">Cantidad: 1</p>
            </div>
        </div>
        </li>

    `
    carrito_items.innerHTML += card;
    toggleActivarInfoCarrito();
}
    actualizarTotal();
}

carrito_aside.addEventListener('click', function(event) {
    const componente = document.getElementById('carrito-aside');
    
    // Verifica si el clic fue dentro o fuera del componente
    if (!componente.contains(event.target)) {
        if (!carrito_aside.classList.contains("hide")){

            carrito_aside.classList.add("hide");
        }
    }
  });
carrito_aside.classList.add("hide");
openCarritoButton.addEventListener('click', (e =>{
    showCarrito();
}))

window.insertarEnCarrito = insertarEnCarrito;
window.realizarCompra = realizarCompra;