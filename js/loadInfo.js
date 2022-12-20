const { execSync } = require("child_process"); // required module to run shell script

let data = execSync("lscpu -J", (err) => {
    if (err) {
        console.log(err);
    }
}).toString().trim().split(/\n/g);

function fetchData() {
    let table = document.querySelector("#cpuInfoTable");
    let out = "";
    data.shift();
    data.shift();
    data.forEach(line => {
        line = line.replaceAll(":", "").split("\"");
        out +=
            `
        <tr>
        <td width="30%">${line[3]}</td>
        <td width="70%">${line[7]}</td>
        </tr>
        `
    })
    table.innerHTML = out;
}
