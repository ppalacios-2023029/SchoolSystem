import Course from '../src/course/course.model.js'
import User from '../src/user/user.model.js'

export const existCourse = async(name,course,id)=>{
    const alCourse = await Course.findOne({name})

    if(alCourse && alCourse._id !=course.uid){
        console.error(` El Curso ${name} ya existe`)
        throw new Error(`El Curso ${name} ya existe`)
    }
}

export const existEmail = async(email,user)=>{
    const alEmail = await User.finOne({email})
    if(alEmail && alEmail._id!=user.id){
        console.error(`El Correo ${email} ya existe`)
        throw new Error(`El Correo ${email} y existe`)
    }
}

export const notRequiredField=(field)=>{
    if(!field){
        throw new Error(`${field} no es necesario`)
    }
}