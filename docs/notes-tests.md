# Tests

## Testing from the command line 🚧

```bash
    #!/bin/bash

    ## GET
    curl -i localhost:3000   # header
    curl localhost:3000      # body
    curl localhost:3000/home # body

    ## POST
    curl -X POST -i localhost:3000 # header
    curl -X POST localhost:3000    # body

```

## Debugging

- Marcar as linhas onde serão os breakpoints
- Parar o servidor
- Abrir a index.js (Responsável por subir o servidor)
- Executar F5 (Run and debug) para entrar em modo DEBUG
- Ir dando play a cada breakpoint
- Visualizar
  - Visualizar na linha do **breakpoint** (Passar mouse por cima da parte amarelada)
  - Visualizar o **Debug Console**
  - Visualizar na aba **"Run and Debug"**

## References ✅

- [https://curl.se](https://curl.se)
- [https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html](https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html)
