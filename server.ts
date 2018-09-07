import * as Hapi from 'hapi'
import * as Joi from 'joi'
import {Request, ResponseToolkit} from 'hapi'

const server = new Hapi.Server({
    host: 'localhost',
    port: 8000
})

server.route({
    method: 'POST',
    path: '/hello',
    handler: function (request: Request, h: ResponseToolkit) {
        const name = (request.payload as { name: string }).name
        return `Hello, ${name}`
    },
    options: {
        validate: {
            payload: {
                name: Joi.string().min(1).max(10)
            }
        }
    }
} as Hapi.ServerRoute);

(async () => {
    await server.start()
    console.log('Server is started: ' + server.info.uri)
})()