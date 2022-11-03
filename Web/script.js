//Variáveis de controle
var label = []; //Faixa de Pontuação
var nAluno = []; //Número de Alunos
const curso = new Set(); //Objeto que recebe os cursos e elimina os repetidos
const ListaCurso = []; //Lista de cursos para typehead
const notas = []; //Armazena as notas do curso solicitado

//Calculo de intervalos
const calculoIntervalo = () => {
  const max = notas.reduce(function (prev, current) {
    return prev > current ? prev : current;
  });
  const min = notas.reduce(function (prev, current) {
    return prev < current ? prev : current;
  });
  return (max - min) / nClasse(); //Calculo de distribuição de frequência
};
//Calculo do número de classes
const nClasse = () => {
  return Math.round(Math.sqrt(notas.length));
};
//Função que processa os dados para montagem do gráfico
const notaFaixa = () => {
  nAluno.length = 0;
  let sup = [];
  let aux = notas.reduce((prev, current) => {
    return prev < current ? prev : current;
  });
  let temp = aux;
  for (let i = 0; i <= nClasse(); i++) {
    sup.push(temp.toFixed(2));
    temp = Number(aux) + Number(calculoIntervalo());
    aux += Number(calculoIntervalo());
  }
  let intervalos = sup.map((str) => {
    return Number(str);
  });
  for (let i = 1; i < intervalos.length; i++) {
    label.push(`${intervalos[i - 1]} - ${intervalos[i]}`);
  }
  let arrayAux = [];
  let array = [];
  for (let i = 0; i < intervalos.length; i++) {
    notas.forEach((element) => {
      if (
        element >= intervalos[i] &&
        element < intervalos[i] + calculoIntervalo() - 0.1
      ) {
        arrayAux.push(element);
      }
    });
    array.push(arrayAux);
    arrayAux = [];
  }
  nAluno = array.map((x) => {
    return x.length;
  });
};

// Construção do gráfico
const grafico = (x, y) => {
  let ctx = document.getElementById("myChart").getContext("2d");
  let chat = new Chart(ctx, {
    type: "bar",
    data: {
      labels: label,
      datasets: [
        {
          label: "Número de candidatos por faixa de Pontuação",
          data: nAluno,
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

//Função que cria um array para preenchimento de função do autocomplete
async function logJson() {
  const resposta = await fetch("./Data/Data.json");
  const json = await resposta.json();
  json.forEach((element) => {
    curso.add(element.CURSO);
  });
  curso.forEach((element) => {
    ListaCurso.push(element);
  });
}
logJson();

//Função que ira fazer a coleta de dados e executara todo o procedimento para geração do gráfico
const process = () => {
  //Coleta de dados do Json
  var input = document.getElementById("input").value;
  var curse = input.toUpperCase();
  async function Data() {
    const resposta = await fetch("./Data/Data.json");
    const json = await resposta.json();
    notas.length = 0;
    json.forEach((element) => {
      if (element.CURSO === curse) {
        notas.push(element.NOTA);
      }
    });
  }
  Data();
  notaFaixa();
  grafico(label, nAluno);
};

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
      hint: false,
      highlight: true,
      minLength: 1,
    },
    {
      name: "curso",
      source: substringMatcher(ListaCurso),
    }
  );
});
