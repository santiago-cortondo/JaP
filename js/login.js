document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login").addEventListener("click", () => {
        const mail = document.getElementById("inputEmail").value;
        const pass = document.getElementById("inputPassword").value;

        if (mail.length > 0 && pass.length > 0) {
            try {
                localStorage.setItem("user", JSON.stringify({ 'mail': mail, 'pass': pass }));
            } catch (e) {
            }
            location.href = "./index.html";
        }
    });
});