# Notes

Frontend e Backend juntos, geralmente se divide em projetos separados.

O layout é ficticio, será implementado apenas o player.

**Último Commit**: Test suite created, implementation missing
pause in 1h29min...Planejamento dos testes com todo()...falta implementação

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
