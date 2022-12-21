const { execSync } = require("child_process"); // required module to run shell script

let data = execSync('lspci', (err) => {
    if (err) {
        console.log(err);
    }
}).toString().trim().split(/\n/g);

function fetchDataPci() {
    var info = {
        pci: []
    };

    data.forEach(function (line) {
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field: line[1].trim().split(' ')[1] + ' ' + line[1].trim().split(' ')[2],
            data: line[2].trim()
        }

        info.pci.push(obj);

    });

    let table = document.querySelector("#pciTable");
    let out = "";
    for (let pciDetails of info.pci) {
        out += `
            <tr>
            <td width="30%">${pciDetails.field}</td>
            <td witdh="70%">${pciDetails.data}</td>
            </tr>
            `
    }
    table.innerHTML = out;
}

