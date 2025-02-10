import { Schema, model } from "mongoose"

const courseSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            maxLength: 30
        }
    }
)

courseSchema.methods.toJSON = function(){
    const {...course}=this.toObject()
    return course
}

export default model('Course', courseSchema)