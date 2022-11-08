const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
function listInputDevice() {
    var info = {
        inputDevices: []
    };
    let data = execSync("cat /proc/bus/input/devices | egrep 'I:|N: Name=|P:|H:'", (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().split(/\n/g);
    let totalDevice = (data.length - 1) / 4;
    let type = "";
    for (let i = 0; i < totalDevice; i++) {
        let index = i > 0 ? i * 5 - i : i * totalDevice;
        if(data[index+3].includes('kbd')){
            type = "Keyboard";
        }
        else if (data[index+3].includes('mouse')){
            type = "Mouse";
        }
        else{
            type = "Unknown";
        }
        let obj = {
            name: data[index+1].trim().split('"')[1].replace('"',''),
            type : type,
            bus : data[index].split(/\s+/)[1].split("=")[1],
            vendor : data[index].split(/\s+/)[2].split("=")[1],
            product : data[index].split(/\s+/)[3].split("=")[1],
            version : data[index].split(/\s+/)[4].split("=")[1],
            connect_to : data[index+2].split("=")[1]
        }
        info.inputDevices.push(obj);
    };
    return info;
}
function fetchDataInputDevice() {
    let table = document.querySelector("#inputDeviceTable");
    let out = "";
    let url = "";
    for (let [index,input] of listInputDevice().inputDevices.entries()) {
        if(input.type == "Keyboard"){
            url = "/home/brooklyn/PBL4/PBL4/GUI/icon/icons8-keyboard-80.png";
        }
        else if (input.type == "Mouse"){
            url = "/home/brooklyn/PBL4/PBL4/GUI/icon/icons8-mouse-80.png";
        }
        else {
            url = "/home/brooklyn/PBL4/PBL4/GUI/icon/question-mark.png";
        }
        out +=
            `
        <tr onclick="loadInputDeviceDetails(${index})">
        <td ><img src="${url}">&nbsp; ${input.name}</td>
        </tr>
        `;
    }
    table.innerHTML = out;
}

function loadInputDeviceDetails(indexValue) {
    let table = document.querySelector("#infoTable");
    let out = "";
    for (let [index,input] of listInputDevice().inputDevices.entries()) {
        if (indexValue == index) {
            out +=
                `
                <tr>
                <td width = "20%">Name</td>
                <td>${input.name}</td>
                </tr>
                <tr>
                <td width = "20%">Type</td>
                <td>${input.type}</td>
                </tr>
                <tr>
                <td width = "20%">Bus</td>
                <td>${input.bus}</td>
                </tr>
                <td width = "20%">Vendor</td>
                <td>${input.vendor}</td>
                </tr>
                <td width = "20%">Product</td>
                <td>${input.product}</td>
                </tr>
                <td width = "20%">Version</td>
                <td>${input.version}</td>
                </tr>
                <td width = "20%">Connect to</td>
                <td>${input.connect_to}</td>
                </tr>
        `;
        }
    }
    table.innerHTML = out;
}