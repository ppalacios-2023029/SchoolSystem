import { validationResult } from "express-validator"

export const validateErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).send(
            {
                message: 'Error en las Validaciones',
                errors: errors.errors
            }
        )
    next()
}


export const validateErrorsWithoutFile =(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
       return res.status(400).send(
        {
            message: 'Error en las Validaciones',
            errors: errors.errors
        }
    )
    next()
}
