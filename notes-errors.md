# ERRORS 🟥

- listen EADDRINUSE: address already in use

## Processos do Node

```bash
    #!/bin/bash

    ## Lista todos os processos que estão usando a porta 3000
    lsof -i :3000

    ## Matar todos os processos do Node
    pkill node

    ## Mata um determinado processo através do PID
    kill -9 5805

    ## Mata todos os processos que estiverem usando a porta 3000
    kill $(lsof -t -i:3000)
```
