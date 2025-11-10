const ver = document.getElementById("verpassword")
ver.addEventListener("change", vercontrasena )

function vercontrasena() {
    if (ver.checked === true) {
        document.getElementById("inppassword").type= "text"
        document.getElementById("inpconfirmar").type= "text"
    }else{
        document.getElementById("inppassword").type= "password"
        document.getElementById("inpconfirmar").type= "password"
    }
}
const botoningresar = document.getElementById("btniniciar")
botoningresar.addEventListener("click", ingresar )
function ingresar() {
    let usuario = document.getElementById("inpusuario").value
    let contrasena1 = document.getElementById("inppassword").value
    let contrasena2 = document.getElementById("inpconfirmar").value
    if (contrasena1 === contrasena2) {
        let arrayusuario = JSON.parse(localStorage.getItem("usuario"))
        if (arrayusuario === null) {
                arrayusuario = []
            }
        let usuarioregistrado = arrayusuario.find(u => u.nombre === usuario)
        if (usuarioregistrado) {
            alert("El usuario ya existe")
        } else {
            usuarionuevo={
                nombre: usuario,
                password: contrasena1,
            }
            arrayusuario.push(usuarionuevo)
            localStorage.setItem("usuario", JSON.stringify(arrayusuario) )
        }
    }else{
        alert("Las contraseñas no coinciden")
    }
}

const botonregistrar = document.getElementById("btnregistrarse")
botonregistrar.addEventListener("click", verregistrar )
function verregistrar() {
    document.getElementById("confirmar").style.display = "block"
    document.getElementById("inpconfirmar").style.display = "block"
    document.getElementById("i ")

}