/**
 * VIEW - CadastroView
 * Lê o formulário, mostra erros e abre o pop-up de sucesso.
 */
const CadastroView = (() => {
  const $ = (id) => document.getElementById(id);
  const CAMPOS = ["placa", "proprietario", "apartamento", "bloco", "modelo", "cor", "vaga"];

  return {
    preencherVagas(vagas) {
      const select = $("vaga");
      select.replaceChildren(new Option(vagas.length ? "Selecione uma vaga" : "Nenhuma vaga disponível", ""));
      vagas.forEach((n) => select.append(new Option(`Vaga ${String(n).padStart(2, "0")}`, n)));
      select.disabled = vagas.length === 0;
    },

    lerFormulario() {
      return Object.fromEntries(CAMPOS.map((c) => [c, $(c).value]));
    },

    mostrarErros(erros) {
      CAMPOS.forEach((c) => {
        $("erro-" + c).textContent = erros[c] ?? "";
        $(c).setAttribute("aria-invalid", erros[c] ? "true" : "false");
      });
      const primeiro = CAMPOS.find((c) => erros[c]);
      if (primeiro) $(primeiro).focus();
    },

    limpar() {
      $("form-reserva").reset();
      this.mostrarErros({});
    },

    aoEnviar(callback) {
      $("form-reserva").addEventListener("submit", (e) => { e.preventDefault(); callback(); });
    },

    mostrarSucesso(reserva) {
      $("sucesso-texto").textContent = `${reserva.proprietario} agora tem a vaga ${String(reserva.vaga).padStart(2, "0")} para o veículo ${reserva.placa}.`;
      $("dialogo-sucesso").showModal();
    },
  };
})();
