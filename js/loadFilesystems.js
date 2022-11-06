const fs = require('fs');
const { execSync } = require("child_process"); // required module to run shell script
function  commandToTxtFile() {
    // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file
    let a = execSync('sudo df -Th  > ./txt/filesystems.txt', (err) => {
        if (err) {
            console.log(err);
        } 
    });   
}
function fetchDataFileSystem() {
    commandToTxtFile();
    var info = {};
    info.filesystem = [];
    // info empty to json
    var data = fs.readFileSync('./txt/filesystems.txt').toString();
    data.split(/\n/g).forEach(function(line){
        line = line.trim().split(/\s+/);
        if (line.length < 2) {
            return;
        }
        var obj = {
            usage : parseInt(line[5].replace("%", "")),
            device : line[0],
            size : line[2],
            used : line[3],
            mountpoint : line[6]
        }
        if(!obj.device.includes('Filesystem')){
            info.filesystem.push(obj);
        }
    });
    let table = document.querySelector("#tableFilesystems");
    let out = "";
    for(let filesystemDetail of info.filesystem){
            out += `
            <tr>
            <td width="50%">
                <div class="progress">
                    <div class="progress-bar progress-bar-galaxy" role="progressbar" aria-valuenow="${filesystemDetail.usage}"
                    aria-valuemin="0" aria-valuemax="100" style="width:${filesystemDetail.usage}%">
                        ${filesystemDetail.usage}% (${filesystemDetail.used} of ${filesystemDetail.size})
                    </div>
                </div>
            </td>
            <td>${filesystemDetail.device}</td>
            <td width="25%">${filesystemDetail.mountpoint}</td>
            </tr>
            `
        }
    console.log(out);
    table.innerHTML=out;
    }
    fetchDataFileSystem();