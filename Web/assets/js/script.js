let ctx = document.getElementById('chart')
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Candidatos por faixa de Pontuação',
            data: [120, 190, 30, 50, 20, 30],
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
//Leitura do arquivo
var dados = []
var matricula = []
var openFile = (event) => {
    var input = event.target
    var reader = new FileReader()
    reader.onload = () => {
        var text = reader.result
        dados.push(text.split('\n'))
        process(dados)
    }
    reader.readAsText(input.files[0])
}
var process = () => {
    
}

var calculo = (array) => {
    var k = (array) => { return 1 + 3.3*Math.log(n) }
    var At = (array) => { return array.reduce((a,b) => Math.max(a,b)) }
    return (At/k).toFixed(2)
}
console.log(dados)