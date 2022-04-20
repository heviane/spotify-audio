# Project Structure 📑

Estruturação do projeto em camadas de forma reutilizável.

É mais uma divisão por responsabilidade do que um padrão de projeto.

Frontend e Backend dentro do mesmo projeto.

## Frontend 😮

- [public directory](../class03/public/)

A API do frontend é a api do browser, que é **"window"**.

- Divisão em diretórios por responsabilidades:
  - **controller**: Page para manipular os audios.
    - **index.html**: Main, arquivo de entrada.
    - **assets**: Diretório para artefatos estáticos.
    - **css**: Diretório para estilos.
    - **js**: Diretório para scripts.
      - **view.js**: Apresentação das telas, visualização (elementos HTML).
      - **service.js**: Regras de negócio.
      - **controller.js**: Controlador (intermediário) entre views e services.
      - **index.js**: Factory, inicializa tudo. É um padrão de projeto bem conhecido.

  - **home**: Page principal, tela de usuário para player.
    - **index.html**: Main, arquivo de entrada.
    - **assets**: Diretório para artefatos estáticos.
    - **css**: Diretório para estilos.
    - **js**: Diretório para scripts.

## Backend 🧰

A API do backend é a api do **node**.

- [server directory](../class03/server/)

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

## Tests 🧪

- [tests directory](../class03/tests/)

- **Suítes**: e2e e unit.
- **Camadas**: public e server.
