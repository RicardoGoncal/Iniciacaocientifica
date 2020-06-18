const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
//Porta a ser utilizada
const port = 3333

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.get('/', (request, response) => response.send('Teste página inicial'));

app.listen(port, () => console.log(`Rodando na porta ${port}`));