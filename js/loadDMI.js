const { execSync } = require("child_process"); // required module to run shell script

const password = localStorage.getItem("password");

let bios = execSync(`echo ${password}| sudo -S dmidecode -t bios`, (err) => {
    if (err) {
        console.log(err);
    }
}).toString();

let system = execSync(`echo ${password}| sudo -S dmidecode -t system`, (err) => {

    if (err) {
        console.log(err);
    }
}).toString();

let baseboard = execSync(`echo ${password} | sudo  -S dmidecode -t baseboard`, (err) => {

    if (err) {
        console.log(err);
    }
}).toString();

let chassis = execSync(`echo ${password} | sudo  -S dmidecode -t chassis`, (err) => {

    if (err) {
        console.log(err);
    }
}).toString();
function infoBios() {
    var dmi = {};
    dmi.bios = [];
    bios.split(/\n/g).forEach(function (line) {
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field: line[0].trim(),
            data: line[1].trim()
        }
        if (!obj.field.includes('Characteristics') && !obj.field.includes('Language')) {
            dmi.bios.push(obj);
        }
    });
    return dmi.bios;
}
function infoSystem() {
    var dmi = {};
    dmi.system = [];
    system.split(/\n/g).forEach(function (line) {
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field: line[0].trim(),
            data: line[1].trim()
        }
        if (!obj.field.includes('Option') && !obj.field.includes('Status') && !obj.field.includes('SKU Number') && !obj.field.includes('UUID')) {
            dmi.system.push(obj);
        }
    });
    return dmi.system;
}
function infoBaseboard() {
    var dmi = {};
    dmi.board = [];
    baseboard.split(/\n/g).forEach(function (line) {
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field: line[0].trim(),
            data: line[1].trim()
        }
        if (!obj.field.includes('Features')
            && !obj.field.includes('Chassis')
            && !obj.field.includes('Type')
            && !obj.field.includes('Contained Object Handles')
            && !obj.field.includes('Status')
            && !obj.field.includes('Description')
            && !obj.field.includes('Reference Designation')
            && !obj.field.includes('Bus Address')) {
            dmi.board.push(obj);
        }
    });
    return dmi.board;
}
function infoChassis() {
    var dmi = {};
    dmi.chassis = [];
    chassis.split(/\n/g).forEach(function (line) {
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field: line[0].trim(),
            data: line[1].trim()
        }
        if (!obj.field.includes('Lock')
            && !obj.field.includes('Security Status')
            && !obj.field.includes('OEM Information')
            && !obj.field.includes('Height')
            && !obj.field.includes('Number Of Power Cords')
            && !obj.field.includes('Contained Elements')
            && !obj.field.includes('SKU Number')) {
            dmi.chassis.push(obj);
        }
    });
    return dmi.chassis;
}
function fetchData() {
    let biosTable = document.querySelector("#biosTable");
    let tableProduct = document.querySelector("#tableProducts");
    let tableBoard = document.querySelector("#tableBoard");
    let tableChassis = document.querySelector("#tableChassis");
    let bios = infoBios();
    let board = infoBaseboard();
    let chassis = infoChassis();
    let system = infoSystem();

    let out = "";
    for (let x in bios) {
        out += `
            <tr>

            <td width="50%">${bios[x].field}</td>
            <td witdh="50%">${bios[x].data}</td>

            </tr>
            `
    }
    biosTable.innerHTML = out;
    out = "";
    for (let x in system) {
        out += `
            <tr>
            <td width="50%">${system[x].field}</td>
            <td witdh="50%">${system[x].data}</td>
            </tr>
            `
    }
    tableProduct.innerHTML = out;
    out = "";
    for (let x in board) {
        out += `
            <tr>
            <td width="50%">${board[x].field}</td>
            <td witdh="50%">${board[x].data}</td>
            </tr>
            `
    }
    tableBoard.innerHTML = out;
    out = "";
    for (let x in chassis) {
        out += `
            <tr>
            <td width="50%">${chassis[x].field}</td>
            <td witdh="50%">${chassis[x].data}</td>
            </tr>
            `
    }
    tableChassis.innerHTML = out;
    var coll = document.getElementsByClassName("collapsible_button");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].click();
    }
}
