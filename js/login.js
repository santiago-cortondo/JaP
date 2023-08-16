document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login").addEventListener("click", e => {
        //e.preventDefault();

        const mail = document.getElementById("inputEmail").value;
        const pass = document.getElementById("inputPassword").value;
        const rember = document.getElementById("inputCheck").checked;

        const session = {
            'mail': mail,
            'pass': pass
        };

        //broken, https://stackoverflow.com/questions/36659605/sessionstorage-cleaned-up-unexpectedly-on-android
        //const stor = rember ? localStorage : sessionStorage;
        const stor = localStorage;

        if (mail.length > 0 && pass.length > 0) {
            try {
                stor.setItem("user", JSON.stringify(session));
            } catch (e) {
            }
            location.href = "./index.html";
        } else {//Inalcanzable?, el atributo 'requiered' debería ser verificación suficiente
            Swal.fire("Error!", "Verifique email y contraseña\n(no pueden ser vacios)", "error");
            //alert("Verifique email y contraseña")
        }
    });
});