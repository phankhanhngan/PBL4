const { execSync } = require("child_process"); // required module to run shell script
const fs = require('fs');
let outAudio = "";
let outDevice = "";
processor = execSync("lscpu | grep 'Model name'", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().split(":")[1].trim();
memory = execSync("cat /proc/meminfo | grep 'MemTotal'", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().split(":")[1].trim();
machine_type = execSync("sudo dmidecode -t chassis | grep 'Type'", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().split(":")[1].trim();
operating_system = execSync("lsb_release -d", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().split(":")[1].trim();
user_name = execSync("whoami", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().trim();
listDisplayInfo = execSync("xdpyinfo | egrep 'resolution|dimensions|vendor string'", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().split(/\n/g);
resolution =listDisplayInfo[1].split(":")[1].trim();
display_vendor = listDisplayInfo[0].split(":")[1].trim();
openGl_renderer = execSync("glxinfo | grep 'OpenGL renderer string'", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().split(":")[1].trim();
listAudioDevices = execSync("cat /proc/asound/cards", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().split(/\n/g).forEach(function(line){
    line = line.split(":");
    if (line.length < 2) {
        return;
    }
    outAudio += `
    <tr>
    <td width="50%">Audio Adapter</td>
    <td witdh="50%">${line[1].trim()}</td>
    </tr>
    `
});
list_input_devices = execSync("cat /proc/bus/input/devices  | egrep 'N: Name'", (err) => {
    if (err) {
        console.log(err);
    } 
}).toString().split(/\n/g).forEach(function(line){
    line = line.split('"');
    if (line.length < 2) {
        return;
    }
    outDevice +=
    `
    <tr>
    <td>${line[1].replace('"','').trim()}</td>
    </tr>
    `;
});
function fetchData(){
    let tableComputer = document.querySelector("#tableComputer");
    let tableDisplay = document.querySelector("#tableDisplay");
    let tableAudio = document.querySelector("#tableAudioDevices");
    let tableInput = document.querySelector("#tableInputDevice");
    let tablePrinter = document.querySelector("#tablePrinters");
    let out = 
    `
    <tr>
    <td width="50%">Processor</td>
    <td witdh="50%">${processor}</td>
    </tr>
    <tr>
    <td width="50%">Memory</td>
    <td witdh="50%">${memory}</td>
    </tr>
    <tr>
    <td width="50%">Machine Type</td>
    <td witdh="50%">${machine_type}</td>
    </tr>
    <tr>
    <td width="50%">Operating Systems</td>
    <td witdh="50%">${operating_system}</td>
    </tr>
    <tr>
    <td width="50%">User Name</td>
    <td witdh="50%">${user_name}</td>
    </tr>
    `;
    tableComputer.innerHTML = out;
    out = 
    `
    <tr>
    <td width="50%">Resolution</td>
    <td witdh="50%">${resolution}</td>
    </tr>
    <tr>
    <td width="50%">Vendor</td>
    <td witdh="50%">${display_vendor}</td>
    </tr>
    <tr>
    <td width="50%">OpenGL Renderer</td>
    <td witdh="50%">${openGl_renderer}</td>
    </tr>
    `
    tableDisplay.innerHTML = out;
    tableAudio.innerHTML = outAudio;
    tableInput.innerHTML = outDevice;

    var coll = document.getElementsByClassName("collapsible_button");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].click();
    }
}


