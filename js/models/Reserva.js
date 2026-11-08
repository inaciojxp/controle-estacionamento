/**
 * MODEL - Reserva
 * Representa uma reserva de vaga e conhece as regras de validação.
 */
class Reserva {
  constructor({ id, placa, proprietario, apartamento, bloco, modelo, cor, vaga }) {
    this.id = id ?? Date.now();
    this.placa = String(placa ?? "").trim().toUpperCase();
    this.proprietario = String(proprietario ?? "").trim();
    this.apartamento = String(apartamento ?? "").trim();
    this.bloco = String(bloco ?? "").trim().toUpperCase();
    this.modelo = String(modelo ?? "").trim();
    this.cor = String(cor ?? "").trim();
    this.vaga = Number(vaga);
  }

  /** Retorna um objeto { campo: "mensagem" } com os erros encontrados. */
  validar() {
    const erros = {};
    // Aceita padrão antigo (ABC-1234 / ABC1234) e Mercosul (ABC1D23)
    if (!/^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/.test(this.placa)) erros.placa = "Informe uma placa válida, como ABC-1234 ou ABC1D23.";
    if (this.proprietario.length < 3) erros.proprietario = "Informe o nome completo do proprietário.";
    if (!/^\d{1,4}$/.test(this.apartamento)) erros.apartamento = "Informe apenas números (até 4 dígitos).";
    if (!this.bloco) erros.bloco = "Informe o bloco.";
    if (this.modelo.length < 2) erros.modelo = "Informe o modelo do veículo.";
    if (this.cor.length < 3) erros.cor = "Informe a cor do veículo.";
    if (!Number.isInteger(this.vaga) || this.vaga < 1) erros.vaga = "Escolha uma vaga disponível.";
    return erros;
  }
}
