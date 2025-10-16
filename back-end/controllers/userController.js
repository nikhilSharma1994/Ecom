import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)

}

// Route for user login
const loginUser = async (req, resp) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return resp.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            resp.json({ success: true, token })
        } else {
            resp.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message })

    }
}



// route for user registrations

const registerUser = async (req, resp) => {


    try {
        const { name, email, password } = req.body;

        // check for missing fields
        if (!name || !email || !password) {
            return resp.json({
                success: false,
                message: "All fields (name, email, password) are required.",
            });
        }

        // checking user already exists or not 
        const exists = await userModel.findOne({ email });
        if (exists) {
            return resp.json({ success: false, message: "user already exist" })
        }

        // validating email format and string password


        if (!validator.isEmail(email)) {
            return resp.json({ success: false, message: "Please enter a valid email " })
        }


        if (password.length < 8) {
            return resp.json({ success: false, message: "Please enter a strong password " })
        }

        // hashing user pasword 

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        resp.json({ success: true, token });
    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message })

    }

}


// route for admin login

const adminLogin = async (req, resp) => {
    try {
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD ){
            const token =jwt.sign(email+password,process.env.JWT_SECRET);
            resp.json({success:true,token})
        }else{
             resp.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
       console.log(error);
        resp.json({ success: false, message: error.message })
    }
}


export { loginUser, registerUser, adminLogin }