const { execSync, ChildProcess } = require("child_process"); // required module to run shell script

let totalCore = 8;

function getListCpuUsage() {
    var info = {
        cpuUsage: []
    };
    execSync("top -1 -n 1 -b | egrep '%Cpu'", (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().trim().split(/\n/g).forEach(function (line) {
        line = line.split(":");
        var obj = {
            cpu: line[0].trim(),
            usage: parseInt(line[1].trim().split(/\s+/)[0].replace(",", "."))
        }
        info.cpuUsage.push(obj);
    });
    return info;
}

function getListCpuFrequency() {
    var info = {
        cpuFre: []
    };
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


function updateDetail(list) {
    for (let i=0; i<totalCore; i++) {
        document.querySelector(`#cpu${i+1}`).innerHTML = list.cpuUsage[i].usage + '%';
    }
}

function updateFreDetail(list) {
    for (let i=0; i<totalCore; i++) {
        document.querySelector(`#cpuF${i+1}`).innerHTML = list.cpuFre[i].fre + 'MHz';
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var xVal = 0;
var xValFre = 0;
var dataLength = 50; // number of dataPoints visible at any point

var updateChart = function (count, list, chart, dataArrUse) {
    count = count || 1;
    for (var j = 0; j < count; j++) {
        for (let i = 0; i<totalCore; i++) {
            dataArrUse[i].dataPoints.push({
                x: xVal,
                y: list.cpuUsage[i].usage
            });
        }
        xVal++;
    }

    if (dataArrUse[1].dataPoints.length > dataLength) {
        for (let i = 0; i<totalCore; i++) {
            dataArrUse[i].dataPoints.shift();
        }
    }
    chart.render();
};

var updateChartFrequency = function (count, list, chart2, dataArrFre) {
    count = count || 1;
    for (var j = 0; j < count; j++) {
        for (let i = 0; i<totalCore; i++) {
            dataArrFre[i].dataPoints.push({
                x: xVal,
                y: list.cpuFre[i].fre
            });
        }
        xValFre++;
    }
    if (dataArrFre[1].dataPoints.length > dataLength) {
        for (let i = 0; i<totalCore; i++) {
            dataArrFre[i].dataPoints.shift();
        }
    }
    chart2.render();
};

window.onload = function () {

    let divCPU = document.querySelector("#cpuTagDiv");
    let divCPUFre = document.querySelector("#cpuFreTagDiv");

    let cpuTagDiv = ``;
    let cpuFreTagDiv = ``;

    let dataArrUse = [];
    let dataArrFre = [];

    for (let i=0; i<totalCore; i++) {
        let color = getRandomColor();
        dataArrUse.push({
            yValueFormatString : "## '%'",
            ValueFormatString : "",
            markerSize: 0,
            name: "CPU" + (i+1),
            type: "spline",
            lineThickness: 2,
            dataPoints: [],
            color: color,
        });

        dataArrFre.push({
            yValueFormatString : "## MHz",
            markerSize: 0,
            name: "CPU" + (i+1),
            type: "spline",
            lineThickness: 2,
            dataPoints: [],
            color: color,

        });

        cpuTagDiv += `
            <div class="test">
                <div class="common-p" style='background-color: ${color}'></div>
                <div><span>CPU${i+1}:</span>
                    <span id="cpu${i+1}"></span>
                </div>
            </div>
        `;

        cpuFreTagDiv += `
            <div class="test">
                <div class="common-p" style='background-color: ${color}'></div>
                <div><span>CPU${i+1}:</span>
                    <span id="cpuF${i+1}"></span>
                </div>
            </div>
        `;
    };

    divCPU.innerHTML = cpuTagDiv;
    divCPUFre.innerHTML = cpuFreTagDiv;
    
    let axisX = {
        gridThickness: 0,
            tickLength: 0,
            lineThickness: 0.5,
            margin: 10,
            labelFormatter: function () {
                return " ";
            }
    };

    let axisY = {
        gridThickness: 0.5,
            tickThickness: 0.5,
            suffix: "%",
            lineThickness: 0.5,
            labelFontColor: "white",
            labelFontSize: 10,
    };

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        backgroundColor: "transparent",
        axisX: axisX,
        axisY: axisY,
        data: dataArrUse
    });
    var chart2 = new CanvasJS.Chart("chartContainerFrequency", {
        animationEnabled: true,
        backgroundColor: "transparent",
        axisX: axisX,
        axisY: Object.assign({}, axisY, { suffix: "MHz" }),
        data: dataArrFre
    
    });

    let listZeros = {
        cpuUsage: [],
        cpuFre: []
    };    

    for (let i=0; i<totalCore; i++) {
        listZeros.cpuUsage.push({
            usage: 0
        });
        listZeros.cpuFre.push({
            fre: 0
        });
    }

    updateChart(dataLength, listZeros, chart, dataArrUse);

    updateChartFrequency(dataLength, listZeros, chart2, dataArrFre);

    setInterval(function () {
        var list = getListCpuUsage();
        var listFre = getListCpuFrequency();
        updateChart(1, list, chart, dataArrUse);
        updateChartFrequency(1, listFre, chart2, dataArrFre);
        updateDetail(list);
        updateFreDetail(listFre);
    }, 500);
}