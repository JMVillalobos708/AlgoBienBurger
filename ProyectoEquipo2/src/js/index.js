//Codigo de Javascript para conectar index (logica del login) con el frontend;
import {Login} from './services/login.js' 
import {LocalStorage} from './services/localstorage.js'
const btnIniciarSesion = document.getElementById("btnLogin");
const btnDashBoard = document.getElementById("dashboard-btn");
const btnLogIn = document.getElementById("login");
const localStorage = new LocalStorage();
const user = JSON.parse(localStorage.get("user"));

if (user !=null){
  btnIniciarSesion.classList.add("hide-btn");
}
var login = new Login();
btnLogIn.addEventListener('click', async (e) =>{
  e.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  console.log("INICIANDO SESION");
  await login.iniciarSesion(userName, password).then(data =>{
    if (login.isLogginOn){
      
      btnDashBoard.classList.remove("hide-btn");
      console.log("HOLI PA")
      btnIniciarSesion.classList.add("hide-btn");
      window.location.href = "dashboard.html"
    }
  });
})
if (login.isLoggin()){
      
  btnDashBoard.classList.remove("hide-btn");
  console.log("HOLI PA")
  btnIniciarSesion.classList.add("hide-btn");
}