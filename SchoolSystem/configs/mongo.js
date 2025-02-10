import mongoose from "mongoose"

export const connect = async()=>{
    try{
        mongoose.connection.on('error',()=>{
            console.log('MongoDB | No se ha podido conectar a MongoDB')
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | Conectando')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | Conectado a MongoDB')
        })
        mongoose.connection.on('open', ()=>{
            console.log('MongoDB | Conectado a la BD')
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB | MongoDB reconectado')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB | Desconectado')
        })
        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50,
                serverSelectionTimeoutMS: 5000
            }
        )
    }catch(e){
        console.error('Conexion a la BD fallida', e)
    }
}