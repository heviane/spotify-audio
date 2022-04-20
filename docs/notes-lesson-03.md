# Notes - Lesson 03 📚

## Project Startup 🚧

```bash
   #!/bin/bash

 # matar a aula anterior
 rm -rf class02/node_modules

 # CTRL C + CTRL V no dir class02
 # Renomear para class03 e entrar nela
 cd class03

 # Recuperar os pacotes (Cria o dir node_modules)
 npm ci --silent

```

## [Docker](https://www.docker.com)

```bash
   #!/bin/bash

  # Rodar os testes
  npm test
  ## FAIL: tests/e2e/server/api.test.js
  ## ● API E2E Suite Test › client workflow › it should receive data stream if the process is playing
  ## spawn sox ENOENT
  ## *** Because you don't have sox installed on the machine ***
  ## *** It's installed in the docker container

  # Rodar os testes via Docker porque o sox está instalado somente lá
  npm run test:docker

  # executar o projeto
  npm run live-reload:docker
```

## Tests created

- [Teste unitário frontend](./tests/unit/public)
  - **view.test.js**: Testar a camada de apresentação.

## Running on localhost

- Case 1: Click somente no play da page home
  - Primeira vez: SIM
  - Demais vezes: NÃO
    - Somente após clicar em start na página controller p/ enviar stream novamente.

## [Heroku](https://www.heroku.com)

## References ✅
