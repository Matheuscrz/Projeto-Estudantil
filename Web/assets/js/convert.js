const CSVToJSON = require("csvtojson")
const JSONToCSV = require("json2csv")
const FileSystem = require("fs")
const path = "./Dados.csv"

function convert (path) {
    CSVToJSON().fromFile(path).then(dados => {
    console.log(dados)
    FileSystem.writeFileSync("./Dados.json",JSON.stringify(dados),"utf-8",(err)=>{
        if(err) console.log(err)
        }) 
    })
}