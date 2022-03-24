# Notes

Frontend e Backend juntos, geralmente se divide em projetos separados.

O layout é ficticio, será implementado apenas o player.

- **Aula 01**: OK
  - Estruturação do projeto em camadas de forma reutilizável
  - Criaçção do servidor **server.js** e da infraestrutura **index.js**
  - Criação de entrega estática de de arquivos para o cliente com node streams
  - Criação de tratamento para erros na API
  - Criação de testes unitários com 100% de cobertura para as rotas

- **Aula 02**: OK
  - Converter a app para trabalhar com docker
  - Preparar os audios para serem editados
  - Processar audio sob demanda em stream para o cliente
  - Iniciar a implementação do controle de transmissão
  - Implementar testes e2e (integração) no backend
  - Implementar testes unitários no frontend

- **Aula 03**: OK
  - Deploy in Heroku with docker

## Requeriments ✅

- [Node](https://nodejs.org)
- [Pino](https://getpino.io)
- [Jest](https://jestjs.io)
- [Docker](https://www.docker.com)

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
