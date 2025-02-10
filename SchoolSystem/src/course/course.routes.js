import { Router } from "express";
import { addCourse, getCourse, upDateCourse, delCourse} from "./course.controller.js";
import { courseValidator } from "../../middlewares/validator.js";
import { validatejwt } from "../../middlewares/validate.jwt.js";

const api=Router();

api.post('/addCourse', courseValidator, addCourse)
api.get('/getCourse', getCourse)
api.put('/upDateCourse/:id', validatejwt (['TEACHER_ROLE']), upDateCourse)
api.delete('/delCourse/:id', validatejwt (['TEACHER_ROLE']), delCourse)

export default api;