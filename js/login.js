document.getElementById('boton').addEventListener('click', function () {
    let usuario = {}
    usuario.email = document.getElementById("email").value;
    usuario.pass = document.getElementById("password").value;

    if (usuario.email !== "" && usuario.pass !== "") {
        location.href = "index.html";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, llene los campos.',
        });
    };

    let checkbox = document.getElementById('checkbox');

    if (checkbox.checked) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    }
});