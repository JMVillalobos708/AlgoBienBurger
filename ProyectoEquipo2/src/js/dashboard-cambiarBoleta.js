
async function obtenerPedidos() {
    const url = 'https://apiburger.onrender.com/api/pedido';

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
async function cambiarEstadoBoleta(id){
    console.log(id);
    const url = `https://apiburger.onrender.com/api/pedido/${id}`;
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        console.log("Respuesta del servidor:" ,data );
    await actualizarTabla();
    
        return data;
    } catch(error){
        console.error("Errorcito: ", error);
        throw error;
    }
}

async function actualizarTabla() {
    window.location.reload();
}
