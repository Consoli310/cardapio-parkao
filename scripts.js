document.querySelector('form.list').addEventListener('submit', function(event) {
  event.preventDefault();

  // Seleciona a div onde o texto vai aparecer
  const textoGerado = document.querySelector('.textoGerado');

  // Limpa texto anterior
  textoGerado.innerHTML = '';

  // Função para pegar valores > 0 dos inputs dentro de um container
  function pegarItensComQuantidade(containerSelector) {
    const container = document.querySelector(containerSelector);
    const itens = container.querySelectorAll('input[type="number"]');
    const resultado = {};

    itens.forEach(input => {
      const valor = Number(input.value);
      if (valor > 0) {
        // Pega o label associado pelo for = id do input
        const label = container.querySelector(`label[for="${input.id}"]`);
        const nome = label ? label.textContent.replace(':', '').trim() : input.id;
        resultado[nome] = valor;
      }
    });

    return resultado;
  }

  // Pega salgados e doces com quantidade
  const salgados = pegarItensComQuantidade('.salgados');
  const doces = pegarItensComQuantidade('.doces');

  // Pega bolo selecionado (radio com name="bolo")
  const boloRadio = document.querySelector('input[name="bolo"]:checked');
  const boloNome = boloRadio ? document.querySelector(`label[for="${boloRadio.id}"]`).textContent.trim() : null;

  // Pega quantidade do bolo
  const quantidadeBoloInput = document.getElementById('quantidadeBolo');
  const quantidadeBolo = Number(quantidadeBoloInput.value);

  // Monta texto do pedido
  let texto = '';

  if (Object.keys(salgados).length > 0) {
    texto += '<strong>Salgados:</strong><br>';
    for (const [nome, qtd] of Object.entries(salgados)) {
      texto += `- ${nome}: ${qtd} unidades<br>`;
    }
  }

  if (Object.keys(doces).length > 0) {
    texto += '<strong>Doces:</strong><br>';
    for (const [nome, qtd] of Object.entries(doces)) {
      texto += `- ${nome}: ${qtd} unidades<br>`;
    }
  }

  if (boloNome) {
    texto += `<strong>Bolo escolhido:</strong> ${boloNome}<br>`;
    if (quantidadeBolo > 0) {
      texto += `<strong>Quantidade do bolo:</strong> ${quantidadeBolo} kg<br>`;
    } else {
      texto += `<em>Quantidade do bolo não informada.</em><br>`;
    }
  } else {
    texto += '<em>Nenhum bolo escolhido.</em><br>';
  }

  textoGerado.innerHTML = texto;
});
