const fs = require('fs');
const { execSync } = require("child_process"); // required module to run shell script
var condition = true;
var count =0;
function breakLoop(){
    condition = false;
}
 // const fs = require("fs");
 function  listMemoryInfos() {
    // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file
    execSync('cat /proc/meminfo| grep "Mem"  > ../txt/memInfo.txt', (err) => {
        if (err) {
            console.log(err);
        } 
    });
}
function convertJson(){

}
function fetchData(){
    // while(count < 100000){
    //     setTimeout(function() {
    //         info();
            
    //      },500*count*10);
    //     count+= 0.1;
    // }
    fetch("../../txt/memInfo.json")
     .then(function(res){
         return res.json();
     })
     .then(function(data){
         let table = document.querySelector("#memInfoTable");
         let out = "";
         for(let cpuDetail of data.memory){
             out += `
             <tr>
             <td width="30%">${cpuDetail.field}</td>
             <td witdh="70%">${cpuDetail.data}</td>
             </tr>
             `
         }
         table.innerHTML=out;
     });
}
function info() {
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
    fs.writeFile ("../txt/memInfo.json", JSON.stringify(info), function(err) {
        if (err) throw err;
        }
    );
}
fetchData();
