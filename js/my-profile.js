document.addEventListener("DOMContentLoaded", function () {
    const guardarDatosButton = document.getElementById("guardarDatos");
    const profileTelInput = document.getElementById("profiletel"); // Debe ser colocado afuera de guardarDatosButton porque de lo contrario no se puede escuchar el evento input.

    guardarDatosButton.addEventListener("click", function () {
        // Obténer valores
        const profileName1 = document.getElementById("profilename1").value;
        const profileName2 = document.getElementById("profilename2").value;
        const profileSurname1 = document.getElementById("profilesurname1").value;
        const profileSurname2 = document.getElementById("profilesurname2").value;
        const profileMail = document.getElementById("profilemail").value;

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

        // Restringir el campo de teléfono a números
        const profileTel = profileTelInput.value.replace(/[^0-9+]/g, ""); // Elimina todo lo que no sea un número

        // Actualiza el valor en el campo de teléfono
        profileTelInput.value = profileTel;

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

        // Notifica al usuario que los datos se han guardado con éxito
        alert("Los datos se han guardado con éxito en el almacenamiento local.");
    });
        // Escucha el evento input en el campo de teléfono para evitar caracteres no numéricos
        profileTelInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9+]/g, ""); // Permite números y el carácter "+", elimina todo lo demás
    });
});