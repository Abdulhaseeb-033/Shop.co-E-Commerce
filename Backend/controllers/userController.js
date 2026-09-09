import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({role: "user"}).select("-password");

        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await  User.findById({
            _id: req.params.id,
            role: "user"
        }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user",
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id,
            role: "user"
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message
        });
    }
}