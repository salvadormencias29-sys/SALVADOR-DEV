console.log("CONTACT.JS CARGADO");
const supabaseUrl = "https://pqhfggtleiwlrdluwyiy.supabase.co";
const supabaseKey = "sb_publishable__QuNji-mQkV056nWmn___g_YXRZRdS6";
const clienteSupabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
const formulario = document.getElementById("contactForm");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("input");
const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const modal = document.getElementById("modalExito");
const cerrarModal = document.getElementById("cerrarModal");
function mostrarError(input, mensaje) {
    input.classList.remove("correcto");
    input.classList.add("error-input");
    const error = input.nextElementSibling;
    error.innerText = mensaje;
}
function mostrarCorrecto(input) {
    input.classList.remove("error-input");
    input.classList.add("correcto");
    const error = input.nextElementSibling;
    error.innerText = "";
}
function validarNombre(){
    const valor = nombre.value.trim();
    if(valor === ""){
        mostrarError(nombre,"Ingrese su nombre.");
        return false;
    }
    if(valor.length < 3){
        mostrarError(nombre,"Debe tener al menos 3 caracteres.");
        return false;
    }
    mostrarCorrecto(nombre);
    return true;
}
function validarEmail(){
    const valor = email.value.trim();
    if(valor === ""){
        mostrarError(email,"Ingrese un correo.");
        return false;
    }
    if(!correoRegex.test(valor)){
        mostrarError(email,"Correo electrónico inválido.");
        return false;
    }
    mostrarCorrecto(email);
    return true;
}
function validarMensaje(){
    const valor = mensaje.value.trim();
    if(valor === ""){
        mostrarError(mensaje,"Escriba un mensaje.");
        return false;
    }
    if(valor.length < 10){
        mostrarError(mensaje,"El mensaje debe tener al menos 10 caracteres.");
        return false;
    }
    mostrarCorrecto(mensaje);
    return true;
}
nombre.addEventListener("input", validarNombre);
email.addEventListener("input", validarEmail);
mensaje.addEventListener("input", validarMensaje);
formulario.addEventListener("submit", async function(e){
    e.preventDefault();
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const mensajeValido = validarMensaje();
    if(!(nombreValido && emailValido && mensajeValido)){
        return;
    }
    const { error } = await clienteSupabase
        .from("portfolio-contact")
        .insert([
            {
                nombre: nombre.value,
                correo: email.value,
                mensaje: mensaje.value
            }
        ]);
    console.log(error);
    if(error){
        console.error(error);
        alert("Ocurrió un error al enviar el mensaje.");
        return;
    }
    modal.classList.add("active");
    setTimeout(() => {
        modal.classList.remove("active");
    },3000);
    formulario.reset();
    [nombre,email,mensaje].forEach(input=>{
        input.classList.remove("correcto");
    });
});
cerrarModal.addEventListener("click", () => {
    modal.classList.remove("active");
});
modal.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.classList.remove("active");
    }
});