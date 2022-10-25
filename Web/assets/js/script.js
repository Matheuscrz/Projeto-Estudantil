// const Papa = require('papaparse')
//Variáveis de construção do gráfico
const label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'] //Faixa de Pontuação
const vagas = [1200, 1900, 300, 500, 200, 300] //Número de Vagas

//Variáveis para processamento
const data = []


//Processamento dos dados
// const openFile = (event) => {
//     const input = event.target
//     const reader = new FileReader()
//     reader.onload = () => {
//         const text = reader.result
//         data.push(text.split('\n'))
        
//     }
//     reader.readAsText(input.files[0])
// }
const input = document.querySelector('input')



//Calculo de intervalos
const calculo = (array) => {
    const k = 1 + 3.3*Math.log(array.length()) //Número de intervalos 
    const At = Math.max(array) - Math.min(array) //Amplitude total
    return (At/k).toFixed(2) //Retorna a amplitude de cada intervalo
}
//Formatação de dados para preenchimento de gráfico
const labelGrafic = (array,valor) => {

}
const Ngrafico = (array,valor) => {

}

//Construção do gráfico
let ctx = document.getElementById('chart')
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: label,
        datasets: [{
            label: 'Candidatos por faixa de Pontuação',
            data: vagas,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});