const mongoose = require("mongoose")
const bcrypt= require("bcryptjs")

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   
   
})
// fire a function to hash signed up user's password before it's saved to db
userSchema.pre("save", async function (next){
    const salt =await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password, salt)
    next()

})


module.exports = mongoose.model('User', userSchema)