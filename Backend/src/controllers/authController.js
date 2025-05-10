import { User } from "../schemas/blog.Schema.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({ message: "User already exists!" })

       
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({name,email,password:hashedPassword})
        await newUser.save()
        return res.status(201).json({message:"User Created Successfully"})
        
    } catch (error) {
        return res.status(500).json({message:error.message})     
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message:"User not found! Please register before login"})

        const isValidPassword =  await bcrypt.compare(password,user.password)
        if(!isValidPassword) return res.status(400).json({message:"Invalid Password"})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'5h'})

        const { password:_, ...userData} = user._doc;

        return res.status(200).json({message:"User login Successfull!",data:userData,token})
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const me = async (req,res)=>{
    try {
        const user = await User.findOne({_id:req.user.id}).select("-password")
        console.log(user)
        return res.status(200).json({message:"User Found",user})
    } catch (error) {
        console.error(error,"Error Findig User.")
        return res.status(500).json({message:"Server Error, Fetching user"})
    }
}