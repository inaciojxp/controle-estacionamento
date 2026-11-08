/**
 * CONTROLLER - ListaController
 * Liga o Model (ReservaRepository) à View (ListaView) na tela de listagem.
 */
const ListaController = (() => {
  let termo = "";

  function filtrar(reservas) {
    const t = termo.trim().toLowerCase();
    if (!t) return reservas;
    return reservas.filter((r) =>
      [r.placa, r.proprietario, r.apartamento, r.bloco, r.modelo, r.cor, r.vaga].join(" ").toLowerCase().includes(t));
  }

  function atualizar() {
    const reservas = ReservaRepository.listar();
    ListaView.renderResumo(ReservaRepository.TOTAL_VAGAS, reservas.length);
    ListaView.renderMapa(ReservaRepository.TOTAL_VAGAS, reservas);
    ListaView.renderTabela(filtrar(reservas), remover);
  }

  function remover(reserva) {
    ListaView.confirmarRemocao(reserva, () => {
      ReservaRepository.remover(reserva.id);
      console.log("Reserva removida:", reserva);
      atualizar();
    });
  }

  return {
    iniciar() {
      ListaView.aoBuscar((valor) => { termo = valor; atualizar(); });
      atualizar();
    },
  };
})();

document.addEventListener("DOMContentLoaded", ListaController.iniciar);
