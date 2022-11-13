const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
function getListCpuUsage() {
    var info = {};
    info.cpuUsage = [];
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
window.onload = function () {
    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];
    var dataPoints6 = [];
    var dataPoints7 = [];
    var dataPoints8 = [];
    var dataPoints1F = [];
    var dataPoints2F = [];
    var dataPoints3F = [];
    var dataPoints4F = [];
    var dataPoints5F = [];
    var dataPoints6F = [];
    var dataPoints7F = [];
    var dataPoints8F = [];
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        backgroundColor: "#4D4C4D",
        axisX: {
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0.5,
            margin: 10,
            labelFormatter: function () {
                return " ";
            }
        },
        axisY: {
            // lineColor: "white",
            // gridColor: "white",
            // gridDashType: "shortDash",
            gridThickness: 0.5,
            tickThickness: 0.5,
            suffix: "%",
            // tickColor: "white",
            lineThickness: 0.5,
            labelFontColor: "white",
            labelFontSize: 10,
        },
        data: [{
            yValueFormatString : "## '%'",
            ValueFormatString : "",
            markerSize: 0,
            name: "Cpu1",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints1,
            color: "red",

        },
        {
            yValueFormatString : "## '%'",
            markerSize: 0,
            name: "Cpu2",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints2,
            color: "blue",
        },
        {
            yValueFormatString : "## '%'",
            markerSize: 0,
            name: "Cpu3",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints3,
            color: "fuchsia",
        },
        {
            yValueFormatString : "## '%'",
            markerSize: 0,
            name: "Cpu4",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints4,
            color: "green",
        },
        {
            yValueFormatString : "## '%'",
            markerSize: 0,
            name: "Cpu5",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints5,
            color: "lime",
        },
        {
            yValueFormatString : "## '%'",
            markerSize: 0,
            name: "Cpu6",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints6,
            color: "yellow",
        },
        {
            yValueFormatString : "## '%'",
            markerSize: 0,
            name: "Cpu7",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints7,
            color: "navy",
        },
        {
            yValueFormatString : "## '%'",
            markerSize: 0,
            name: "Cpu8",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints8,
            color: "aqua",
        }
        ]
    });
    var chart2 = new CanvasJS.Chart("chartContainerFrequency", {
        animationEnabled: true,
        backgroundColor: "#4D4C4D",
        axisX: {
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0.5,
            margin: 10,
            labelFormatter: function () {
                return " ";
            }
        },
        axisY: {
            // lineColor: "white",
            // gridColor: "white",
            // gridDashType: "shortDash",
            gridThickness: 0.5,
            tickThickness: 0.5,
            suffix: " Mhz",
            // tickColor: "white",
            lineThickness: 0.5,
            labelFontColor: "white",
            labelFontSize: 10,
        },
        data: [{

            yValueFormatString : "## MHz",
            markerSize: 0,
            name: "Cpu1",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints1F,
            color: "red",

        },
        {
            yValueFormatString : "## MHz",
            markerSize: 0,
            name: "Cpu2",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints2F,
            color: "blue",
        },
        {
            yValueFormatString : "## MHz",
            markerSize: 0,
            name: "Cpu3",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints3F,
            color: "fuchsia",
        },
        {
            yValueFormatString : "## MHz",
            markerSize: 0,
            name: "Cpu4",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints4F,
            color: "green",
        },
        {
            yValueFormatString : "## MHz",
            markerSize: 0,
            name: "Cpu5",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints5F,
            color: "lime",
        },
        {
            yValueFormatString : "## MHz",
            markerSize: 0,
            name: "Cpu6",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints6F,
            color: "yellow",
        },
        {
            yValueFormatString : "## MHz",
            markerSize: 0,
            name: "Cpu7",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints7F,
            color: "navy",
        },
        {
            markerSize: 0,
            yValueFormatString : "## MHz",
            name: "Cpu8",
            type: "spline",
            lineThickness: 2,
            dataPoints: dataPoints8F,
            color: "aqua",
        }
        ]
    });
    var xVal = 0;
    var xValFre = 0;
    var yVal = 50;
    listZeros = {
        cpuUsage: [
            {
                usage: 0
            },
            {
                usage: 0
            },
            {
                usage: 0
            },
            {
                usage: 0
            },
            {
                usage: 0
            },
            {
                usage: 0
            },
            {
                usage: 0
            },
            {
                usage: 0
            }
        ],
        cpuFre: [
            {
                fre: 0
            },
            {
                fre: 0
            },
            {
                fre: 0
            },
            {
                fre: 0
            },
            {
                fre: 0
            },
            {
                fre: 0
            },
            {
                fre: 0
            },
            {
                fre: 0
            }
        ]
    };
    var dataLength = 50; // number of dataPoints visible at any point
    var updateChart = function (count, list) {
        count = count || 1;
        for (var j = 0; j < count; j++) {
            dataPoints1.push({
                x: xVal,
                y: list.cpuUsage[0].usage
            });
            dataPoints2.push({
                x: xVal,
                y: list.cpuUsage[1].usage
            });
            dataPoints3.push({
                x: xVal,
                y: list.cpuUsage[2].usage
            });
            dataPoints4.push({
                x: xVal,
                y: list.cpuUsage[3].usage
            });
            dataPoints5.push({
                x: xVal,
                y: list.cpuUsage[4].usage
            });
            dataPoints6.push({
                x: xVal,
                y: list.cpuUsage[5].usage
            });
            dataPoints7.push({
                x: xVal,
                y: list.cpuUsage[6].usage
            });
            dataPoints8.push({
                x: xVal,
                y: list.cpuUsage[7].usage
            });
            xVal++;
        }

        if (dataPoints1.length > dataLength) {
            dataPoints1.shift();
            dataPoints2.shift();
            dataPoints3.shift();
            dataPoints4.shift();
            dataPoints5.shift();
            dataPoints6.shift();
            dataPoints7.shift();
            dataPoints8.shift();
        }
        chart.render();
    };
    var updateChartFrequency = function (count, list) {
        count = count || 1;
        for (var j = 0; j < count; j++) {
            dataPoints1F.push({
                x: xValFre,
                y: list.cpuFre[0].fre
            });
            dataPoints2F.push({
                x: xValFre,
                y: list.cpuFre[1].fre
            });
            dataPoints3F.push({
                x: xValFre,
                y: list.cpuFre[2].fre
            });
            dataPoints4F.push({
                x: xValFre,
                y: list.cpuFre[3].fre
            });
            dataPoints5F.push({
                x: xVal,
                y: list.cpuFre[4].fre
            });
            dataPoints6F.push({
                x: xValFre,
                y: list.cpuFre[5].fre
            });
            dataPoints7F.push({
                x: xValFre,
                y: list.cpuFre[6].fre
            });
            dataPoints8F.push({
                x: xValFre,
                y: list.cpuFre[7].fre
            });
            xValFre++;
        }
        if (dataPoints1.length > dataLength) {
            dataPoints1F.shift();
            dataPoints2F.shift();
            dataPoints3F.shift();
            dataPoints4F.shift();
            dataPoints5F.shift();
            dataPoints6F.shift();
            dataPoints7F.shift();
            dataPoints8F.shift();
        }
        chart2.render();
    };
    updateChart(dataLength, listZeros);
    updateChartFrequency(dataLength, listZeros);
    setInterval(function () {
        var list = getListCpuUsage();
        var listFre = getListCpuFrequency();
        updateChart(1, list);
        updateChartFrequency(1, listFre);
        updateDetail(list);
        updateFreDetail(listFre);
    }, 500);
}
function updateDetail(list) {
    let cpu1 = document.querySelector("#cpu1");
    let cpu2 = document.querySelector("#cpu2");
    let cpu3 = document.querySelector("#cpu3");
    let cpu4 = document.querySelector("#cpu4");
    let cpu5 = document.querySelector("#cpu5");
    let cpu6 = document.querySelector("#cpu6");
    let cpu7 = document.querySelector("#cpu7");
    let cpu8 = document.querySelector("#cpu8");
    cpu1.innerHTML = list.cpuUsage[0].usage + '%';
    cpu2.innerHTML = list.cpuUsage[1].usage + '%';
    cpu3.innerHTML = list.cpuUsage[2].usage + '%';
    cpu4.innerHTML = list.cpuUsage[3].usage + '%';
    cpu5.innerHTML = list.cpuUsage[4].usage + '%';
    cpu6.innerHTML = list.cpuUsage[5].usage + '%';
    cpu7.innerHTML = list.cpuUsage[6].usage + '%';
    cpu8.innerHTML = list.cpuUsage[7].usage + '%';
}
function updateFreDetail(list) {
    let cpu1 = document.querySelector("#cpuF1");
    let cpu2 = document.querySelector("#cpuF2");
    let cpu3 = document.querySelector("#cpuF3");
    let cpu4 = document.querySelector("#cpuF4");
    let cpu5 = document.querySelector("#cpuF5");
    let cpu6 = document.querySelector("#cpuF6");
    let cpu7 = document.querySelector("#cpuF7");
    let cpu8 = document.querySelector("#cpuF8");
    cpu1.innerHTML = list.cpuFre[0].fre + 'MHz';
    cpu2.innerHTML = list.cpuFre[1].fre + 'MHz';
    cpu3.innerHTML = list.cpuFre[2].fre + 'MHz';
    cpu4.innerHTML = list.cpuFre[3].fre + 'MHz';
    cpu5.innerHTML = list.cpuFre[4].fre + 'MHz';
    cpu6.innerHTML = list.cpuFre[5].fre + 'MHz';
    cpu7.innerHTML = list.cpuFre[6].fre + 'MHz';
    cpu8.innerHTML = list.cpuFre[7].fre + 'MHz';
}