'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from 'cors'
import userRoutes from '../src/user/user.routes.js'
import courseRoutes from '../src/course/course.routes.js'

const configs = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app) =>{
    app.use(userRoutes)
    app.use(courseRoutes)
}

export const initServer = () =>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Servidor Corriendo en el Puerto ${process.env.PORT}`)
    }catch(e){
        console.error('Inicializacion del Servidor Fallida', e)
    }
}