//Variáveis de construção do gráfico
const label = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]; //Faixa de Pontuação
const vagas = [1200, 1900, 300, 500, 200, 300]; //Número de Vagas
const curse = "temp";

//TypeHead
$(document).ready(function () {
  var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      matches = [];

      substrRegex = new RegExp(q, "i");

      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  $("div .typeahead").typeahead(
    {
      hint: true,
      highlight: true,
      minLength: 1,
    },
    {
      name: "label",
      source: substringMatcher(label),
    }
  );
});

//Calculo de intervalos
const calculo = (array) => {
  const k = 1 + 3.3 * Math.log(array.length()); //Número de intervalos
  const At = Math.max(array) - Math.min(array); //Amplitude total
  return (At / k).toFixed(2); //Retorna a amplitude de cada intervalo
};
// Construção do gráfico
const grafico = () => {
  let ctx = document.getElementById("myChart").getContext("2d");
  let chat = new Chart(ctx, {
    type: "bar",
    data: {
      labels: label,
      datasets: [
        {
          label: "Número de candidatos por faixa de Pontuação",
          data: vagas,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1))",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
grafico();
//Função que coletara os dados e irar gerar os gráficos
const process = () => {
  var input = document.getElementById("input").value;
};
