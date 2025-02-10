import { body } from "express-validator";
import { validateErrors } from "./validated.error.js";
import { existCourse, existEmail } from "../utils/db.validator.js";

export const courseValidator=[
    body('name','Nombre Requerido').notEmpty().toLowerCase().custom(existCourse),
    validateErrors
]

export const UserValidator=[
    body('name','Nombre Requerido').notEmpty(),
    body('surname','Apellido Requerido').notEmpty(),
    body('email','Correo Requerido').notEmpty().isEmail().custom(existEmail),
    body('password','Contraseña Requerida').notEmpty().isStrongPassword().withMessage('La Contraseña debe ser Segura').isLength({min:8}),
]