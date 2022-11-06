# Entendendo decisões arquiteturais e a estrutura do projeto Web

## Requisitos para rodar o projeto

### Setup de ambiente:

- [Browser](https://www.google.com/intl/pt-BR/chrome/)

### Como rodar na minha máquina?

- Baixe o repositório `https://github.com/Matheuscrz/Projeto-Estudantil.git`
- Abra o arquivo `index.html` com seu navegador.
- Pronto 🎉

### Estrutura do projeto

- `index`: É a base do projeto, toda a interface foi trabalhada sob ele, feito de maneira simples mas sempre buscando ser responsivo. Composto por 5 scripts que implementam algumas funcionalidades e executam a construção dos gráfico [ChartJS](https://www.chartjs.org/) e o autocomplete de texto [TypeaHead](https://twitter.github.io/typeahead.js/).
- `style`: É o responsável por toda a responsividade da interface. Algumas de suas classes permite que o `TypeaHead` funcione sem obstruir o restante da interface.
- `script`: É o responsável pelo funcionamento do autocomplete e montagem do gráfico. Através da coleta de informações do banco local ele preenche sua base de dados da função TypeHead que junto com o [JQuery](https://jquery.com/) permitem o autocomplete do usuário. Após o envio dos dados do (**"Pressionar' o botão"**) o texto do `input` e coletado e processado na função `process` que ira executar a montagem do gráfico na interface web.

### Como me localizar no projeto?

- Todas as páginas do projeto estão listadas em `./Web`.
- `./Data`: É o local de armazenamento local dos dados para geração dos gráficos. Eles são todos os pedaços primordiais da interface.

#### Como Usar?

1. Digite o nome do curso que deseja consultar **SEM ACENTOS, CEDILHA E CARACTERES ESPECIAIS.**

## ![Quadro01](./Area%20de%20Pesquisa.png)

2. Aperta em **GERAR** para o gráfico ser montado.

## ![Quadro02](./Interface%20Web.png)

#### Descrição do aplicativo

1. O usuário ira pesquisar um nome de um curso.

2. O programa irá gerar o gráfico do curso pesquisado a partir de dados da base de dados local.
