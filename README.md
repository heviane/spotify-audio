# Spotify Radio - Semana JS Expert 6.0 📻

Repositório criado para acompanhar a [Semana Javascript Expert](https://github.com/ErickWendel/semana-javascript-expert06) com [github.com/ErickWendel](https://github.com/ErickWendel)

Marque esse projeto com uma estrela 🌟

## Preview

![preview](./class03/prints/demo.png)

## Checklist Features

- Web API
  - [ ] Deve atingir 100% de cobertura de código em testes
  - [ ] Deve ter testes de integração validando todas as rotas da API
  - [X] Deve entregar arquivos estáticos como Node.js Stream
  - [X] Deve entregar arquivos de música como Node.js Stream
  - [X] Dado um usuário desconectado, não deve quebrar a API
    - Fechar as várias abas do browser com o audio em execução
  - [ ] Mesmo que vários comandos sejam desparados ao mesmo tempo, não deve quebrar a API
  - [X] Caso aconteça um erro inesperado, a API deve continuar funcionando
  - [X] O projeto precisa ser executado em ambientes Linux, Mac e Windows
    - Sim, porque está no docker.

- Web App
  - Client
    - [X] Deve reproduzir a transmissão
    - [ ] Não deve pausar se algum efeito for adicionado
  - Controller
    - [ ] Deve atingir 100% de cobertura de código em testes
    - [ ] Deve poder iniciar ou parar uma transmissão
    - [ ] Deve enviar comandos para adicionar audio efeitos à uma transmissão

## Tarefas por aula

- Aula 01: Cobrir as camadas service e route com testes unitários e alcançar 100% de code coverage
- Aula 02: Manter 100% de code coverage e implementar testes e2e para toda a API
- Aula 03: implementar testes unitários para o frontend e manter 100% de code coverage
- **PLUS**:
  - [ ] disponibilizar um novo efeito
    - [ ] adicionar um botão novo no controlador
    - [ ] adicionar um som de efeito novo para a pasta `audios/fx/`
    - [ ] republicar no heroku

### Créditos aos áudios usados

#### Transmissão

- [English Conversation](https://youtu.be/ytmMipczEI8)

#### Efeitos

- [Applause](https://youtu.be/mMn_aYpzpG0)
- [Applause Audience](https://youtu.be/3IC76o_lhFw)
- [Boo](https://youtu.be/rYAQN11a2Dc)
- [Fart](https://youtu.be/4PnUfYhbDDM)
- [Laugh](https://youtu.be/TZ90IUrMNCo)

## FAQ

- `NODE_OPTIONS` não é um comando reconhecido pelo sistema, o que fazer?
  - Se você estiver no Windows, a forma de criar variáveis de ambiente é diferente. Você deve usar a palavra `set` antes do comando.
  - Ex: `"test": "set NODE_OPTIONS=--experimental-vm-modules && npx jest --runInBand",`

- Rodei `npm test` mas nada acontece, o que fazer?
  - Verifique a versão do seu Node.js. Estamos usando na versão 17. Entre no [site do node.js](https://nodejs.org) e baixe a versão mais recente.
