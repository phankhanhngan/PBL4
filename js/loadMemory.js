const fs = require('fs');
const { execSync } = require("child_process"); // required module to run shell script

function fetchDataMemory() {
    let result = 0;
    let table = document.querySelector("#memInfoTable");
    table.innerHTML = "";
    let out = "";

    var data = fs.readFileSync('/proc/meminfo').toString();
    data.split(/\n/g).forEach(function (line) {
        line = line.split(':');
        if (line.length < 2) {
            return;
        }
        out += `
            <tr>
             <td width="30%" >${line[0]}</td>
             <td witdh="70%" >${parseInt(line[1].trim(), 10)} kB</td>
             </tr>
             `
        if(line[0] == "MemTotal")
        {
            result += parseInt(line[1].trim(), 10);
        }
        if(line[0] == "MemFree")
        {
            result -= parseInt(line[1].trim(), 10);
        }
    });
    table.innerHTML = out;
    return result;
}

window.onload = function () {
    fetchDataMemory();
    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        backgroundColor: "#1b1b1b",
        axisX: {
            lineColor: "#01822e",
            gridColor: "darkgreen",
            gridThickness: 2,
            gridDashType: "shortDash",
            tickColor: "#01822e",
            tickThickness: 3,
            margin: 10,
            labelFormatter: function () {
                return " ";
            }
        },
        axisY: {
            lineColor: "#01822e",
            gridColor: "darkgreen",
            gridDashType: "shortDash",
            tickColor: "#01822e",
            labelFontColor: "#01822e",
            suffix: " Kb"
        },
        data: [{
            type: "area",
            lineThickness: 3,
            dataPoints: dps,
            color: "#01822e",

        }]
    });
    var xVal = 0;
    var yVal = 100;
    var dataLength = 500; // number of dataPoints visible at any point
    var updateChart = function (count, value) {

        count = count || 1;

        for (var j = 0; j < count; j++) {
            yVal = value;
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }

        if (dps.length > dataLength) {
            dps.shift();
        }

        chart.render();
    };
    updateChart(dataLength, 0);
    setInterval(function () {
        let value = fetchDataMemory();
        updateChart(1, value);
    }, 300);

}

