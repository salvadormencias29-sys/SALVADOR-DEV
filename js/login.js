console.log("LOGIN JS CARGADO");
const supabaseUrl = "https://pqhfggtleiwlrdluwyiy.supabase.co";
const supabaseKey = "sb_publishable__QuNji-mQkV056nWmn___g_YXRZRdS6";
const clienteSupabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
console.log("CLIENTE CREADO");
const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("FORMULARIO ENVIADO");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Email:", email);
    const { data, error } = await clienteSupabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    console.log("RESPUESTA SUPABASE:", data, error);
    if(error){
        alert(error.message);
        return;
    }
    alert("Login correcto");
    window.location.href = "admin.html";
});