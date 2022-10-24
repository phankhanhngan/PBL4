// const { exec } = require("child_process"); // required module to run shell script
// const { table } = require("console");

// function listCpuInfos(fn) {
//     // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file
//     exec("lscpu -J > ../txt/cpuInfo.json", (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             let cpuInfo = require('../txt/cpuInfo.json');
//             fn(cpuInfo.lscpu);
//         }
//     });
// }

// listCpuInfos( (listCpuInfo) => {
//     // use info here
// });

