import {LocalStorage} from './localstorage.js'
const _LocalStorage = new LocalStorage();
class Login{
    constructor(){
        this.isLogginOn = false;
    }
    async iniciarSesion(nombre, password){
        if (!this.isLogginOn){
            const apiUrl = 'https://apiburger.onrender.com/api/user/login'; // Reemplaza con la ruta correcta
            const data ={
                username: nombre,
                password: password
            }
            try{
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(data)
                });
                const response_data = await response.json();
                console.log("Respuesta del servidor: ", response_data)
                this.isLogginOn = true;
                _LocalStorage.add("user", data);
                return data
            } catch(error){
                console.error("OTRO ERROR LAPTM", error);
                throw error;
            }
        }
    }
    cerrarSesion(){
        this.isLogginOn = false;
        _LocalStorage.delete("user");
    }

    isLoggin(){
        if (_LocalStorage.get("user") != null){
            return true;
        }
        return false;
    }
};

export {Login};