/* Layer: Presentation, responsible for route management */
import config from './config.js';
import {Controller} from './controller.js';
import {logger} from './util.js';

const {
    location,
    pages: {
        homeHTML,
        controllerHTML
    },
    constants: {
        CONTENT_TYPE
    }
} = config;

// Instanciar a controller, que vai intermediar tudo com a rota
const controller = new Controller();

async function routes(req, res){
    // Criação das rotas
    const { method, url } = req; 
    // rota "/" = Redirecionamento para rota "/home"
    if(method === 'GET' && url === '/'){
        res.writeHead(302, {
            'Location': location.home
        });
        return res.end();
    }
    // rota "/home"
    if(method === 'GET' && url === '/home'){
        const {
            stream
        } = await controller.getFileStream(homeHTML);
        // Tudo que estiver chegando aqui, enviar para o consumidor
        // O consumidor é o frontend
        // A camada de ftontend é o response
        // O padrão do response é text/html
        // res.writeHead(200, {'content-type': type});// Já faz o padrão auto
        return stream.pipe(res);
    }
    // rota "/controller"
    if(method === 'GET' && url === '/controller'){
        const {
            stream
        } = await controller.getFileStream(controllerHTML);
        return stream.pipe(res);
    }
    // static files
    if(method === 'GET'){
        /* Para arquivos estáticos precisamos saber qual content-type e qual rota chamou.
            Porque pode ter arquivos, dentro de arquivos, que chamam arquivos...
        */
        const { 
            stream, type
        } = await controller.getFileStream(url);
        
        const contentType = CONTENT_TYPE[type];
        if(contentType){
            res.writeHead(200, {
                'Content-Type': contentType 
            })
        }
        return stream.pipe(res);
    }
    res.writeHead(404);
    return res.end();
}

function handleError(error, res){
    if(error.message.includes('ENOENT')){
        logger.warn(`asset not found ${error.stack}`); // Causa erro nos testes
        console.log(`asset not found ${error.stack}`); // NÃO causa erro nos testes, apenas suja o ambiente
        res.writeHead(404); // Not found
        return res.end();
    }
    logger.error(`caught error on API ${error.stack}`);
    res.writeHead(500); // Internal server error
    return res.end();
}

// handler é função síncrona, porque createServer() não manipula promises
export function handler(req, res){
    return routes(req, res)
    .catch(err => handleError(err, res));
}
