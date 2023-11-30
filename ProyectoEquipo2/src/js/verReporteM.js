import {LocalStorage} from './services/localstorage.js'
import {Login} from './services/login.js'
const _LocalStorage = new LocalStorage()
const login = new Login();
async function obtenerReportes() {
    const url = 'http://127.0.0.1:5200/api/reporte';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propaga el error para que pueda ser manejado en la función loadOntable
    }
}

async function construirYAgregarTabla() {
    try {
        const datos = await obtenerReportes();

        //const datos = [{id_cuenta: 1, nombre_p: 'caca', precio_p: 200, cantidad: 3, bol_pago: false, fecha: '2024/03/2024'}]; 

        const tablaContainer = document.getElementById('datatablesSimple');
    
        // Crear la tabla con simple-datatables
        const tabla = new simpleDatatables.DataTable(tablaContainer, {
            data: {
                headings: ['Pagadas', 'No pagadas', 'Total Ventas', 'Resultado', 'Mes', 'Total'],
                data: datos.map(({ pagadas, no_pagadas, total_ventas, resultado, mes, resultado_terminal }) => {
                    
                    return [pagadas, no_pagadas, total_ventas, resultado, mes, resultado_terminal];
                }),
            },

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

