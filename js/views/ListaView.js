/**
 * VIEW - ListaView
 * Só desenha na tela (resumo, mapa de vagas e tabela). Não contém regra de negócio.
 */
const ListaView = (() => {
  const $ = (id) => document.getElementById(id);

  function celula(texto) {
    const td = document.createElement("td");
    td.textContent = texto; // textContent evita injeção de HTML
    return td;
  }

  return {
    renderResumo(total, ocupadas) {
      $("resumo-total").textContent = total;
      $("resumo-ocupadas").textContent = ocupadas;
      $("resumo-livres").textContent = total - ocupadas;
    },

    renderMapa(total, reservas) {
      const porVaga = new Map(reservas.map((r) => [r.vaga, r]));
      const mapa = $("mapa-vagas");
      mapa.replaceChildren();
      for (let n = 1; n <= total; n++) {
        const r = porVaga.get(n);
        const baia = document.createElement("div");
        baia.className = "baia " + (r ? "ocupada" : "livre");
        baia.setAttribute("role", "listitem");
        baia.setAttribute("aria-label", r ? `Vaga ${n}, ocupada por ${r.placa}` : `Vaga ${n}, livre`);
        const num = document.createElement("span");
        num.textContent = String(n).padStart(2, "0");
        const info = document.createElement("small");
        info.textContent = r ? r.placa : "Livre";
        baia.append(num, info);
        mapa.append(baia);
      }
    },

    renderTabela(reservas, aoRemover) {
      const corpo = $("tabela-corpo");
      corpo.replaceChildren();
      $("sem-resultados").hidden = reservas.length > 0;

      reservas.forEach((r) => {
        const tr = document.createElement("tr");
        tr.append(celula(String(r.vaga).padStart(2, "0")));

        const tdPlaca = document.createElement("td");
        const placa = document.createElement("span");
        placa.className = "placa";
        placa.textContent = r.placa;
        tdPlaca.append(placa);
        tr.append(tdPlaca);

        tr.append(celula(r.proprietario), celula(`${r.apartamento} / Bloco ${r.bloco}`), celula(r.modelo), celula(r.cor));

        const tdAcao = document.createElement("td");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn--perigo";
        btn.textContent = "Remover";
        btn.setAttribute("aria-label", `Remover reserva da vaga ${r.vaga}`);
        btn.addEventListener("click", () => aoRemover(r));
        tdAcao.append(btn);
        tr.append(tdAcao);

        corpo.append(tr);
      });
    },

    /** Abre o pop-up de confirmação de remoção. */
    confirmarRemocao(reserva, aoConfirmar) {
      const dlg = $("dialogo-remover");
      $("remover-texto").textContent = `A vaga ${reserva.vaga} (${reserva.placa}, ${reserva.proprietario}) será liberada.`;
      $("btn-confirmar-remover").onclick = () => { dlg.close(); aoConfirmar(); };
      $("btn-cancelar-remover").onclick = () => dlg.close();
      dlg.showModal();
    },

    aoBuscar(callback) {
      $("busca").addEventListener("input", (e) => callback(e.target.value));
    },
  };
})();
