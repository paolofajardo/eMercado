const userLogin = document.getElementById('login-mail');
const userPass = document.getElementById('login-password');
let registerBtn = document.getElementById('RegisterBtn');
let loginBtn = document.getElementById('loginBtn');
      
      
      
  registerBtn.addEventListener('click', () => {
        let usuario = {};
        usuario.email = document.getElementById('register-mail').value;
        usuario.pass = document.getElementById('register-password').value;
        let checkbox = document.getElementById('checkbox');
        if (usuario.email !== '' && usuario.pass !== '') {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Espera mientras cargamos tus datos.'
          });
          setTimeout(()=>{location.href = 'index.html';},2000)
          
          if (checkbox.checked) {
            localStorage.setItem('usuario', JSON.stringify(usuario));
          } else {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, llene los campos.',
          });
        }
     });
     
     document.getElementById('form-login').addEventListener('submit', (e) => {
      e.preventDefault();
    
      let username = userLogin.value;
      let password = userPass.value;
      let storedUser = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
    
      if (storedUser) {
        let parsedUser = JSON.parse(storedUser);
        if (parsedUser.email == username && parsedUser.pass == password) {
          Swal.fire({
            icon: 'success',
            title: 'Iniciando Sesión',
            text: 'Espera mientras cargamos tus datos.'
          });
          setTimeout(() => {
            location.href = 'index.html';
          }, 2000);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario no está registrado.'
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No hay usuarios registrados.'
        });
      }
    });
  
    
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('registro');
  
    function mostrarRegistro() {
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
    }
  
    function mostrarLogin() {
      document.getElementById('register-mail').value = '';
      document.getElementById('register-password').value = '';
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    }
  
  



    