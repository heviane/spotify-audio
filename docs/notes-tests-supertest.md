# Tests with Jest 🧪

## [supertest](https://www.npmjs.com/package/supertest) 🚧

- **supertest**: Fornece uma abstração de alto nível para testar HTTP, enquanto ainda permite que você caia para a API de nível inferior fornecida pelo superagente.
- **portfinder**: Para criar testes independentes. Que um objeto não dependa do outro.

- testes **e2e** deverão ser realizados via docker porque instalamos o SoX somente via docker.

```bash
    #!/bin/bash

    # Installation
    npm i -D supertest@6.2.2 portfinder@1.0.28

    # Alterar script no "package.json"
    "scripts": {
        ## local
        "test:e2e": "LOG_DISABLED=true NODE_OPTIONS=--experimental-vm-modules jest --no-cache tests/e2e",

        ## docker (suíte inteira)
        "test:docker": "sudo docker-compose up test",
        "test:watch:docker": "sudo docker-compose up test-watch",
        "test:coverage:docker": "sudo docker-compose up test-coverage"       
    }

    # Add os testes (services) no "docker-compose.yml"
        test
        test-watch
        test-coverage

    # Executar testes
    npm run test:watch:docker
```

## References ✅
