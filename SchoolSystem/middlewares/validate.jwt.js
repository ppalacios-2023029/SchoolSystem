'use strict'

import jwt from 'jsonwebtoken'

export const validatejwt = (acceptRoles = []) =>{
    return async (req, res, next) =>{
        try{
            let secretKey = process.env.SECRET_KEY
            let { authorization} = req.headers
            console.log(authorization)
            if(!authorization)
                return res.status(400).send({message: 'Acceso no Autorizado'})

            let user = jwt.verify(authorization, secretKey)

            if(acceptRoles.length > 0 && !acceptRoles.includes(user.role))
                return res.status(403).send({message: 'Permisos insuficientes'})

            req.user = user
            next()
            
        }catch(e){
            console.error(e)
            return res.status(401).send({message: 'Token no valido'})
        }
    }
}