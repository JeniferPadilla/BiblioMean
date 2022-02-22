import user from "../model/user.js";


const existingUser = async(req,res,next)=>{

    const userId = await user.findOne({
        name: "meresito"})
        if(!userId) return res.status(500).
        send({message: "no book was assigned"})

    req.body.user = userId._id;

    next();
};

export default{existingUser};