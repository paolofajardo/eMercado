document.getElementById('boton').addEventListener('click', function () {
    let alerta = Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llene los campos.',
        })
    let usuario = {}
    usuario.nombre = document.getElementById("user").value;
    usuario.pass = document.getElementById("password").value;

    if (usuario.nombre !== "" && usuario.pass !== "") {
        location.href = "index.html";
    } else {
        alerta;
    };

    let checkbox = document.getElementById('checkbox');

    if (checkbox.checked) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    }
});