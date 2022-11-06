const fs = require('fs');
const { execSync } = require("child_process"); // required module to run shell script
//const { isStringObject } = require('util/types');
var condition = true;
var count =0;
function breakLoop(){
    condition = false;
}
//  // const fs = require("fs");
//  function  listMemoryInfos() {
//     // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file
//     execSync('cat /proc/meminfo| grep "Mem"  > ./txt/memInfo.txt', (err) => {
//         if (err) {
//             console.log(err);
//         } 
//     });
// }
setInterval(function() {
    fetchDataMemory();
}, 1000);
function fetchDataMemory() {
    var info = {};
    info.memory = [];
    // info empty to json
    var data = fs.readFileSync('/proc/meminfo').toString();
    data.split(/\n/g).forEach(function(line){
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        var obj = {
            field : line[0],
            data : parseInt(line[1].trim(), 10)
        }
        info.memory.push(obj);
    });
    let table = document.querySelector("#memInfoTable");
    table.innerHTML="";
    let out = "";
    for(let memDetail of info.memory){
        out += `
            <tr>
             <td width="30%" >${memDetail.field}</td>
             <td witdh="70%" >${memDetail.data} kB</td>
             </tr>
             `
         }
         console.log(out);
    table.innerHTML=out;
}