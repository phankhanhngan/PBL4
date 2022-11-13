const { execSync, ChildProcess } = require("child_process"); // required module to run shell script

function getListCpuFrequency() {
    var info = {};
    info.cpuFre = [];
    execSync("cat /proc/cpuinfo | egrep 'cpu MHz'", (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().trim().split(/\n/g).forEach(function (line) {
        line = line.split(":");
        var obj = {
            fre: parseInt(line[1].trim())
        }
        info.cpuFre.push(obj);
    });
    return info;
}
console.log(getListCpuFrequency().cpuFre[0].fre);