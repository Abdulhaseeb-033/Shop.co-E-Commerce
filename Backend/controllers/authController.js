import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
             message: "User created successfully",
             user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
             }
            });
    } catch (error) {
        res.status(500).json({ 
            message: "Error creating user",
            error: error.message
        });
    }
};