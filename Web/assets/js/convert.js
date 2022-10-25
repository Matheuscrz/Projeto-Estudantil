const CSVToJSON = require("csvtojson")
const JSONToCSV = require("json2csv")
const FileSystem = require("fs")
const path = document.querySelector('input')

function convert (path) {
    CSVToJSON().fromFile(path).then(dados => {
    console.log(dados)
    FileSystem.writeFileSync("./Dados.json",JSON.stringify(dados),"utf-8",(err)=>{
        if(err) console.log(err)
        }) 
    })
}
convert(path)