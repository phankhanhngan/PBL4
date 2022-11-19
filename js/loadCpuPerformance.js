const { execSync, ChildProcess } = require("child_process"); // required module to run shell script

function fetchCPUPerformance() {
    let table = document.querySelector("#cpuPerformanceTable");
    let out = "";
    table.innerHTML = "";

    let cpuPerformance = execSync(`top -b -n 1 -o %MEM| awk \'/^top -/{time = $3} $1+0>0 {printf "%-8s %-8s %-8s %-8s %-8s %-8s%%\\n", \ $1,$2,$8,$9,$10,$12 }'`, (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().trim().split(/\n/g).forEach(function (line) {
        line = line.trim().split(/\s+/)
        out += `
             <tr id="${line[0]}" onmousedown="showContextMenu(event, ${line[0]})">
             <td width="10%">${line[0]}</td>
             <td width="20%">${line[1]}</td>
             <td class="${line[2]}" width="20%">${line[2]}</td>
             <td width="20%">${line[3]} %</td>
             <td width="20%">${line[4]} %</td>
             <td width="30%">${line[5]}</td>
             </tr>
             `
    });
    table.innerHTML = out;
    var statusCol = document.querySelectorAll(".T");
    statusCol.forEach(el => {
        el.parentElement.style.backgroundColor = "#bdc00f";
        el.style.color = "#fff";
    });
}

setInterval(function () {
    fetchCPUPerformance();
}, 5000);

const showContextMenu = (e, pid) => {
    document.getElementById(pid).style.backgroundColor = "#fc7c32";
    console.log(document.getElementById(pid));
    if(e.which == "1") hideMenu();
    else if (e.which == "3") {
        e.preventDefault();

        if (document.getElementById(
            "contextMenu").style.display == "block") {
                hideMenu();
            }
        else {
            var menu = document
                .getElementById("contextMenu")
            menu.style.display = 'block';
            menu.style.left = e.pageX + "px";
            menu.style.top = e.pageY + "px";
            var kill = document.getElementById("killProcess");
            kill.setAttribute("onclick", `killProcess(${pid})`);
            var stop = document.getElementById("stopProcess");
            stop.setAttribute("onclick", `stopProcess(${pid})`);
            var resume = document.getElementById("resumeProcess");
            resume.setAttribute("onclick", `resumeProcess(${pid})`);
        }
    }
}



function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none"
}

function killProcess(pid) {
    execSync(`kill -9 ${pid}`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    hideMenu();
}

function stopProcess(pid) {
    execSync(`kill -STOP ${pid}`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    hideMenu();
    document.getElementById(pid).style.backgroundColor = "#bdc00f";
}

function resumeProcess(pid) {
    execSync(`kill -CONT ${pid}`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    hideMenu();
    document.getElementById(pid).style.backgroundColor = "none";
}
