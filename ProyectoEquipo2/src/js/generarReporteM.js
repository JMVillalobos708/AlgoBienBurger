import {LocalStorage} from './services/localstorage.js'
import {Login} from './services/login.js'
const _LocalStorage = new LocalStorage()
const login = new Login();
var reportesList = [];
var tabla;
async function construirYAgregarTabla(data) {
    try {
        //const datos = await obtenerPedidos();
        const datos = [data];
        if (!tabla){
            //const datos = [{pagadas: 1, no_pagadas: 3, total_ventas: 4, resultado: 3, mes: 12, total: 5}]; 
            console.info(datos);
            const tablaContainer = document.getElementById('tablaReporte');

            
            // Crear la tabla con simple-datatables
            tabla = new simpleDatatables.DataTable(tablaContainer, {
                data: {
                    headings: ['Pagadas', 'No pagadas', 'Total Ventas', 'Resultado', 'Mes', 'Total'],
                    data: datos.map(({ pagadas, no_pagadas, total_ventas, resultado, mes, resultado_terminal }) => {
                        
                        return [pagadas, no_pagadas, total_ventas, resultado, mes, resultado_terminal];
                    }),
                },
                search: false,

            });
        }
        else{
            console.log("Agregando datos a la tabla");
            tabla.insert(datos.map(({ pagadas, no_pagadas, total_ventas, resultado, mes, resultado_terminal }) => {
                        
                return [pagadas, no_pagadas, total_ventas, resultado, mes, resultado_terminal];
            }));
            tabla.refresh();
            tabla.update();
        }
       
        
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
async function generarReporte(){
    console.log
    const gastosMes = document.getElementById("gastosDelMes").value;
    const mes_box = document.getElementById("mesesSelect").value;
    const datos = {
        "mes": mes_box,
        "gastosMes": gastosMes
    }
    const configuration = {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch("https://apiburger.onrender.com/api/reporte", configuration);
    const data = await response.json();
    console.log(data);
    reportesList.push(data);
    construirYAgregarTabla(data);
}
// window.addEventListener('DOMContentLoaded', construirYAgregarTabla);
const user = JSON.parse(_LocalStorage.get("user"));
if (user != null){
    const user_entry = document.getElementById("user-entry");
    console.log(user);
    user_entry.innerHTML = user.username;
}
console.log("JS VINCULADO")
const btnGenerar = document.getElementById("btn-generar-reporte").addEventListener('click', generarReporte);
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion").addEventListener('click', login.cerrarSesion);

