document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login").addEventListener("click", e => {
        //e.preventDefault();

        const rember = document.getElementById("inputCheck").checked;

        const mail = document.getElementById("inputEmail").value;
        const pass = document.getElementById("inputPassword").value;

        if (mail.length > 0 && pass.length > 0) {
            try {
                if(rember)
                    localStorage.setItem("user", JSON.stringify({ 'mail': mail, 'pass': pass }));
                else
                    sessionStorage.setItem("user", JSON.stringify({ 'mail': mail, 'pass': pass }));
            } catch (e) {
            }
            location.href = "./index.html";
        } else {//inalcanzable, el atributo 'requiered' es verificacion suficiente
            Swal.fire("Error!", "Verifique email y contraseña", "error");
            //alert("Verifique email y contraseña")
        }
    });
});