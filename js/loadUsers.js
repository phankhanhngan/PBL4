const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
let listUsers = execSync("getent passwd", (err) => {
    if (err) {
        console.log(err);
    }
}).toString().trim().split(/\n/g);
function fetchDataUser() {
    
    let table = document.querySelector("#usersInfoTable");
    let out = "";
    listUsers.forEach(function(line){
        line = line.split(":");
        out +=
            `
        <tr onclick="loadUserDetail('${line[0].toString()}')">
        <td width="25%">${line[0]}</td>
        <td width="75%">${line[4].replaceAll(",","")}</td>
        </tr>
        `
    });
    table.innerHTML = out;
}
function loadUserDetail(index) {
    let table = document.querySelector("#usersDetailInfoTable");
    let out = "";
    listUsers.forEach(function(line){
        line = line.split(":");
        if(line[0] == index){
            out +=
            `
            <tr>
            <td width="25%">User Id</td>
            <td width="75%">${line[2]}</td>
            </tr>
            <tr>
            <td width="25%">Group Id</td>
            <td width="75%">${line[3]}</td>
            </tr>
            <tr>
            <td width="25%">Home Directory</td>
            <td width="75%">${line[5]}</td>
            </tr>
            <tr>
            <td width="25%">Default Shell</td>
            <td width="75%">${line[6]} Mhz</td>
            </tr>
            `;

        }
    });
    table.innerHTML = out;
}

