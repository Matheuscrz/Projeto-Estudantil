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
  return ((max - min) / notas.length).toFixed(2); //Calculo de distribuição de frequência
};
//Calculo do número de classes
const nClasse = () => {
  return Math.round(1 + 3.322 * Math.log(notas.length));
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

//Função que organiza as notas por faixa de pontuação
const notaFaixa = () => {
  let c1 = 0;
  let c2 = 0;
  let c3 = 0;
  let c4 = 0;
  let c5 = 0;
  nAluno.length = 0;
  let aux = notas.reduce(function (prev, current) {
    return prev < current ? prev : current;
  });
  let array = [];
  array.length = 0;
  for (let i = 0; i < nClasse; i++) {
    array.push(Number(aux));
    aux += Number(calculoIntervalo());
    console.log(aux);
  }
  console.log(array);
  notas.forEach((element) => {});
  // nAluno.push(c1, c2, c3, c4, c5);
};

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
  label.length = 0;
  let aux = notas.reduce(function (prev, current) {
    return prev < current ? prev : current;
  });
  while (label.length < nClasse) {
    label.push(
      `${Number(Math.round(aux))} - ${
        Number(Math.round(aux)) + Math.round(Number(calculoIntervalo()))
      }`
    );
    aux += Number(calculoIntervalo());
  }
  notaFaixa();
  // grafico(label, nAluno);
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
