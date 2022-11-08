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
window.onload = function () {
    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];
    var dataPoints6 = [];
    var dataPoints7 = [];
    var dataPoints8 = [];
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        backgroundColor: "#ffffff",
        axisX: {
            // lineColor: "black",
            // gridColor: "black" ,
            // gridThickness: 1,
            // gridDashType: "shortDash",
            // tickColor: "black",
            // tickThickness: 1,
            // gridThickness: 1,
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            margin: 10,
            labelFormatter: function () {
                return " ";
            }
        },
        axisY: {
            lineColor: "black",
            gridColor: "black",
            gridDashType: "shortDash",
            gridThickness: 1,
            tickColor: "black",
            labelFontColor: "black",
            labelFontSize: 10,
            maximum: 100
        },
        data: [{
            markerSize: 0,
            name: "Cpu1",
            type: "spline",
            lineThickness: 1,
            dataPoints: dataPoints1,
            color: "red",

        },
        {
            markerSize: 0,
            name: "Cpu2",
            type: "spline",
            lineThickness: 1,
            dataPoints: dataPoints2,
            color: "blue",
        },
        {
            markerSize: 0,
            name: "Cpu3",
            type: "spline",
            lineThickness: 1,
            dataPoints: dataPoints3,
            color: "green",
        },
        {
            markerSize: 0,
            name: "Cpu4",
            type: "spline",
            lineThickness: 1,
            dataPoints: dataPoints4,
            color: "#FFFF00",
        },
        {
            markerSize: 0,
            name: "Cpu5",
            type: "spline",
            lineThickness: 1,
            dataPoints: dataPoints5,
            color: "#00FFFF",
        },
        {
            markerSize: 0,
            name: "Cpu6",
            type: "spline",
            lineThickness: 1,
            dataPoints: dataPoints6,
            color: "#FF00FF",
        },
        {
            markerSize: 0,
            name: "Cpu7",
            type: "spline",
            lineThickness: 1,
            dataPoints: dataPoints7,
            color: "#C0C0C0",
        },
        {
            markerSize: 0,
            name: "Cpu8",
            type: "spline",
            lineThickness: 1,
            dataPoints: dataPoints8,
            color: "#333300",
        }
        ]
    });
    var xVal = 0;
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
    updateChart(dataLength, listZeros);
    setInterval(function () {
        var list = getListCpuUsage();
        updateChart(1, list);
    }, 300);

}
