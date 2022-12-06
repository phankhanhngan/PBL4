const { execSync, ChildProcess } = require("child_process"); // required module to run shell script

let command = `top -b -n 1| awk \'/^top -/{time = $3} $1+0>0 {printf "%-8s %-8s %-8s %-8s %-8s %-8s%%\\n", \ $1,$2,$8,$9,$10,$12 }'`;

window.onload = function () {
    fetchHead();
    fetchProcesses();
    setInterval(fetchProcesses, 5000);
    setInterval(fetchHead, 3000);
};

function fetchHead() {
    let headLine = new Array();
    let headTable = document.querySelector("#cpuPerformanceHead");
    let outHead = "";
    headTable.innerHTML = "";

    //Get head of top command
    execSync(`top -b -n 1 | head -n 5 | awk '{printf "%-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s %-8s \\n", $1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17}'`, (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().trim().split(/\n/g).forEach((line) => {
        line = line.trim().split(/\s+/);
        headLine.push(line);
    });
    
    outHead+=`
        <tr>
            <td>${headLine[0][0]}</td>
            <td>${headLine[0][2] + ' ' + headLine[0][3] + ' ' + headLine[0][4] + ' ' + headLine[0][5].replace(',','')}</td>
            <td>${headLine[0][6] + ' ' + headLine[0][7].replace(',','') }</td>
            <td>${headLine[0][8] + ' ' + headLine[0][9] }</td>
            <td>${ headLine[0][10]}</td>
            <td>${ headLine[0][11] }</td>
            <td>${headLine[0][12]}</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>${headLine[1][0]}</td>
            <td>${headLine[1][1] + ' ' + headLine[1][2].replace(',','')}</td>
            <td>${headLine[1][3] + ' ' + headLine[1][4].replace(',','')}</td>
            <td>${headLine[1][5] + ' ' + headLine[1][6].replace(',','')}</td>
            <td>${headLine[1][7] + ' ' + headLine[1][8].replace(',','')}</td>
            <td>${headLine[1][9] + ' ' + headLine[1][10].replace(',','')}</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>${headLine[2][0]}</td>
            <td >${headLine[2][1] + ' ' + headLine[2][2].replace(',','')}</td>
            <td >${headLine[2][3] + ' ' + headLine[2][4].replace(',','')}</td>
            <td >${headLine[2][5] + ' ' + headLine[2][6].replace(',','')}</td>
            <td >${headLine[2][7] + ' ' + headLine[2][8].replace(',','')}</td>
            <td >${headLine[2][9] + ' ' + headLine[2][10].replace(',','')}</td>
            <td >${headLine[2][11] + ' ' + headLine[2][12].replace(',','')}</td>
            <td >${headLine[2][13] + ' ' + headLine[2][14].replace(',','')}</td>
            <td >${headLine[2][15] + ' ' + headLine[2][16].replace(',','')}</td>
        </tr>
        <tr>
            <td>${headLine[3][0] + ' ' + headLine[3][1]}</td>
            <td>${headLine[3][3] + ' ' + headLine[3][4].replace(',','')}</td>
            <td>${headLine[3][5] + ' ' + headLine[3][6].replace(',','')}</td>
            <td>${headLine[3][7] + ' ' + headLine[3][8].replace(',','')}</td>
            <td>${headLine[3][9]}</td>
            <td>${headLine[3][10].replace(',','')}</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>${headLine[4][0] + ' ' + headLine[4][1]}</td>
            <td>${headLine[4][2] + ' ' + headLine[4][3].replace(',','')}</td>
            <td>${headLine[4][4] + ' ' + headLine[4][5].replace(',','')}</td>
            <td>${headLine[4][6] + ' ' + headLine[4][7].replace(',','')}</td>
            <td>${headLine[4][8]}</td>
            <td>${headLine[4][9].replace(',','') + ' ' + headLine[4][10].replace(',','')}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    `;
    headTable.innerHTML = outHead;
}

function fetchProcesses() {
    let table = document.querySelector("#cpuPerformanceTable");
    let out = "";
    table.innerHTML = "";
    
    //Get processes ordered by memory usage by default
    execSync(command, (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().trim().split(/\n/g).forEach(function (line) {
        line = line.trim().split(/\s+/)
        out += `
             <tr class="${line[2]}" id="${line[0]}" onmousedown="showContextMenu(event, ${line[0]})">
             <td width="10%">${line[0]}</td>
             <td width="10%">${line[1]}</td>
             <td width="10%">${line[2]}</td>
             <td width="10%">${line[3]} %</td>
             <td width="10%">${line[4]} %</td>
             <td width="10%">${line[5]}</td>
             </tr>
             `
    });
    table.innerHTML = out;
    var statusCol = document.querySelectorAll(".T");
    statusCol.forEach(el => {
        el.style.backgroundColor = "rgba(0, 156, 73, 60%)";
        el.style.fontWeight = "600";
        el.style.borderRadius = "8px";
    });
}

const showContextMenu = (e, pid) => {
    document.getElementById(pid).style.backgroundColor = "#fc7c32";
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
    document.getElementById(pid).style.backgroundColor = "rgba(0, 156, 73, 60%)";
    document.getElementById(pid).style.fontWeight = "600";
    document.getElementById(pid).style.borderRadius = "8px";

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

function changeCommand(option,id) {
        if(document.getElementById(id).getAttribute('sort') == 'desc') {
            document.getElementById(id).setAttribute('sort', 'asc');
            document.getElementById(id).innerHTML = option === 'S' ? 'STATUS' : option + '<i class="fa-solid fa-sort-up"></i>'
            command = `top -b -n 1 -o -${option}| awk \'/^top -/{time = $3} $1+0>0 {printf "%-8s %-8s %-8s %-8s %-8s %-8s%%\\n", \ $1,$2,$8,$9,$10,$12 }'`;
        } else {
            document.getElementById(id).setAttribute('sort', 'desc');
            document.getElementById(id).innerHTML = option === 'S' ? 'STATUS' : option + '<i class="fa-solid fa-sort-down"></i>'
            command = `top -b -n 1 -o ${option}| awk \'/^top -/{time = $3} $1+0>0 {printf "%-8s %-8s %-8s %-8s %-8s %-8s%%\\n", \ $1,$2,$8,$9,$10,$12 }'`;
        }
    console.log("click");
}