const fs = require('fs');
const { execSync } = require("child_process"); // required module to run shell script
function  commandToTxtFile() {
    // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file
    execSync('lspci  > ../txt/pci.txt', (err) => {
        if (err) {
            console.log(err);
        } 
    });
}
function info() {
    commandToTxtFile();
    var info = {};
    info.pci = [];
    // info empty to json
    var data = fs.readFileSync('../txt/pci.txt').toString();
    data.split(/\n/g).forEach(function(line){
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field : line[1].trim().split(' ')[1] + ' ' + line[1].trim().split(' ')[2],
            data : line[2].trim()
        }
        
        info.pci.push(obj);
        
    });
    for(let x in info.pci){
            console.log(info.pci[x].field + ": " + info.pci[x].data);
    }
}
info();