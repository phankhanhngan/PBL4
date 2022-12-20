const { execSync, ChildProcess } = require("child_process"); // required module to run shell script

var info = {
    inputDevices: []
};

let data = execSync("cat /proc/bus/input/devices | egrep 'I:|N: Name=|P:|H:'", (err) => {
    if (err) {
        console.log(err);
    }
}).toString().split(/\n/g);

function fetchDataInputDevice() {
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

    let table = document.querySelector("#inputDeviceTable");
    let out = "";
    let url = "";
    for (let [index,input] of info.inputDevices.entries()) {
        if(input.type == "Keyboard"){
            icon = '<i class="fa-solid fa-keyboard"></i>';
        }
        else if (input.type == "Mouse"){
            icon = '<i class="fa-solid fa-mouse"></i>'; 
        }
        else {
            icon = '<i class="fa-solid fa-question"></i>';
        }
        out +=
            `
        <tr onclick="loadInputDeviceDetails(${index},this)">
        <td >${icon} &nbsp; <span>${input.name}</span></td>
        </tr>
        `;
    }
    table.innerHTML = out;
}

function loadInputDeviceDetails(indexValue,tr) {
    let trs = document.querySelectorAll("#inputDeviceTable tr");
    trs.forEach((el) => {
        el.classList.remove("active");
    });
    tr.classList.add("active");

    let table = document.querySelector("#infoTable");
    let out = "";
    for (let [index,input] of info.inputDevices.entries()) {
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