document.addEventListener("DOMContentLoaded", function () {
    const guardarDatosButton = document.getElementById("guardarDatos");
  
    guardarDatosButton.addEventListener("click", function () {
      // Obténer valores
      const profileName1 = document.getElementById("profilename1").value;
      const profileName2 = document.getElementById("profilename2").value;
      const profileSurname1 = document.getElementById("profilesurname1").value;
      const profileSurname2 = document.getElementById("profilesurname2").value;
      const profileMail = document.getElementById("profilemail").value;
      const profileTel = document.getElementById("profiletel").value;
  
      // Validacion de campos con *
      if (profileName1.trim() === "" || profileSurname1.trim() === "" || profileMail.trim() === "") {
        alert("Los campos marcados con (*) son obligatorios. Completa todos los campos.");
        return;
      }

        // Validacion especifica para correo electronico
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(profileMail)) {
          alert("Por favor, ingresar una dirección de correo electrónico válida.");
          return;
         }
  
      // Creando objeto
      const userData = {
        name1: profileName1,
        name2: profileName2,
        surname1: profileSurname1,
        surname2: profileSurname2,
        email: profileMail,
        tel: profileTel
      };
  
      // Convierte el objeto userData a cadena JSON
      const userDataJSON = JSON.stringify(userData);
  
      // Almacena en el almacenamiento local
      localStorage.setItem("userData", userDataJSON);
  
      // Notifica al usuario 
      alert("Los datos se han guardado con éxito en el almacenamiento local.");
    });
  });