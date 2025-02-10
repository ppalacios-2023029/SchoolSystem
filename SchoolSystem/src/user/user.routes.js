import { Router } from "express";
import { UserValidator } from "../../middlewares/validator.js";
import { addUser, login, viewCourse, updateUser, deleteUser } from "./user.controller.js";
import { validatejwt } from "../../middlewares/validate.jwt.js";

const api = Router();

api.post('/addUser', UserValidator, addUser)
api.post('/login', login)
api.get('/viewCourse/:id', validatejwt (['TEACHER_ROLE', 'STUDENT_ROLE']), viewCourse)
api.put('/updateUser/:id', validatejwt (['STUDENT_ROLE']), updateUser)
api.delete('/deleteUser/:id', validatejwt (['STUDENT_ROLE']), deleteUser)

export default api;