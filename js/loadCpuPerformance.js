const { execSync, ChildProcess } = require("child_process"); // required module to run shell script

function fetchCPUPerformance() {
    let table = document.querySelector("#cpuPerformanceTable");
    let out = "";
    table.innerHTML = "";

    let cpuPerformance = execSync(`top -b -n 1 -o %MEM| awk \'/^top -/{time = $3} $1+0>0 {printf "%-8s %-8s %-8s %-8s %-8s%%\\n", \ $1,$2,$9,$10,$12 }'`, (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().trim().split(/\n/g).forEach(function (line) {
        line = line.trim().split(/\s+/)
        out += `
             <tr onmousedown="showContextMenu(event, ${line[0]})">
             <td width="10%">${line[0]}</td>
             <td width="20%">${line[1]}</td>
             <td width="20%">${line[2]} %</td>
             <td width="20%">${line[3]} %</td>
             <td width="30%">${line[4]}</td>
             </tr>
             `
    });
    table.innerHTML = out;
}

setInterval(function () {
    fetchCPUPerformance();
}, 3000);

const showContextMenu = (e, pid) => {
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
            console.log(menu.style);
            menu.style.left = e.pageX + "px";
            menu.style.top = e.pageY + "px";

            
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
    // hideMenu();
    
}

function stopProcess() {

}
document.getElementById("killProcess").addEventListener("onclick", function(){
    alert("aaa");
});