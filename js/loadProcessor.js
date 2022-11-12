const fs = require('fs');
const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
function commandToTxtFile() {
    // run command to get all row in lscpu to json file and overwrite it to folder txt\ and return that json file
    let a = execSync("cat /proc/cpuinfo | egrep 'processor|model name|vendor_id|microcode|cache size|cpu MHz|bogomips' > ./txt/processor.txt", (err) => {
        if (err) {
            console.log(err);
        }
    });
}
function getMaxFrequency(){
    let a = execSync("lscpu | grep 'CPU max MHz'", (err) => {
        if (err) {
            console.log(err);
        }
    });
    return a.toString().replace("CPU max MHz:","").trim();
}
getMaxFrequency();
function txtFileToJson() {
    commandToTxtFile();
    var info = {
        processor: []
    };
    // info empty to json
    var data = fs.readFileSync('./txt/processor.txt').toString();
    data = data.split(/\n/g);
    let totalCore = (data.length - 1) / 7;
    for (let i = 0; i < totalCore; i++) {
        let index = i > 0 ? i * 8 - i : i * totalCore;
        let obj = {
            processor: data[index].split(":")[1].trim(),
            vendor_id: data[index + 1].split(":")[1].trim(),
            model_name: data[index + 2].split(":")[1].trim(),
            microcode: data[index + 3].split(":")[1].trim(),
            cpuFrequency: data[index + 4].split(":")[1].trim(),
            cache_size: data[index + 5].split(":")[1].trim(),
            bogomips: data[index + 6].split(":")[1].trim()
        }
        info.processor.push(obj);
    }

    return info;
}
function fetchDataProcessor() {
    txtFileToJson();
    let table = document.querySelector("#processorInfoTable");
    let out = "";
    for (let processor of txtFileToJson().processor) {
        out +=
            `
        <tr onclick="loadProcessorDetails(${processor.processor})">
        <td id ="processor${processor.processor}">${processor.model_name} 0:${processor.processor} ${processor.processor} ${getMaxFrequency()} Mhz</td>
        </tr>
        `;
    }
    console.log(out);
    table.innerHTML = out;
}
function loadProcessorDetails(index) {
    let table = document.querySelector("#processorDetailInfoTable");
    let out = "";
    for (let processor of txtFileToJson().processor) {
        if (processor.processor == index) {
            out +=
                `
                <tr>
                <td>Vendor Id</td>
                <td>${processor.processor}</td>
                </tr>
                <tr>
                <td>Model Name</td>
                <td>${processor.model_name}</td>
                </tr>
                <tr>
                <td>Microcode</td>
                <td>${processor.microcode}</td>
                </tr>
                <tr>
                <td>Frequency (current)</td>
                <td>${processor.cpuFrequency} Mhz</td>
                </tr>
                <tr>
                <td>Cache Size</td>
                <td>${processor.cache_size}</td>
                </tr>
                <tr>
                <td>Bogomips</td>
                <td>${processor.bogomips}</td>
                </tr>
        `;
        }
    }
    table.innerHTML = out;
}


