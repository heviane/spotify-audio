# Notes - Lesson 02 📚

- Converção da app para trabalhar com docker
- Preparação os audios para serem editados
- Processamento de audio sob demanda em stream para o cliente
- Implementação do controle de transmissão
- Implementação dos testes e2e (integração) no backend
- Implementação dos testes unitários no frontend

- Tests:
  - O som toca uma vez, depois não toca mais. somente reiniciando o live-reload.

1h32m ...implementação do primeiro todo()

## Project Startup 🚧

```bash
    #!/bin/bash

    # Matar a node_modules
    rm -rf node_modules

    # Division of the project into classes
    mkdir class01
    mkdir class02
    cd class02

    # Restaurar os pacotes
    ## ci vai recuperar as mesmas versões que funcionaram na versão anterior
    npm ci --silent
    ## Após a restauração, executar os scripts do "package.json" para testar

    # Alteração dos scripts para eliminar os "warnings"
    ## Colocar aspas simples no conteúdo da variável de ambiente "NODE_OPTIONS"
    "test": "LOG_DISABLED=true NODE_OPTIONS='--experimental-vm-modules --no-warnings' jest --no-cache",
```

## [Docker](https://www.docker.com)

- Create the files in the project root directory:
  - **Dockerfile**: É a receita, o passo a passo.
  - **docker-compose.yml**: Para facilitar chamada do **Dockerfile** e não precisar ficar rodando muito comandos via terminal.

```bash
    #!/bin/bash

    # Check if it is installed and in which version
    docker --version         ## Docker version 20.10.12, build e91ed5707e
    docker-compose --version ## docker-compose version 1.29.2, build unknown

    # Incluir no "package.json" o script para dizer onde vai rodar.
    "scripts": {
      "live-reload:docker":"sudo docker-compose up live-reload"
    }

    # Inicializar a app no docker (Usar argumento --build somente na primeira vez):
    sudo docker-compose up --build

    # Executar o script
    npm run live-reload:docker
      ## ERROR 
        ### docker.errors.DockerException: Error while fetching server API version: ('Connection aborted.', PermissionError(13, 'Permission denied')
      ## SOLUTION
        ### incluir o comando "sudo" no script

    # Terminal do Docker + Comandos do Docker
    docker ps
    docker exec -it 7421d02ab755 bash
      ## node@7421d02ab755:/spotify-radio$
      npm run test  ## executando script localmente dentro container
      sox --version ## Verificar se "sox" está instalado e qual a versão
      apt list --installed ## Verificar se "libsox-fmt-mp3" está instalado e qual a versão

    # ----- Parar o docker, remover o volume e instalar lib localmente
    docker-compose down
    docker volume ls
    docker volume rm class02_node_modules
      
    ## Instalar localmente, pq qdo subir docker ele vai olhar node_modules local e já vai saber q tem essa lib
    npm i throttle@1.0.3

    ## Subir o server via docker novamente
      ## Se necessário, add arg --build no script para forçar a construção/reinicialização
      "live-reload:docker": "sudo docker-compose up --build live-reload"
```

## [SoX - Sound eXchange](http://sox.sourceforge.net): Audio Processing

É multiplataforma (windows, linux, Mac): Para usar no desenvolvimento, temos que baixar, instalar e configurar para cada uma das plataformas e garantir que funcione corretamente em todas.

Solution (Boa Prática): Toda vez que precisamos usar um **binário externo**, podemos usar o **Docker**, assim garantimos um único ambiente que é portável.

SoX foi usado neste projeto para realizar a concatenação de audios: baixar ou aumentar volume, adicionar efeitos, etc.

## Notes 📖

- **Codec** é um dispositivo ou programa de computador que codifica ou decodifica um fluxo de dados ou sinal. Codec é uma junção de codificador/decodificador.

## References ✅
