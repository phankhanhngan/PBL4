const { execSync } = require("child_process"); // required module to run shell script

let data = execSync('df -Th', (err) => {
    if (err) {
        console.log(err);
    }
}).toString().trim().split(/\n/g);
console.log(window.password);
function fetchDataFileSystem() {
    var info = {};
    info.filesystem = [];

    data.forEach(function (line) {
        line = line.trim().split(/\s+/);
        if (line.length < 2) {
            return;
        }
        var obj = {
            usage: parseInt(line[5].replace("%", "")),
            device: line[0],
            size: line[2],
            used: line[3],
            mountpoint: line[6]
        }
        if (!obj.device.includes('Filesystem')) {
            info.filesystem.push(obj);
        }
    });

    let table = document.querySelector("#tableFilesystems");
    let out = "";
    for (let filesystemDetail of info.filesystem) {
        out += `
            <tr>
            <td width="50%">
                <div class="progress" style="height: 25px;">
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
    table.innerHTML = out;
}