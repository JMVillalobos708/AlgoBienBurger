import {LocalStorage} from './services/localstorage.js'
import {Login} from './services/login.js'
const _LocalStorage = new LocalStorage()
const login = new Login();

async function construirYAgregarTabla() {
    try {
        //const datos = await obtenerPedidos();

        const datos = [{pagadas: 1, no_pagadas: 3, total_ventas: 4, resultado: 3, mes: 12, total: 5}]; 

        const tablaContainer = document.getElementById('tablaReporte');

    
        // Crear la tabla con simple-datatables
        const tabla = new simpleDatatables.DataTable(tablaContainer, {
            data: {
                headings: ['Pagadas', 'No pagadas', 'Total Ventas', 'Resultado', 'Mes', 'Total'],
                data: datos.map(({ pagadas, no_pagadas, total_ventas, resultado, mes, total }) => {
                    
                    return [pagadas, no_pagadas, total_ventas, resultado, mes, total];
                }),
            },
            search: false,

        });
        
        // Puedes personalizar la configuración según tus necesidades
        // Por ejemplo, si deseas habilitar la búsqueda:
        // const tabla = new simpleDatatables.DataTable(tablaContainer, { search: true });
        
    
    } catch (error) {
        console.error('Error al construir y agregar la tabla:', error);
    
        const tablaContainer = document.getElementById('datatablesSimple');
    
        if (tablaContainer) {
            new simpleDatatables.DataTable(tablaContainer);
        }
    }
}

window.addEventListener('DOMContentLoaded', construirYAgregarTabla);
const user = JSON.parse(_LocalStorage.get("user"));
if (user != null){
    const user_entry = document.getElementById("user-entry");
    console.log(user);
    user_entry.innerHTML = user.username;
}
console.log("JS VINCULADO")

const btnCerrarSesion = document.getElementById("btn-cerrar-sesion").addEventListener('click', login.cerrarSesion);

