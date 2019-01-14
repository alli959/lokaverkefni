require('dotenv').config();
const express = require('express');

const food = require('./orderFood');

//the host and the port that the backend uses
const {
    PORT: port = 5000,
    HOST: host = '127.0.0.1',
} = process.env;

const app = express();

//giving the frontend access to the backend, with GET, POST PATCH, DELETE
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});


app.use(express.json());
app.use('/', food);



function notFoundHandler(req, res, next) {
    res.status(404).json({error: 'Not found'});
}

function errorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err){
        return res.status(400).json({ error: 'Invalid json'});
    }

    return res.status(500).json({error: 'Internal server error'});
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.info(`Server running at http://${host}:${port}/`)
});