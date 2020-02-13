# Boas vindas ao repositório do projeto de Context API e Hooks!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo e, se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

## O que deverá ser desenvolvido

Você vai refatorar um projeto em React desenvolvido no módulo 16, [Starwars Datatable Filters](https://github.com/tryber/sd-01-week18-react-context-hooks-starwars-datatable-filters), substituindo React por Context API e Hooks para controlar estado.

Você também adicionará testes a sua aplicação antes de refatorá-la, de forma a garantir o mesmo comportamento após a transição de Redux para Context API e Hooks.

## Desenvolvimento

Este repositório já contém um _template_ de uma aplicação React criado e configurado. Após clonar o projeto e instalar as dependências (mais sobre isso abaixo), você deverá copiar os arquivos que criou ou modificou no projeto anterior para este repositório. Veja [aqui](#copiando-os-arquivos-entre-projetos) instruções de como fazer isso de uma forma fácil.

Caso não tenha realizado o projeto anterior, você deverá implementar todos os requisitos obrigatórios do projeto anterior e os novos requisitos do projeto atual. Contudo, não é necessário primeiro desenvolver o projeto com Redux para então substituí-lo por Context API e Hooks.

Um dos requisitos deste projeto é a adição de testes. Recomendamos que você escreva os testes e garanta uma boa cobertura antes de começar a trabalhar na refatoração. Dessa forma, durante o desenvolvimento, você terá segurança de que sua aplicação continua funcionando conforme especificado, sem precisar testá-la manualmente a todo momento. Além disso, você treinará escrever testes baseados em comportamento - se seus testes começaram a falhar após a transição, é um sinal de que eram dependentes de implementação e não do comportamento da sua aplicação. Este processo - escrever testes agnósticos em relação à implementação - não é fácil, mas é uma habilidade importante de se desenvolver.

### Copiando os arquivos entre projetos

Supondo que seus projetos passado e atual estejam, respectivamente, nos diretórios `sd-01-week16-react-redux-starwars-datatable-filters` e `sd-01-week18-react-context-hooks-starwars-datatable-filters` dentro do mesmo diretório em sua máquina, execute o comando a seguir para copiar entre projetos.

```shell
cd <diretorio onde estão seus projetos>
cp -av sd-01-week16-react-redux-starwars-datatable-filters/src/ sd-01-week18-react-context-hooks-starwars-datatable-filters/src/
```

Atente para a barra (`/`) ao final dos nomes dos diretórios. Adapte os comandos com os nomes dos diretórios onde estão seus repositórios em sua máquina local.

## Requisitos do projeto

A seguir, estão listados todos os requisitos do projeto. Para conveniência, os requisitos do projeto 16 foram transcritos aqui, com as devidas adaptações, quando necessário, para o contexto do atual projeto.

### 1 - A cobertura de testes do projeto deve ser maior que ou igual a 90%

### 2 - O projeto deve ser feito, necessariamente, utilizando Context API e Hooks para controlar estado

Não pode haver nenhum tipo de código Redux no seu projeto - _stores_, _actions_, _reducers_, _action creators_. Lembre-se de desinstalar o **Redux** e quaisquer dependências relacionadas após a conclusão, caso seu projeto dê continuidade ao projeto anterior.

O estado especificado nos requisitos deve ser controlado fazendo uso **unicamente** de **Context API** e **Hooks**. 

Contudo, caso julgue necessário manter informações de estado além do especificado nestes requisitos, você poderá decidir entre armazenar tal estado em um componente ou em um contexto, mas não no **Redux**.

### 3 - Todos os componentes da aplicação devem ser componentes de função

O uso de **Hooks** torna desnecessária a criação de componentes de classe. Portanto, você deverá converter quaisquer componentes de classe que tenha escrito para componentes de função.

### 4 - Fazer uma requisição para o endpoint `/planets` da API de Star Wars e preencher uma tabela com os dados retornados, com exceção dos da coluna `residents`

A tabela deve ser renderizada por um componente chamado `<Table />`. Os dados recebidos da API devem ser salvos num campo chamado `data` do contexto e é daí que a tabela deve lê-los. A requisição deve ser feita num componente separado do componente da tabela.

### 5 - Sua página deve ter um campo de texto que filtra a tabela para somente exibir planetas cujos nomes incluam o texto digitado

Ele deve atualizar a tabela com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter que apertar um botão para efetuar a filtragem. Por exemplo, se digitar "Tatoo", o planeta "Tatooine" deve ser exibido. Você deve usar **Context API** e **Hooks** para fazer o gerenciamento do estado da aplicação e o texto digitado deve ser salvo num campo `filters: { name }`.

### 6 - Sua página deve ter um filtro para valores numéricos

Ele funcionará com três seletores:

  - O primeiro deve abrir um dropdown que permita a quem usa selecionar uma das seguintes colunas: `population`, `orbital_period`, `diameter`, `rotation_period` e `surface_water`.
  - O segundo deve determinar se a faixa de valor será `Maior que`, `Menor que` ou `Igual a` o numero que virá a seguir.
  - O terceiro deve ser uma caixa de texto que só aceita números.

A combinação desses três seletores deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos. Por exemplo:
  - A seleção `population | maior que | 100000` - Seleciona somente planetas com mais de 100000 habitantes.
  - A seleção `diameter | menor que | 8000` - Seleciona somente planetas com diâmetro menor que 8000.

Você deve usar **Context API** e **Hooks** para fazer o gerenciamento do estado da aplicação. No contexto, esses valores devem ser salvos nos campos `filters [{ numeric_values: { column, comparison, value } }]`

### 7 - Sua página deverá ser carregada com somente um filtro de valores numéricos

Caso um filtro seja totalmente preenchido, um novo filtro de valores numéricos deve ser carregado. Este novo filtro não deve incluir quaisquer colunas que já tenham sido selecionadas em filtros de valores numéricos anteriores. Caso todas as colunas já tenham sido inclusas em filtros anteriores, não deve ser carregado um novo filtro. Você deve usar **Context API** e **Hooks** para fazer o gerenciamento do estado da aplicação.

Por exemplo: O primeiro filtro tem as seguintes seleções: `population | maior que | 100000`. Um segundo filtro deve aparecer após essas seleções serem todas feitas e, no primeiro dropdown deste segundo filtro, a opção `population` deve estar ausente.

### 8 - Cada filtro de valores numéricos deve ter um ícone de `X` que, ao ser clicado, o apaga e desfaz suas filtragens dos dados da tabela

A coluna que este filtro selecionava deve passar a ficar disponível nos dropdowns dos demais filtros já presentes na tela. Você deve usar **Context API** e **Hooks** para fazer o gerenciamento do estado da aplicação.

## BÔNUS

### 9 - As colunas da tabela devem ser ordenáveis de forma ascendente ou descendente

A informação acerca da ordenação das colunas deve ser armazenada nos campos `filters: { column: 'Name', order: 'ASC'}`, o campo column representa o nome da coluna a ordenar e order representa a ordenação, sendo 'ASC' ascendente e 'DESC' descendente. Por padrão, a tabela começa ordenada pela coluna 'Name' em ordem ascendente.

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  * `git clone git@github.com:tryber/sd-01-week18-react-context-hooks-starwars-datatable-filters`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `sd-01-week18-react-context-hooks-starwars-datatable-filters`

2. Instale as dependências
  * `npm install`

3. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora crie uma branch para a qual você vai submeter os `commits` do seu projeto
    * Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    * Exemplo: `git checkout -b joaozinho-react-context-hooks-starwars-datatable-filters`


4. Crie um contexto. Por exemplo, se você quer nomear seu contexto `StarWarsContext`, e colocá-lo no diretório `context` dentro de `src`, faça:

```sh
mkdir src/context
touch src/context/StarWarsContext.js
```

E em `src/context/StarWarsContext`:

```jsx
import { createContext } from 'react';

const StarWarsContext = createContext();

export default StarWarsContext;
```

5. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças ainda não estão no _stage_
    * Exemplo: `git status` (deve aparecer listado o arquivo _src/context/StarWarsContext.js_ em vermelho)
  * Adicione o arquivo alterado ao _stage_ do Git
      * Exemplo:
        * `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
        * `git status` (deve aparecer listado o arquivo _src/context/StarWarsContext.js_ em verde)
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto 18. VAMOS COM TUDO :rocket:'` (fazendo o primeiro commit)
        * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

6. Adicione a sua branch com o novo `commit` ao repositório remoto
  * Usando o exemplo anterior: `git push -u origin joaozinho-react-context-hooks-starwars-datatable-filters`

7. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-01-week18-react-context-hooks-starwars-datatable-filters/pulls)
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  * **Não se preocupe em preencher mais nada por enquanto!**
  * Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-01-week18-react-context-hooks-starwars-datatable-filters/pulls) e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

* ⚠ **LEMBRE-SE DE CRIAR TODOS OS ARQUIVOS DENTRO DA PASTA COM O SEU NOME** ⚠

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

* Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  * No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  * No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  * No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-01`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros estudantes forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
