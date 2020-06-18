const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'message.json');

const getMessage = () => {
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : []

    try {
        return JSON.parse(data);
    } catch (e) {
        return [];      
    }
};

//Cria o arquivo recebendo a mensagem
const saveMesage = (message) => fs.writeFileSync(filePath, JSON.stringify(message, null, '\t'));

const routes = (app) => {

    app.route('/message/:id?')
        .get((request, response) => {
            const message = getMessage()
            response.send({ message })
        })
        .post((request, response) => {
            const message = getMessage()

            message.push(request.body)
            saveMesage(message)

            return response.status(201).send('OK')
        })
        .put((request, response) => {
            const message = getMessage()
            saveMesage(message.map(message => {
                if (message.id === request.params.id) {
                    return {
                        ...message,
                        ...request.body
                    }
                }

                return message
            }))

            response.status(200).send('OK')
        })
        .delete((request, response) => {
            const message = getMessage()
            saveMesage(message.filter(message => message.id !== request.params.id))

            response.status(200).send('OK')
        })
}

module.exports = routes