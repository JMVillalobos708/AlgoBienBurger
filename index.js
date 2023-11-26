//Codigo de Javascript para conectar index (logica del login) con el frontend;
var isLoggin = false;
const btnIniciarSesion = document.getElementById("btnLogin");
const btnReportes = document.getElementById("btnReportes");
const btnLogIn = document.getElementById("login");
btnReportes.classList.add("hide-btn");
btnLogIn.addEventListener('click', async (e) =>{
  e.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const apiUrl = 'http://127.0.0.1:5200/api/user'; // Reemplaza con la ruta correcta

  // Realiza una solicitud GET al servidor
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud al servidor no se completó correctamente');
      }
      return response.json();
    })
    .then((data) => {
      // Haz algo con los datos obtenidos, por ejemplo, mostrarlos en la página
      data.forEach(element => {
        if (
        element.id_usuario === userName &&
        element.contrasenia === password){
            isLoggin = true;
            btnIniciarSesion.classList.add("hide-btn");
            btnReportes.classList.remove("hide-btn");
            
          console.log("HA INICIADO SESION");
        }
      });
    })
    .catch((error) => {
      console.error('Error al obtener datos del servidor:', error);
    });
})