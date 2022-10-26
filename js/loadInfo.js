/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { execSync } = require("child_process"); // required module to run shell script

// const fs = require("fs");
function listCpuInfos() {
  // run command to get all row in lscpu to json file and overwrite it to folder
  // txt\ and return that json file
  execSync("lscpu -J > ./txt/cpuInfo.json", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function fetchData() {
  listCpuInfos();
  fetch("../../txt/cpuInfo.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let table = document.querySelector("#cpuInfoTable");
      let out = "";
      for (let cpuDetail of data.lscpu) {
        out += `
             <tr>
             <td width="30%">${cpuDetail.field}</td>
             <td witdh="70%">${cpuDetail.data}</td>
             </tr>
             `;
      }
      table.innerHTML = out;
    });
}
