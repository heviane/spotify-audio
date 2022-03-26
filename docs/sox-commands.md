# Sox Commands 💻

22min10s...

## Terminal do container do docker

```bash
    #!/bin/bash

    # ------- Objetivo é converter Bit Rate dos efeitos para o mesmo do audio (padronizar)

    # Consultar informações sobre determinado audio
        ## --i p informações
        ## Bit Rate (Taxa de bits por segundo que pode ser transmitida via rede)
        ## Sample rate
        ### Estas inf tem que ser iguais, no audio e no efeito
    sox \
        --i \
        "audio/songs/conversation.mp3"

    # Obter o Bit Rate
    sox \
        --i \
        - B \
        "audio/songs/conversation.mp3"
        
    # Converter audio para modificar a taxa de Bit Rate
        ## -v p volume em percentual, sempre que passa por uma alteração, reduz o volume
        ## -r p converter a taxa de Bit Rate
        ## -t p extensão do audio (1 entrada, 2 saída)
    sox \
        -v 0.99 \
        -t mp3 \
        "audio/fx/Boo.mp3" \
        -r 48000 \
        -t mp3 \
        "output.mp3"

    # ------- Bit Rate
    ## É o que será usado p definir quanto será disponibilizado p frontend consumir por vez
    ## É importante controlar esse fluxo para dar tempo de juntar o efeito no pedacinho de audio

    # ------- Concatenar dois audios
    ## -m p mergear
    sox \
        -t mp3 \
        -v 0.99 \
        -m "audio/songs/conversation.mp3" \
        -t mp3 \
        -v 0.99 \
        "audio/fx/Boo.mp3" \
        -t mp3 \
        "output.mp3"
```
