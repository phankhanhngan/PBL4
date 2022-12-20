const { execSync } = require("child_process"); // required module to run shell script

const field = ["vendor", "model", "state", "energy", "voltage", "time to full", "time to empty", "percentage", "capacity", "technology"];

let data = execSync('upower -i $(upower -e | grep "BAT")', (err) => {
    if (err) {
        console.log(err);
    }
}).toString().trim().split(/\n/g);

function fetchDataBattery() {
    var info = {
        battery: []
    };

    data.forEach(function (line) {
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field: line[0].trim(),
            data: line[1].trim()
        }
        if (field.some(fieldValue => obj.field.includes(fieldValue))) {
            info.battery.push(obj);
        }
    });

    let table = document.querySelector("#batteryTable");
    let out = "";
    for (let batteryDetails of info.battery) {
        out += `
            <tr>
            <td width="30%">${batteryDetails.field}</td>

            <td witdh="70%">${batteryDetails.data}</td>
            </tr>
            `
    }
    table.innerHTML = out;
}