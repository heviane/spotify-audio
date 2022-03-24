# Notes

Frontend e Backend juntos, geralmente se divide em projetos separados.

O layout é ficticio, será implementado apenas o player.

- **Aula 01**: OK
  - Criar a estrutura do backend
  - Criar o servidor **server.js** e a infraestrutura **index.js**
  - Criar a entrega estática de de arquivos para o cliente com node streams
  - Criar o tratamento para erros na API
  - Criar os testes com 100% de cobertura para o **routes.js**

- **Aula 02**: OK
  - Preparar os audios para serem editados
  - Fazer a stream do audio para o cliente
  - Iniciar a implementação do controle de transmissão

- **Aula 03**: OK

**Últimos commits**:

## Requeriments ✅

- [Node](https://nodejs.org)
- [Pino](https://getpino.io)
- [Jest](https://jestjs.io)

## Project Startup 🚧

```bash
    #!/bin/bash

    # Inicializar o prjeto
    npm init 

    # Incluir ECMAscript module no "package.json"
    "type":"module", 

    # Incluir a versão do Node no "package.json" 
    ## Documentation and Deploy in cloud
    "engines":{
        "node":"17"
    },

    # Incluir o script para a execução no "package.json"
    "scripts": {
        "start":"node ./server/index.js"
    },

    # Executar o script "start"
    npm start
```

## [Nodemon](https://nodemon.io) Installation

```bash
    #!/bin/bash

    npm i -D nodemon

    # Incluir o script no "package.json"
    "scripts": {
        "start": "node ./server/index.js",
        "live-reload":"nodemon ./server/index.js"
    },

    # Executar o script "live-reload"
    npm run live-reload
```

## [Pino](https://getpino.io) Installation

Library to work with logs without losing performance.

```bash
    #!/bin/bash

    npm install pino@7.8.0 pino-pretty@7.5.3
```

## References

- [Node Streams](https://nodejs.org/dist/latest-v17.x/docs/api/stream.html)
