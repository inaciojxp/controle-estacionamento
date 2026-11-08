/**
 * CONTROLLER - CadastroController
 * Recebe os dados da View, valida com o Model, salva e informa o resultado.
 */
const CadastroController = (() => {
  function salvar() {
    const reserva = new Reserva(CadastroView.lerFormulario());
    const erros = reserva.validar();
    CadastroView.mostrarErros(erros);
    if (Object.keys(erros).length) return;

    try {
      ReservaRepository.salvar(reserva);
    } catch (e) {
      // Vaga ou placa já em uso
      const campo = e.message.includes("placa") ? "placa" : "vaga";
      CadastroView.mostrarErros({ [campo]: e.message });
      CadastroView.preencherVagas(ReservaRepository.vagasDisponiveis());
      return;
    }

    console.log("Reserva cadastrada:", reserva);
    CadastroView.mostrarSucesso(reserva);
    CadastroView.limpar();
    CadastroView.preencherVagas(ReservaRepository.vagasDisponiveis());
  }

  return {
    iniciar() {
      CadastroView.preencherVagas(ReservaRepository.vagasDisponiveis());
      CadastroView.aoEnviar(salvar);
    },
  };
})();

document.addEventListener("DOMContentLoaded", CadastroController.iniciar);
