# Controle de Estacionamento

Aplicação front-end para controle de vagas de estacionamento de um condomínio, feita **apenas com HTML, CSS e JavaScript** (sem frameworks).

## Telas
- `index.html`: lista as reservas, mostra o mapa de vagas (livres/ocupadas), busca e remoção.
- `cadastro.html`: formulário de nova reserva (placa, proprietário, apartamento, bloco, modelo, cor e vaga). Ao salvar, os dados vão para o `console.log` e um pop-up confirma o cadastro.

## Arquitetura (MVC)
```
├── index.html
├── cadastro.html
├── css/style.css
└── js/
    ├── models/
    │   ├── Reserva.js              # entidade + validações
    │   └── ReservaRepository.js    # listar(), salvar(), remover() (localStorage)
    ├── views/
    │   ├── ListaView.js            # desenha mapa, resumo e tabela
    │   └── CadastroView.js         # lê o formulário, erros e pop-up
    └── controllers/
        ├── ListaController.js
        └── CadastroController.js
```
- **Model**: dados e regras (vaga/placa únicas, validação de campos).
- **View**: só manipula o DOM.
- **Controller**: conecta eventos da View com o Model.

## Como executar
Abra o `index.html` no navegador (não precisa de servidor nem instalação).
Os dados ficam no `localStorage`; as 5 reservas iniciais são fictícias.
