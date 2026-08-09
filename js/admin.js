const supabaseUrl = "https://pqhfggtleiwlrdluwyiy.supabase.co";
const supabaseKey = "sb_publishable__QuNji-mQkV056nWmn___g_YXRZRdS6";
const supabaseAdmin = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
async function verificarSesion(){
    const { data } = await supabaseAdmin.auth.getSession();
    if(!data.session){
        window.location.href = "login.html";
        return;
    }
}
async function cargarMensajes(){
    const { data, error } = await supabaseAdmin
        .from("portfolio-contact")
        .select("*")
        .order("created_at",{ascending:false});
    if(error){
        console.error(error);
        return;
    }
    const tabla = document.getElementById("tablaMensajes");
    tabla.innerHTML = "";
    data.forEach(mensaje=>{
        tabla.innerHTML += `
            <tr>
                <td>${mensaje.nombre}</td>
                <td>${mensaje.correo}</td>
                <td>${mensaje.mensaje}</td>
                <td>${mensaje.created_at}</td>
            </tr>
        `;
    });
}
document
.getElementById("logout")
.addEventListener("click",async()=>{
    await supabaseAdmin.auth.signOut();
    window.location.href="login.html";
});
verificarSesion();
cargarMensajes();