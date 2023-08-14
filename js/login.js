document.getElementById("login").addEventListener("click", () => {
    const mail = document.getElementById("inputEmail").value;
    const pass = document.getElementById("inputPassword").value;

    alert("1")
    if(mail && pass) {
        alert("2")
        try {
            localStorage.setItem("user",JSON.stringify({'mail':mail, 'pass':pass}));
        } catch(e) {
        }
        window.location = "./index.html";
    }
});