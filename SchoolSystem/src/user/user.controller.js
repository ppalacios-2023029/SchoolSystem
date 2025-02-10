import User from './user.model.js'
import {generateJwt} from '../../utils/jwt.js'
import {checkPassword, encrypt} from '../../utils/encrypt.js'

export const addUser = async(req, res)=>{
    try{
        const {course , ...data} = req.body
        const user = new User(data)

        user.course = course || [] 
        if (user.course.length > 3)
            return res.status(400).send({message: 'No te puedes asignar a mas de 3 cursos'})
        
        if(new Set(course).size !== course.length)
            return res.status(400).send({message: 'Ya estas inscrito en este curso'})
        
        user.password = await encrypt(user.password)
        await user.save()
        return res.send({message: 'Registro Exitoso, puede acceder con su correo'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Error General'})
    }
}

export const login = async(req, res) =>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user || !(await checkPassword(user.password, password))){
            return res.status(400).send({message: 'Credenciales Invalidad'})
        }else{
            let loggedUser = {
                id: user._id,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Bienvenido ${user.name}`,
                    loggedUser,
                    token
                },
            )
        }
            
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Error General'})
    }
}

export const viewCourse = async(req, res) => {
    try{
        const {id} = req.params
        const user = await User.findbyId(id).populate('course')
        if(!user)
            return res.status(404).send({message: 'Usuario no encontrado'})
        
        return res.status(200).send({
            message: 'Usuario y curso encontrados'
        })
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Error General', e})
    }
}

export const updateUser = async(req, res)=>{
    try{
        const {id} = req.params
        const data = req.body
        const updateUser = await User.findByIdAndUpDate (id, data, {new: true})
        if(!updateUser) return res.status(400).send({message: 'Usuario no Encontrado'})
            
            return res.send({message: 'Usuario Actualizado', updateUser})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Error General'})
    }
}

export const deleteUser = async(req, res) => {
    try{
        const {id} = req.params
        const data = req.body
        const delUser = await User.findByIdAndDelete(id, data, {new: true})

        if(!delUser)
            return res.status(400).send({message: 'Usuario no Encontrado'})

        return res.send({message: 'Usuario Eliminado', delUser})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Error General', e})
    }
}