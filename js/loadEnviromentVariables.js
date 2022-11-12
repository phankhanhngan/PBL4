const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
let listEnv = execSync("env", (err) => {
    if (err) {
        console.log(err);
    }
}).toString().trim().split(/\n/g);
function fetchDataEnv() {
    let table = document.querySelector("#envVariableTable");
    let out = "";
    listEnv.forEach(function(line){
        line = line.split("=");
        out +=
            `
        <tr>
        <td width="25%">${line[0]}</td>
        <td width="75%">${line[1]}</td>
        </tr>
        `
    });
    table.innerHTML = out;
}


