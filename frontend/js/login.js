// Se obtienen los elementos del registro
const userLogin = document.getElementById('login-mail');
const userPass = document.getElementById('login-password');
let registerBtn = document.getElementById('RegisterBtn');
let loginBtn = document.getElementById('loginBtn');

// Evento para el botón de registro
registerBtn.addEventListener('click', async () => {
    let usuario = {
        profile: document.getElementById('register-name').value,
        email: document.getElementById('register-mail').value,
        pass: document.getElementById('register-password').value
    };

    if (usuario.email !== '' && usuario.pass !== '' && usuario.profile !== '') {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    // Muestra una alerta de registro exitoso
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'Espera mientras cargamos tus datos.'
                    });
                    if (checkbox.checked) {
                        localStorage.setItem('usuario', JSON.stringify(usuario));
                    } else {
                        sessionStorage.setItem('usuario', JSON.stringify(usuario));
                    }
                    // Redirige a index.html después de un retraso
                    setTimeout(() => {
                        location.href = 'index.html';
                    }, 2000);
                } else {
                    // Muestra un mensaje de error si no se recibe el token
                    Swal.fire("Error!", "El token no se recibió correctamente", "error");
                }
            } else {
                const errorMensaje = await response.json();
                // Muestra un mensaje de error del servidor
                Swal.fire("Error!", errorMensaje.mensaje, "error");
            }
        } catch (error) {
            console.error('Error:', error);
            // Muestra un mensaje de error en caso de un fallo en la solicitud
            Swal.fire("Error!", "Ocurrió un error al querer iniciar sesión", "error");
        }
    } else {
        // Muestra un mensaje de error si algún campo requerido está vacío
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, llene los campos.',
        });
    }
});


// Evento para la presentación del formulario de inicio de sesión
document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();

    // Se obtienen los valores del formulario de inicio de sesión
    let username = userLogin.value;
    let password = userPass.value;

    // Obtiene la información del usuario almacenada en localStorage o sessionStorage
    let storedUser = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');

    // Verifica si existe la información de usuario almacenada
    if (storedUser) {

        let parsedUser = JSON.parse(storedUser);

        // Verifica si el nombre de usuario y la contraseña ingresados coinciden con la información de usuario almacenada en el JSON
        if (parsedUser.email == username && parsedUser.pass == password) {
            // Se muestra un mensaje de éxito para el inicio de sesión exitoso
            Swal.fire({
                icon: 'success',
                title: 'Iniciando Sesión',
                text: 'Espera mientras cargamos tus datos.'
            });

            // Redirige a index.html después de un retraso
            setTimeout(() => {
                location.href = 'index.html';
            }, 2000);
        } else {
            // Muestra un mensaje de error si las credenciales ingresadas no coinciden
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario no está registrado.'
            });
        }
    } else {
        // Muestra un mensaje de error si no existen los datos ingresados
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay usuarios registrados.'
        });
    }
});

// Se obtienen los formularios de inicio de sesión y registro
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('registro');

// Función para mostrar el formulario de registro y ocultar el formulario de inicio de sesión
function mostrarRegistro() {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
}

// Función para mostrar el formulario de inicio de sesión y ocultar el formulario de registro
function mostrarLogin() {
    // Limpia los valores de los campos del formulario de registro
    document.getElementById('register-mail').value = '';
    document.getElementById('register-password').value = '';

    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}