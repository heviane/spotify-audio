# Buscar a imagem (slim é baseada no Ubuntu)
FROM node:17-slim 

# Instalar o sox
RUN apt-get update \
    && apt-get install -y sox libsox-fmt-mp3
    ## Instalação dos Codecs (Para todos os formatos de audio ou apenas para o formato mp3)
        ## libsox-fmt-all
        ## libsox-fmt-mp3

# Criar o diretório de trabalho dentro do container
WORKDIR /spotify-radio/

# Copiar (os arquivos de configuração para fazer cache) do local para o container
## Instala tudo uma vez, deixa no cache, e depois só instala o que for modificado
COPY package.json package-lock.json /spotify-radio/

# Restaurar os pacotes
RUN npm ci --silent

# Copiar todos os arquivos
## Por estarmos usando WORKDIR o ponto vai fazer a referencia automaticamente
COPY . .

# Boa prática, pois este user não tem acesso a máquina local
USER node

# Quais comandos executar quando o container for iniciado
CMD npm run live-reload
