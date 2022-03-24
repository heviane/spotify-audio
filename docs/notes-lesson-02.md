# Notes - Lesson 02 📚

- Converter a app para trabalhar com docker
- Preparar os audios para serem editados
- Processar audio sob demanda em stream para o cliente
- Iniciar a implementação do controle de transmissão
- Implementar testes e2e (integração) no backend
- Implementar testes unitários no frontend

## Terminal 🚧

```bash
    #!/bin/bash

    # Matar a node_modules
    rm -rf node_modules

    # Divisão das aulas
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
