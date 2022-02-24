import user from "../model/user.js";
import book from "../model/book.js";

const existingUser = async(req,res,next)=>{

    // const userId = await user.find({user: (req.params["_id"])});
    const userId = await user.findOne({_id: req.body._id});
   
        if(!userId) return res.status(500).
        send({message: "no user was assigned"})

    req.body.user = userId._id;

    next();
};

const existingBook  = async (req,res,next) =>{

    if ( !req.body.editorial)
    return res.status(400).send({message: "Incomplete data"});

    const existingEditorial = await book.findOne({editorial: req.body.editorial});
    if (existingEditorial) return res.status(400).send({message: "the user is already registered"});

    next();
};

export default{existingUser, existingBook};