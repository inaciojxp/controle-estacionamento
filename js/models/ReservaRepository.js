/**
 * MODEL - ReservaRepository
 * Camada de dados. Como não há back-end, usa o localStorage do navegador.
 * Métodos: listar, salvar, remover (+ consultas de vagas).
 */
const ReservaRepository = (() => {
  const CHAVE = "estacionamento.reservas";
  const TOTAL_VAGAS = 20;

  // Dados fictícios, carregados na primeira visita
  const DADOS_INICIAIS = [
    { id: 1, placa: "ABC-1234", proprietario: "Marina Souza", apartamento: "101", bloco: "A", modelo: "Honda Civic", cor: "Prata", vaga: 1 },
    { id: 2, placa: "QWE4R56", proprietario: "Carlos Almeida", apartamento: "204", bloco: "B", modelo: "Fiat Argo", cor: "Vermelho", vaga: 3 },
    { id: 3, placa: "XYZ-9087", proprietario: "Juliana Prado", apartamento: "302", bloco: "A", modelo: "Toyota Corolla", cor: "Preto", vaga: 4 },
    { id: 4, placa: "JKL2M34", proprietario: "Roberto Lima", apartamento: "12", bloco: "C", modelo: "VW Polo", cor: "Branco", vaga: 8 },
    { id: 5, placa: "MNO-5521", proprietario: "Patrícia Gomes", apartamento: "407", bloco: "B", modelo: "Hyundai HB20", cor: "Azul", vaga: 11 },
  ];

  function gravar(lista) {
    try { localStorage.setItem(CHAVE, JSON.stringify(lista)); }
    catch (e) { console.error("Falha ao gravar no armazenamento:", e); }
  }

  function ler() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (bruto === null) { gravar(DADOS_INICIAIS); return [...DADOS_INICIAIS]; }
      return JSON.parse(bruto);
    } catch (e) {
      console.error("Falha ao ler o armazenamento:", e);
      return [...DADOS_INICIAIS];
    }
  }

  return {
    TOTAL_VAGAS,

    /** Lista todas as reservas, ordenadas pelo número da vaga. */
    listar() {
      return ler().map((r) => new Reserva(r)).sort((a, b) => a.vaga - b.vaga);
    },

    /** Salva uma nova reserva. Lança erro se a vaga ou a placa já estiverem em uso. */
    salvar(reserva) {
      const lista = ler();
      if (lista.some((r) => Number(r.vaga) === reserva.vaga)) throw new Error(`A vaga ${reserva.vaga} já está ocupada.`);
      if (lista.some((r) => r.placa.replace("-", "") === reserva.placa.replace("-", ""))) throw new Error(`A placa ${reserva.placa} já possui uma vaga.`);
      lista.push(reserva);
      gravar(lista);
      return reserva;
    },

    /** Remove a reserva pelo id e libera a vaga. */
    remover(id) {
      gravar(ler().filter((r) => r.id !== id));
    },

    /** Números das vagas ocupadas. */
    vagasOcupadas() {
      return ler().map((r) => Number(r.vaga));
    },

    /** Números das vagas livres. */
    vagasDisponiveis() {
      const ocupadas = new Set(this.vagasOcupadas());
      return Array.from({ length: TOTAL_VAGAS }, (_, i) => i + 1).filter((n) => !ocupadas.has(n));
    },
  };
})();
