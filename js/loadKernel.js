const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
const { type } = require("os");
let listKernel = execSync("lsmod", (err) => {
    if (err) {
        console.log(err);
    }
}).toString().trim().split(/\n/g);
function fetchDataKernel() {
    let table = document.querySelector("#kernelTable");
    let out = "";
    listKernel.forEach(function(line){
        line = line.split(/\s+/);
        if(line[0]!="Module"){
            out +=
            `<tr onclick="loadKernelDetail('${line[0]}')">
                <td>${line[0]}</td>
                <td>${line[1]}</td>
                <td>${line[2]}</td>
            </tr>`
        }
    });
    table.innerHTML = out;
}
function getUsedBy(line){
    let out="";
    for(let i = 2; i < line.length;i++){
        out+=line[i];
    }
    return out.trim();
}
function loadKernelDetail(module){
    let table = document.querySelector("#kernelDetailTable");
    let out = "";
    listKernel.forEach(function(line){
        line = line.split(/\s+/);
        if(line[0]!="Module"){
            if(line[0] == module){
                if(typeof line[3] =="undefined"){
                    out =
                    `<tr>
                    <td>No used</td>
                    </tr>`
                }
                else{

                    detail = line[3].split(",");
                    for(let i =0;i<detail.length;i++){
                        out +=
                        `<tr>
                        <td>${detail[i]}</td>
                        </tr>`
                    }
                }
            }
        }
    });
    table.innerHTML = out;
}


