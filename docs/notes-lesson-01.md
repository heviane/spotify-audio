# Notes - Lesson 01 📚

- Estruturação do projeto em camadas de forma reutilizável
- Criação do servidor **server.js** e da infraestrutura **index.js**
- Criação de entrega estática de de arquivos para o cliente com node streams
- Criação de tratamento para erros na API
- Criação de testes unitários com 100% de cobertura para as rotas
- **RESUMO**: Por enquanto, temos um servidor estático.

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

## [Nodemon](https://nodemon.io)

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

## [Pino](https://getpino.io)

Library to work with logs without losing performance.

```bash
    #!/bin/bash

    npm install pino@7.8.0 pino-pretty@7.5.3
```

## [Jest](https://jestjs.io)

- Instalação, configuração e execução:
![notes-tests-jest.md](notes-tests-jest.md)
