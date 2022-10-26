const { exec } = require("child_process"); // required module to run shell script
function listCpuInfos(fn) {
    // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file
    exec("lscpu -J > ../txt/cpuInfo.json", (err) => {
        if (err) {
            console.log(err);
        } else {
            let cpuInfo = require('../txt/cpuInfo.json');
            fn(cpuInfo.lscpu);
        }
    });
}
function onLoad()
{  
    exec("lscpu -J > ../txt/cpuInfo.json");
    fetch("../../txt/cpuInfo.json")
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        let table = document.querySelector("#cpuInfoTable");
        let out = "";
        for(let cpuDetail of data.lscpu){
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
