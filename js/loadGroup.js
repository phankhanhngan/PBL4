const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
let listGroup = execSync("cat /etc/group", (err) => {
    if (err) {
        console.log(err);
    }
}).toString().trim().split(/\n/g);
function fetchDataGroup() {
    let table = document.querySelector("#groupInfoTable");
    let out = "";
    listGroup.forEach(function(line){
        line = line.split(":");
        out +=
            `
        <tr>
        <td width="30%">${line[0]}</td>
        <td width="30%">${line[2]}</td>
        <td >${line[3]}</td>
        </tr>
        `
    });
    table.innerHTML = out;
}


