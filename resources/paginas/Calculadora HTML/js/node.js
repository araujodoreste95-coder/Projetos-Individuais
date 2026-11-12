//seleciono os elementos do DOM que serão utilizados na calculadora.
const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operations");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    //propriedades de classe global da calculadora.
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;

    //registro de operações digitadas.
    this.currentOperation = "";
  }

  //====================================================================\\

  //método responsável por adicionar os dígitos [digitados] na operação atual.
  AddDigit(valueDG) {
    //verifica se já existe um ponto adicionado a operação atual, se sim, não adiciona outro ponto.
    if (valueDG === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    //Passo o "digito" digitado para a minha operação atual, é atualizo a tela da calculadora.
    this.currentOperation = valueDG;
    this.UpdateCalculator();
  }
  //====================================================================\\

  //método responsável por deletar o último dígito da operação atual.
  ProcessDeleteOperation() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  //====================================================================\\

  //método responsável por deletar a operação atual.
  ProcessDeleteCurrentOperation() {
    this.currentOperationText.innerText = "";
  }
  //====================================================================\\

  //método responsável por deletar todas as operações.
  ProcessDeleteAll() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  //====================================================================\\

  ProcessEqualOperation() {
    //pego segundo valor da operação anterior, que é a operação digitada,
    //e passo para o método ProcessOperations para realizar a operação matemática.
    const operation = this.previousOperationText.innerText.split(" ")[1];
    this.ProcessOperations(operation);
  }
  //====================================================================\\

  //método responsável por processar as operações matemáticas.
  ProcessOperations(operation) {
    //verifica se o valor da operação é [vazio] para não processar um calculo. se sim, apenas atualiza a operação.
    //e verifica se a operação digitada é diferente de "C", se sim, apenas atualiza a operação.
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.ChangeOperation(operation);
      }
      return;
    }

    //passa os valores da operação atual e anterior para variáveis, para [operationValue] realizar a operação matemática.
    let operationValue;
    const current = +this.currentOperationText.innerText;
    const previous = +this.previousOperationText.innerText.split(" ")[0];

    //verifica qual operação foi digitada e realiza a operação matemática correspondente.
    switch (operation) {
      case "+":
        this.Sum(operationValue, operation, current, previous);
        break;
      case "-":
        this.Subtract(operationValue, operation, current, previous);
        break;
      case "*":
        this.Multiply(operationValue, operation, current, previous);
        break;
      case "/":
        this.Divide(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.ProcessDeleteOperation();
        break;
      case "CE":
        this.ProcessDeleteCurrentOperation();
        break;
      case "C":
        this.ProcessDeleteAll();
        break;
      case "=":
        this.ProcessEqualOperation();
        break;
      default:
        return;
    }
  }
  //====================================================================\\

  //====================================================================\\

  //métodos responsáveis por realizar as operações matemáticas.
  Sum(operationValue, operation, current, previous) {
    operationValue = previous + current;
    this.UpdateCalculator(operationValue, operation, current, previous);
  }
  //====================================================================\\
  Subtract(operationValue, operation, current, previous) {
    operationValue = previous - current;
    this.UpdateCalculator(operationValue, operation, current, previous);
  }
  //====================================================================\\

  Multiply(operationValue, operation, current, previous) {
    operationValue = previous * current;
    this.UpdateCalculator(operationValue, operation, current, previous);
  }
  //====================================================================\\

  Divide(operationValue, operation, current, previous) {
    operationValue = previous / current;
    this.UpdateCalculator(operationValue, operation, current, previous);
  }
  //====================================================================\\

  //método responsável por atualizar a operação anterior com a operação digitada.
  ChangeOperation(operation) {
    //verifica se a operação digitada é uma das operações matemáticas, se não for, apenas ignora.
    const mathOperations = ["*", "/", "+", "-"];

    if (!mathOperations.includes(operation)) {
      return;
    } else {
      //atualiza a operação anterior com a operação digitada.
      this.previousOperationText.innerText =
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }
  }

  //método responsável por atualizar a tela da calculadora.
  UpdateCalculator(
    operationValue = null,
    operation = null,
    current = null,
    previous = null,
  ) {
    //verifica se o valor da operação é nulo, se sim, apenas atualiza a tela com a operação atual.
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //verifica se o valor da operação anterior é igual a zero, se sim, apenas atualiza a tela com a operação atual.
      if (previous === 0) {
        operationValue = current;
      }

      //atualiza a tela com a operação atual e a operação anterior.
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
}

//instancio a classe Calculator, passando os elementos do DOM que serão utilizados na calculadora.
const calc = new Calculator(previousOperationText, currentOperationText);

//Listo todos os elementos "Botão" que existem no container de botóes e adiciono
//um evento de click para cada botão, que ao ser clicado, chama a função AddDigit
//passando o valor do botão clicado.
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.AddDigit(value);
    } else {
      calc.ProcessOperations(value);
    }
  });
});
