import book from "../model/book.js";
import user from "../model/user.js";

const existingBook  = async (req,res,next) =>{

    if ( !req.body.editorial)
    return res.status(400).send({message: "Incomplete data"});

    const existingEditorial = await book.findOne({editorial: req.body.editorial});
    if (existingEditorial) return res.status(400).send({message: "the user is already registered"});

    next();
};

const existingUser = async(req,res,next)=>{

    const userId = await user.findOne({
        name: "meresito"})
        if(!userId) return res.status(500).
        send({message: "no book was assigned"})
    
    req.body.user = userId._id;

    next();
};

export default {existingBook, existingUser};