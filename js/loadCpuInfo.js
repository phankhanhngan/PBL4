function onLoad()
{  
    fetch("../../txt/cpuInfo.json")
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        let table = document.querySelector("#cpuInfoTable");
        let out = "";
        for(let cpuDetail of data.lscpu){
            out += `
            <tr>
            <td width="30%">${cpuDetail.field}</td>
            <td witdh="70%">${cpuDetail.data}</td>
            </tr>
            `
        }
        table.innerHTML=out;
    });
}