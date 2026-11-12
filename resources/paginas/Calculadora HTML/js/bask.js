function calcularBhaskara() {
  //converto a entrada do teclado em um valor quebrado.
  //se o usuario deixa algum valor em branco, e atribuido 0 por padrão.
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value) || 0;
  const c = parseFloat(document.getElementById("c").value) || 0;

  //converte o valor digitado em um valor inteiro.
  //caso as casas ou alguma delas ficarem vazias, e passado 2 por padrão.
  const casas = parseInt(document.getElementById("decimais").value) || 2;
  const divResultado = document.getElementById("resultado");

  //faz a caixa aparecer na tela assim que o botão é clicado. (padrão: none)
  divResultado.style.display = "block";

  //verifica se um valor é inválido para contas matemáticas.
  //se for gera uma mensagem e retorna.
  if (isNaN(a) || a === 0) {
    divResultado.innerHTML =
      "<strong>Erro:</strong> O coeficiente <b>a</b> deve ser diferente de zero.";
    return;
  }

  //calculo usando a formula
  //uso toFixed pra aredondar o valor. exemplo (3.33333f) para (3.33).
  const delta = b * b - 4 * a * c;
  let texto = `<strong>Delta (Δ):</strong> ${delta.toFixed(casas)}<br>`;

  //verifica se a equação possui raízes (reais), ou não.
  if (delta < 0) {
    //se delta for menor que zero, então não existe raíz.
    texto += "A equação não possui raízes reais.";
  } else if (delta === 0) {
    //verifica se delta e igual a zero, se for então existe apenas uma unica raíz real.
    const x = -b / (2 * a);
    texto += `<strong>Raiz única (x):</strong> ${x.toFixed(casas)}`;
  } else {
    //se o delta não é menor que zero e também não é igual a zero,
    //então ele só pode ser positivo.
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    texto += `<strong>x₁:</strong> ${x1.toFixed(casas)}<br>`;
    texto += `<strong>x₂:</strong> ${x2.toFixed(casas)}`;
  }

  //passa o texto para a (<div>) para desenhar o resultado na tela.
  divResultado.innerHTML = texto;
}
