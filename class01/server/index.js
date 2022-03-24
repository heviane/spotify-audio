// Responsible for instantiating the server and exposing it on the web (infrastructure)
import server from "./server.js"; // import the server
import {logger} from "./util.js"; // import the logger
import config from "./config.js"; // import the config

// console.info(config);

server
    // listen on port 3000
    .listen(config.port) 
    // listen for events
    .on('listening', () => logger.info(`server running at ${config.port}`))
    // listen for errors
    .on('error', (err) => logger.error(err));
