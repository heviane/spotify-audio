// Factory (inicializa tudo)
// É um padrão de projeto bem conhecido

// Qdo for module interno do projeto sempre colocar a extensão...
import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

// tem que funcionar tanto em desenv como em produção, pegar a current url
const url = `${window.location.origin}/controller`

// em vez de NEW, criado função estática initialize() no Controller
Controller.initialize({
    view: new View(),
    service: new Service({url})
});
