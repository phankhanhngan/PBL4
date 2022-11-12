const fs = require('fs');
const { execSync } = require("child_process"); // required module to run shell script
const field = ["vendor", "model", "state", "energy", "voltage", "time to full", "time to empty", "percentage", "capacity", "technology"];
function  commandToTxtFile() {
    // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file

    let a = execSync('upower -i $(upower -e | grep "BAT")  > ./txt/battery.txt', (err) => {

        if (err) {
            console.log(err);
        } 
    });   
}
function fetchDataBattery() {
    commandToTxtFile();
    var info = {};
    info.battery = [];
    // info empty to json

    var data = fs.readFileSync('./txt/battery.txt').toString();

    data.split(/\n/g).forEach(function(line){
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field : line[0].trim(),
            data : line[1].trim()
        }
        if(field.some(fieldValue => obj.field.includes(fieldValue))){
            info.battery.push(obj);
        }
    });
    let table = document.querySelector("#batteryTable");
    let out = "";
    for(let batteryDetails of info.battery){
            out += `
            <tr>
            <td width="30%">${batteryDetails.field}</td>

            <td witdh="70%">${batteryDetails.data}</td>
            </tr>
            `
        }
    table.innerHTML=out;
    }
fetchDataBattery();

