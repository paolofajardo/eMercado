document.getElementById('boton').addEventListener('click', function () {

    let usuario = {}
    usuario.nombre = document.getElementById("user").value;
    usuario.pass = document.getElementById("password").value;

    if (usuario.nombre !== "" && usuario.pass !== "") {
        location.href = "index.html";
    } else {
        alert("Por favor llene los campos");
    };

    let checkbox = document.getElementById('checkbox');

    if (checkbox.checked) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    }
});