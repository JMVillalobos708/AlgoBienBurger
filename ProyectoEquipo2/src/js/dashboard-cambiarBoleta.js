
async function obtenerPedidos() {
    const url = 'http://127.0.0.1:5200/api/pedido';

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
        const datos = await obtenerPedidos();

        //const datos = [{id_cuenta: 1, nombre_p: 'caca', precio_p: 200, cantidad: 3, bol_pago: false, fecha: '2024/03/2024'}]; 

        const tablaContainer = document.getElementById('datatablesSimple');
    
        // Configurar el idioma a español
        const idiomaEspanol = {
            'search': 'Buscar:',
            'previous': 'Anterior',
            'next': 'Siguiente',
            'last': 'Último',
            'first': 'Primero',
            'info': 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
            'empty': 'No hay datos disponibles',
            'emptyTable': 'No hay datos disponibles en la tabla',
        };
    
        // Crear la tabla con simple-datatables
        const tabla = new simpleDatatables.DataTable(tablaContainer, {
            data: {
                headings: ['ID', 'Nombre', 'Precio', 'Cantidad', 'Bol_pago', 'Fecha', 'Pagar'],
                data: datos.map(({ id_cuenta, nombre_p, precio_p, cantidad, bol_pago, fecha, tool }) => {
                    // Agregar un botón de acción (Editar) a cada fila
                    const button = `<button class="btn-pagado" onclick="cambiarEstadoBoleta(${id_cuenta})">Pagar</button>`;
                    
                    return [id_cuenta, nombre_p, precio_p, cantidad, bol_pago ? "Pagada" : "No pagada", fecha, button];
                }),
            },
            language: idiomaEspanol,
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
async function cambiarEstadoBoleta(id){
    console.log(id);
    const url = `http://127.0.0.1:5200/api/pedido/${id}`;

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        console.log("Respuesta del servidor:" ,data );
        construirYAgregarTabla();
        return data;
    } catch(error){
        console.error("Errorcito: ", error);
        throw error;
    }
}