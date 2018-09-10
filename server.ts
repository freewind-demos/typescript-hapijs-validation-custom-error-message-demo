import * as Hapi from 'hapi'
import * as Joi from 'joi'
import {Request, ResponseToolkit} from 'hapi'
import Boom = require('boom')

const server = new Hapi.Server({
    host: 'localhost',
    port: 8000
})

server.route({
    method: 'POST',
    path: '/hello',
    handler: function (request: Request, h: ResponseToolkit, err?: Error) {
        console.log('-------------- handler ----------------')
        if (err) {
            console.log('------------ handler:err ------------')
            console.log(err)
        }
        const name = (request.payload as { name: string }).name
        return `Hello, ${name}`
    },
    options: {
        validate: {
            payload: {
                name: Joi.string().required().error(new Error('\'name\' is missing'))
            },
            failAction: (request: Request, h: ResponseToolkit, err: Error) => {
                console.log('------------- failAction ------------')
                console.log(err)
                throw Boom.badRequest(err.message)
            }
        }
    }
} as Hapi.ServerRoute);

(async () => {
    await server.start()
    console.log('Server is started: ' + server.info.uri)
})()