// Responsible for instantiating the server
import {createServer} from 'http';   // import the http module
import {handler} from './routes.js'; // import the handler function

//Returns a new instance of Server
export default createServer(handler);
