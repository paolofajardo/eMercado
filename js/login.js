// Obtener referencias a elementos HTML utilizando sus IDs
const userLogin = document.getElementById('login-mail');
const userPass = document.getElementById('login-password');
let registerBtn = document.getElementById('RegisterBtn');
let loginBtn = document.getElementById('loginBtn');

// Evento para el botón de registro
registerBtn.addEventListener('click', () => {
    // Crear un objeto vacío para almacenar la información del usuario
    let usuario = {};

    // Obtener valores del formulario de registro y asignarlos al objeto de usuario
    usuario.profilename = document.getElementById('register-name').value;
    usuario.email = document.getElementById('register-mail').value;
    usuario.pass = document.getElementById('register-password').value;

    // Se obtiene el botón 
    let checkbox = document.getElementById('checkbox');

    // Verifica si todos los campos requeridos están llenos
    if (usuario.email !== '' && usuario.pass !== '' && usuario.profilename !== '') {
        // Mostrar un mensaje de éxito utilizando la biblioteca SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Espera mientras cargamos tus datos.'
        });

        // Redirigir a index.html después de un retraso
        setTimeout(() => {
            location.href = 'index.html';
        }, 2000);

        // Se almacena la información del usuario en localStorage o sessionStorage según el estado de la casilla de verificación
        if (checkbox.checked) {
            localStorage.setItem('usuario', JSON.stringify(usuario));
        } else {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
        }
    } else {
        // Mostrar un mensaje de error si algún campo requerido está vacío
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

    // Obtener valores del formulario de inicio de sesión
    let username = userLogin.value;
    let password = userPass.value;

    // Obtener información de usuario almacenada en localStorage o sessionStorage
    let storedUser = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');

    // Verificar si existe información de usuario almacenada
    if (storedUser) {
        // Analizar la información de usuario almacenada desde JSON
        let parsedUser = JSON.parse(storedUser);

        // Verificar si el nombre de usuario y la contraseña ingresados coinciden con la información de usuario almacenada
        if (parsedUser.email == username && parsedUser.pass == password) {
            // Mostrar un mensaje de éxito para el inicio de sesión exitoso
            Swal.fire({
                icon: 'success',
                title: 'Iniciando Sesión',
                text: 'Espera mientras cargamos tus datos.'
            });

            // Redirigir a index.html después de un retraso
            setTimeout(() => {
                location.href = 'index.html';
            }, 2000);
        } else {
            // Mostrar un mensaje de error si las credenciales ingresadas no coinciden
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario no está registrado.'
            });
        }
    } else {
        // Mostrar un mensaje de error si no hay usuarios registrados
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay usuarios registrados.'
        });
    }
});

// Obtener referencias a los elementos de los formularios de inicio de sesión y registro
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('registro');

// Función para mostrar el formulario de registro y ocultar el formulario de inicio de sesión
function mostrarRegistro() {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
}

// Función para mostrar el formulario de inicio de sesión y ocultar el formulario de registro
function mostrarLogin() {
    // Limpiar los valores de los campos del formulario de registro
    document.getElementById('register-mail').value = '';
    document.getElementById('register-password').value = '';

    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}
