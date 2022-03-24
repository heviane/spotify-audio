# Tests

Não fizemos TDD, porque fizemos os testes depois das implementações.

- **TDD (Test-driven development)**: O _desenvolvimento orientado a testes_ é um processo de desenvolvimento de software baseado em requisitos de software sendo convertidos em casos de teste antes que o software seja totalmente desenvolvido e rastreando todo o desenvolvimento de software testando repetidamente o software em todos os casos de teste.
  - Passo 1: Fase vermelha, escreva um teste.
  - Passo 3: Fase azul, refatorar.
  - Passo 5: Fase verde, faça o teste passar.

## Types of Tests

- **Unit Test**: Sempre off-line e sem dependências (infraestrutura, internet, SO, BD, App, etc.)
É um teste realizado do ponto de vista do código.

- **e2e Test (Integration/Functional)**: Iteração, comunicação entre apps, funcionalidades.

## Testing from the command line 🚧

```bash
    #!/bin/bash

    ## GET
    curl -i localhost:3000   # header
    curl localhost:3000      # body
    curl localhost:3000/home # body

    ## POST
    curl -X POST -i localhost:3000 # header
    curl -X POST localhost:3000    # body
```

## Debugging

- Marcar as linhas onde serão os breakpoints
- Parar o servidor
- Abrir a index.js (Responsável por subir o servidor)
- Executar F5 (Run and debug) para entrar em modo DEBUG
- Ir dando play a cada breakpoint
- Visualizar
  - Visualizar na linha do **breakpoint** (Passar mouse por cima da parte amarelada)
  - Visualizar o **Debug Console**
  - Visualizar na aba **"Run and Debug"**

## References ✅

- [https://curl.se](https://curl.se)
- [https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html](https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html)
