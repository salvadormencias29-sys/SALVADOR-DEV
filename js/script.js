const menu = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-bar");
const enlaces = document.querySelectorAll(".nav-bar a");
menu.addEventListener("click", () => {
    nav.classList.toggle("active");
    if(nav.classList.contains("active")){
        menu.innerHTML = "✕";
    }else{
        menu.innerHTML = "☰";
    }
});
enlaces.forEach(enlace => {
    enlace.addEventListener("click", () => {
        nav.classList.remove("active");
        menu.innerHTML = "☰";
    });
});
