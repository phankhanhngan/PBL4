const fs = require('fs');
const { execSync } = require("child_process"); // required module to run shell script
function  commandToTxtFile() {
    // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file

    execSync('sudo dmidecode -t bios  > ./txt/dmi_bios.txt', (err) => {

        if (err) {
            console.log(err);
        } 
    });

    execSync('sudo dmidecode -t system  > ./txt/dmi_system.txt', (err) => {

        if (err) {
            console.log(err);
        } 
    });

    execSync('sudo dmidecode -t baseboard  > ./txt/dmi_baseboard.txt', (err) => {

        if (err) {
            console.log(err);
        } 
    });

    execSync('sudo dmidecode -t chassis  > ./txt/dmi_chassis.txt', (err) => {

        if (err) {
            console.log(err);
        } 
    });
}
function infoBios() {

    commandToTxtFile();
    var dmi = {};
    dmi.bios = [];
    var data = fs.readFileSync('./txt/dmi_bios.txt').toString();

    data.split(/\n/g).forEach(function(line){
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field : line[0].trim(),
            data : line[1].trim()
        }
        if(!obj.field.includes('Characteristics') && !obj.field.includes('Language'))
        {
            dmi.bios.push(obj); 
        }
    });
    // for (let x in dmi.bios){
    //     console.log(dmi.bios[x].field + ": " + dmi.bios[x].data);
    // }
    return dmi.bios;
}
function infoSystem() {
    commandToTxtFile();
    var dmi = {};
    dmi.system = [];

    var data = fs.readFileSync('./txt/dmi_system.txt').toString();

    data.split(/\n/g).forEach(function(line){
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field : line[0].trim(),
            data : line[1].trim()
        }
        if(!obj.field.includes('Option') && !obj.field.includes('Status') && !obj.field.includes('SKU Number') && !obj.field.includes('UUID'))
        {
            dmi.system.push(obj); 
        }
    });
    // for (let x in dmi.system){
    //     console.log(dmi.system[x].field + ": " + dmi.system[x].data);
    // }
    return dmi.system;
}
function infoBaseboard() {
    commandToTxtFile();
    var dmi = {};
    dmi.board = [];

    var data = fs.readFileSync('./txt/dmi_baseboard.txt').toString();

    data.split(/\n/g).forEach(function(line){
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field : line[0].trim(),
            data : line[1].trim()
        }
        if(!obj.field.includes('Features') 
        && !obj.field.includes('Chassis') 
        && !obj.field.includes('Type') 
        && !obj.field.includes('Contained Object Handles')
        && !obj.field.includes('Status')
        && !obj.field.includes('Description')
        && !obj.field.includes('Reference Designation')
        && !obj.field.includes('Bus Address'))
        {
            dmi.board.push(obj); 
        }
    });
    // for (let x in dmi.board){
    //     console.log(dmi.board[x].field + ": " + dmi.board[x].data);
    // }
    return dmi.board;
}
function infoChassis() {
    commandToTxtFile();
    var dmi = {};
    dmi.chassis = [];

    var data = fs.readFileSync('./txt/dmi_chassis.txt').toString();

    data.split(/\n/g).forEach(function(line){
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field : line[0].trim(),
            data : line[1].trim()
        }
        if(!obj.field.includes('Lock') 
        && !obj.field.includes('Security Status') 
        && !obj.field.includes('OEM Information') 
        && !obj.field.includes('Height')
        && !obj.field.includes('Number Of Power Cords')
        && !obj.field.includes('Contained Elements')
        && !obj.field.includes('SKU Number'))
        {
            dmi.chassis.push(obj); 
        }
    });
    // for (let x in dmi.chassis){
    //     console.log(dmi.chassis[x].field + ": " + dmi.chassis[x].data);
    // }
    return dmi.chassis;
}
function fetchData(){
    let tableBios = document.querySelector("#tableBios");

    let tableProduct = document.querySelector("#tableProducts");
    let tableBoard = document.querySelector("#tableBoard");
    let tableChassis = document.querySelector("#tableChassis");
    let bios = infoBios();
    let board = infoBaseboard();
    let chassis = infoChassis();
    let system = infoSystem();

    let out = "";
    for (let x in bios){
            out += `
            <tr>

            <td width="50%">${bios[x].field}</td>
            <td witdh="50%">${bios[x].data}</td>

            </tr>
            `
    }
    tableBios.innerHTML = out;

    out = "";
    for (let x in system){
            out += `
            <tr>
            <td width="50%">${system[x].field}</td>
            <td witdh="50%">${system[x].data}</td>
            </tr>
            `
    }
    tableProduct.innerHTML = out;
    out = "";
    for (let x in board){
            out += `
            <tr>
            <td width="50%">${board[x].field}</td>
            <td witdh="50%">${board[x].data}</td>
            </tr>
            `
    }
    tableBoard.innerHTML = out;
    out = "";
    for (let x in chassis){
            out += `
            <tr>
            <td width="50%">${chassis[x].field}</td>
            <td witdh="50%">${chassis[x].data}</td>
            </tr>
            `
    }
    tableChassis.innerHTML = out;
    // ko load dc table@@
}
fetchData();
