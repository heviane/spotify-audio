# Tests with Jest

- **router.js** implementado na aula.
- **service.js** challenge.
- **controller.js** challenge.

## [Jest](https://jestjs.io) 🚧

```bash
    #!/bin/bash

    # Installation
    npm i -D jest@27

    # Initialization ** Cria o file "jest.config.mjs" **
    npx jest --init

    # Incluído script "test" no "package.json"
    "scripts": {
        "test": "jest"
    },

    # Executar o script "test"
    npm t
    npm test
    npm run test

    # Alterar script "test" por causa de incompatibilidades com ECMAScript Module
    ## Usar a variável de ambiente NODE_OPTIONS
    "scripts": {
        "test": "NODE_OPTIONS=--experimental-vm-modules jest --no-cache"
    },

    ## Criar script para live-reload
    "scripts": {
        "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --no-cache --watchAll"
    },

    npm run test:watch

    ## Criar script para coverage, somente para a Suíte "tests/unit"
    ## Se tiver uma Suíte e2e, ela não vai colher para o coverage
    "scripts": {
        "test:coverage": "NODE_OPTIONS=--experimental-vm-modules jest --no-cache --coverage tests/unit"
    },

    npm run test:coverage

    # Pino (logs) causa erros na execução dos testes
    ## Solution: usar variável de ambiente "LOG_DISABLED" criada no file "util.js" 
    ## Inclui-lá no script do file "package.json"
    ### console.log() continua funcionando normalmente, somente pino que fica desabilitado
    "scripts": {
        "test": "LOG_DISABLED=true NODE_OPTIONS=--experimental-vm-modules jest --no-cache"
    },

```

## References ✅
