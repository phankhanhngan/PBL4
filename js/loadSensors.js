const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
const { count } = require("console");
function getListTemp(){
    return execSync("sensors | egrep '°C'", (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().trim().split(/\n/g);
}
function getListCpuFan(){
    return execSync("sensors | egrep 'fan'", (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().trim().split(/\n/g);
}
// function getAverageTemp(){
//     let result = 0;
//     let count =0;
//     getListTemp().forEach(function(line){
//         line = line.split(":");
//         if(line.length < 2) return;
//         result += parseFloat(line[1].trim().split(/\s+/)[0].replace("+","").replace("°C",""));
//         count ++;
//     });
//     return Math.round((result/count) * 100) / 100;
// }
function fetchDataSensors() {
    let table = document.querySelector("#sensorTable");
    let result = 0;
    let count =0;
    table.innerHTML = "";
    let out = "";
    // getListCpuFan().forEach(function(line){
    //     line = line.split(":");
    //     if(line.length < 2) return;
    //     out +=
    //     `
    //     <tr>
    //     <td width="20%">${line[0].trim()}</td>
    //     <td width="20%">Fan</td>
    //     <td >${line[1].trim()}</td>
    //     </tr>
    //     `;
    // });
    getListTemp().forEach(function(line){
        line = line.split(":");
        if(line.length < 2) return;
        result += parseFloat(line[1].trim().split(/\s+/)[0].replace("+","").replace("°C",""));
        count ++;
        out +=
            `
        <tr>
        <td width="20%">${line[0]}</td>
        <td width="20%">Temperature</td>
        <td >${parseFloat(line[1].trim().split(/\s+/)[0].replace("+","").replace("°C",""))} °C</td>
        </tr>
        `
    });
    table.innerHTML = out;
    return Math.round((result/count) * 100) / 100;
}
window.onload = function () {
    fetchDataSensors();
    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
	    backgroundColor: "#1b1b1b",
        axisX:{
            // gridThickness: 0,
            // tickLength: 0,
            // lineThickness: 0,
            lineColor: "#01822e",
            gridColor: "darkgreen" ,
            gridThickness: 2,
            gridDashType: "shortDash",
            tickColor: "#01822e",
            tickThickness: 3,
            margin: 10,
            labelFormatter: function(){
              return " ";
            }
          },
        axisY:{
            lineColor: "#01822e",        
            gridColor: "darkgreen",
            gridDashType: "shortDash",
            tickColor: "#01822e",
            labelFontColor: "#01822e"
        },
        data: [{
            type: "splineArea",
            lineThickness: 3,
            dataPoints: dps,
            color: "#01822e",
            
        }]
    });
    var xVal = 0;
    var yVal= 100;
    var dataLength = 500; // number of dataPoints visible at any point
    var updateChart = function (count,average) {
    
        count = count || 1;
    
        for (var j = 0; j < count; j++) {
            yVal = average;
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
    updateChart(dataLength,0);
    setInterval(function(){
        let average = fetchDataSensors();
        updateChart(1,average);
    }, 300);
    
    }
