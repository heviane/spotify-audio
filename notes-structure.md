# Project Structure 📑

É mais uma divisão por responsabilidade em vez de um padrão de projeto!

## Frontend 😮

- [public directory](./public/)

- **assets**: Diretório para artefatos estáticos.
- **css**: Diretório para estilos.
- **js**: Diretório para scripts.
- **index.html**: Main, arquivo de entrada.
- Divisão em diretórios por responsabilidades:
  - **controller**: Page para manipular os audios.
  - **home**: Page principal, tela de usuário para player.

## Backend 🧰

- [server directory](./server/)

- **server.js**: Cria o servidor, mas não instância.
- **index.js**: Instância o servidor e expõe na web (infraestrutura).
Criar o servidor desacoplado porque na hora de realizar testes e2e pode ser que precisemos instancias vários servidores em diferentes portas.
- **service.js**: Business rule or processing.
- **controller.js**: Intermediate the presentation and the business.
- **routes.js**: Presentation.
routes chama controller que chama service e assim por diante.
routes nunca deve chamar a service diretamente.
O cliente vai interagir com a API, as rotas a partir do arquivo de rotas, que vai definir qual é o status code, qual arquivo entregar, como entregar, etc.
- **util.js**: Exportar o log (lib pino) para reutilização.
- **config**: Tudo que for estático do projeto.
Ex: string sensível, estrutura do frontend, etc.
