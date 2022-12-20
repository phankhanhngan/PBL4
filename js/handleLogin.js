const { execSync } = require("child_process"); // required module to run shell script


let handleLogin = (button) => {
    let password = document.getElementById("password").value;
    let response = execSync(`echo ${password} | if su -c true "$USER"; then echo "Correct"; fi`, (err) => {
        console.log(err);
    }).toString();
    if (response.includes("Correct")) {
        window.location.href = "index.html";
        execSync(`echo '${password}' | sudo -S -i`, (err) => { });
    } else {
        alert("Wrong Password");
    }
}