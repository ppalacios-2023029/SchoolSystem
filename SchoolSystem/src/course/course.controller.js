import Course from './course.model.js'
import User from '../user/user.model.js'

export const addCourse = async(req, res) =>{
    try{
        let data = req.body
        let course = new Course(data)

        await course.save()
        return res.status(200).send({message: 'Curso Agregado Correctamente', course})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Error General'})
    }
}

export const getCourse = async(req, res)=>{
    try{
        const listCourses = await Course.find()

        if(listCourses.lenght === 0)
            return res.status(404).send({message: 'No hay cursos asignados'})

        return res.status(200).send({message: 'Curso Disponible'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Error General'})
    }
}

export const upDateCourse = async (req, res) => {
    try {
        const { id } = req.params
        const teacherId = req.user.id 
        const data = req.body
        const teacher = await User.findById(teacherId)
        if (!teacher.course || !teacher.course.includes(id)) 
            return res.status(403).send({ message: 'No esta asignado al Curso' })
        
        const updatedcourse = await Course.findByIdAndUpdate(id, data, { new: true })

        if (!updatedcourse) 
            return res.status(404).send({ message: 'Curso No Encontrado' })
        
        return res.send({
            message: 'Curso Actualizado Correctamente',
            course: updatedcourse
        })

    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'ERROR GENERAL', e })
    }
}

export const delCourse = async (req, res) => {
    try {
        const { id } = req.params
        const teacherId = req.user.id
        const teacher = await User.findById(teacherId)

        if (!teacher.course || !teacher.course.includes(id)) 
            return res.status(403).send({message: 'No esta asignado al Curso'})
        
        const deleteCourse = await Course.findByIdAndDelete(id)

        if (!deleteCourse) 
            return res.status(404).send({message: 'Curso no Encontrado'})
        
        return res.send({message: 'Curso Eliminado Correctamente',})

    } catch (e) {
        console.error(e)
        return res.status(500).send({ message: 'ERROR GENERAL', e })
    }
}