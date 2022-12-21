const { execSync, ChildProcess } = require("child_process"); // required module to run shell script
function listUsbDevices() {
    var info = {
        usb: []
    };
    let data = execSync("lsusb -v | egrep ': ID |idVendor|idProduct|MaxPower|bcdUSB'", (err) => {
        if (err) {
            console.log(err);
        }
    }).toString().split(/\n/g);
    let totalDevice = (data.length - 1) / 5;
    console.log(totalDevice);
    for (let i = 0; i < totalDevice; i++) {
        let index = i > 0 ? i * 6 - i : i * totalDevice;
        let obj = {
            description: getUsbDescription(data[index].trim()),
            bus: data[index].split(/\s+/)[1].trim(),
            version: data[index + 1].trim().split(/\s+/)[1],
            vendor_id: data[index + 2].trim().split(/\s+/)[1],
            vendor_name: getUsbName(data[index + 2].trim()),
            product_id: data[index + 3].trim().split(/\s+/)[1],
            product_name: getUsbName(data[index + 3].trim()),
            max_current: data[index + 4].split(/\s+/)[2].trim()
        }
        info.usb.push(obj);
    }
    return info;
}
function getUsbDescription(line) {
    line = line.split(/\s+/);
    let out = "";
    for (let i = 6; i < line.length; i++) {
        out += line[i] + " ";
    }
    return out.trim();
}
function getUsbName(line) {
    line = line.split(/\s+/);
    let out = "";
    for (let i = 2; i < line.length; i++) {
        out += line[i] + " ";
    }
    return out.trim();
}
function fetchDataUsb() {
    let table = document.querySelector("#usbTable");
    let out = "";
    for (let usb of listUsbDevices().usb) {
        out +=
            `
        <tr onclick="loadUsbDetails(${usb.product_id})">
        <td >${usb.description}</td>
        </tr>
        `;
    }
    table.innerHTML = out;
}
function loadUsbDetails(id) {
    let tableInfo = document.querySelector("#infoTable");
    let tableMisc = document.querySelector("#miscTable");
    let outInfo = "";
    let outMisc = "";
    for (let usb of listUsbDevices().usb) {
        if (usb.product_id == id) {
            outInfo +=
                `
                <tr>
                <td width = "20%">Product</td>
                <td>${usb.product_name}</td>
                </tr>
                <tr>
                <td width = "20%">Vendor</td>
                <td>${usb.vendor_name}</td>
                </tr>
                <tr>
                <td width = "20%">Max Current</td>
                <td>${usb.max_current}</td>
                </tr>
        `;
            outMisc +=
                `
        <tr>
        <td width = "20%">USB Version</td>
        <td>${usb.version}</td>
        </tr>
        <tr>
        <td width = "20%">Vendor ID</td>
        <td>${usb.vendor_id}</td>
        </tr>
        <tr>
        <td width = "20%">Product ID</td>
        <td>${usb.product_id}</td>
        </tr>
        <tr>
        <td width = "20%">Bus</td>
        <td>${usb.bus}</td>
        </tr>
        `;
        }
    }
    tableInfo.innerHTML = outInfo;
    tableMisc.innerHTML = outMisc;
}