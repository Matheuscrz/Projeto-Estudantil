/**
 * Variáveis de Controle para preenchimento de dados do gráfico
 */
var label = [];
var nAluno = [];
const curso = new Set(); //Objeto que recebe os cursos e elimina os repetidos
const ListaCurso = []; //Lista de cursos para typehead
const notas = []; //Armazena as notas do curso solicitado
/**
 * @param notas
 * @param nClasse
 * @return O valor de variação entre intervalos para calcular e gerar o preenchimento das colunas do eixo X
 */
const calculoIntervalo = () => {
  /**
   * @param notas
   * @return O maior valor de um array
   */
  const max = notas.reduce(function (prev, current) {
    return prev > current ? prev : current;
  });
  /**
   * @param notas
   * @return O menor valor de um array
   */
  const min = notas.reduce(function (prev, current) {
    return prev < current ? prev : current;
  });
  return (max - min) / nClasse();
};
/**
 * @param notas
 * @return O número de classes que define quantas colunas o eixo X terá
 */
const nClasse = () => {
  return Math.round(Math.sqrt(notas.length));
};
/**
 * @param notas
 * @param nClasse
 * @param nAluno
 * @param calculoIntervalo
 */
const notaFaixa = () => {
  nAluno.length = 0;
  let sup = []; //Variável auxiliar
  /**
   * Define que aux recebe o menor valor do array notas
   */
  let aux = notas.reduce((prev, current) => {
    return prev < current ? prev : current;
  });
  let temp = aux;
  /**
   * Para cada coluna do eixo X ele adiciona um valor arredondado em 2 casa decimais
   * e itera sobre todos os valores em cada loop a variação entre intervalos
   */
  for (let i = 0; i <= nClasse(); i++) {
    sup.push(temp.toFixed(2));
    temp = Number(aux) + Number(calculoIntervalo());
    aux += Number(calculoIntervalo());
  }
  /**
   * Define que intervalos recebe os valores do array sup convertidos em string
   */
  let intervalos = sup.map((str) => {
    return Number(str);
  });
  /**
   * Formata e adiciona a variável de controle os dados do eixo X
   */
  for (let i = 1; i < intervalos.length; i++) {
    label.push(`${intervalos[i - 1]} - ${intervalos[i]}`);
  }
  /**
   * Variáveis auxiliares
   */
  let arrayAux = [];
  let array = [];
  /**
   * Faz a verificação de cada elemento dentro de notas e verifica se ele pertence a um determinado
   * intervalo criando um array de arrays para armazena em cada array um valor que respeite uma condição
   */
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
  /**
   * Percorre o array auxiliar e adiciona o tamanho de cada array a o array nAluno que será responsável por gerar as barras do gráfico
   */
  nAluno = array.map((x) => {
    return x.length;
  });
};
/**
 *
 * @param {*} x
 * @param {*} y
 * Monta o gráfico seguindo um padrão e modificando valores de acordo com a entrada
 */
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
            "rgba(255, 159, 64, 1)",
            "rgba(156, 126, 131,1)",
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

/**
 * Função assíncrona que ler o json e busca valores específicos(Key: "CURSO") e adiciona a um array
 * que usaram como banco de dados para fornecer opções ao autocomplete
 */
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

/**
 * Função acionada por Aperto do botão, função principal que executará todos os processos e fará as chamadas das outras funções
 * Composta por uma função assíncrona que ler o json e busca um dado especifico definido pelo input para preencher o array notas
 */
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

/**
 * Função responsável pelo fornecimento de opções do autocomplete pegando através de JQuery os dados digitados no input
 * e comparando letra a letra com um array de dados que serve como base dados, para fornecer as opções ao usuário
 */
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
