import { Schema, model } from "mongoose"


const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: [25]
        },
        surname: {
            type: String,
            required: true,
            maxLength: [25]
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minLegth: [8],
            maxLength: [100]
        },
        role: {
            type: String,
            uppercase: true,
            enum: ['TEACHER_ROLE, STUDENT_ROLE'],
            default: 'STUDENT_ROLE'
        },
        course:{
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    }
)

userSchema.methods.toJson = function(){
    const {__v, password, ...user} = this.toObject()
    return user
}

export default model('User', userSchema)