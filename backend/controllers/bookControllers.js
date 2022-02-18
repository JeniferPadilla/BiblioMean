import book from "../model/book.js";
import user from "../model/user.js";
import moment from "moment";
import jwt from "jsonwebtoken";

const registerBook = async (req, res)=>{

    if (!req.body.title || !req.body.author || !req.body.editorial || !req.body.category || !req.body. description || !req.body.quantity ||!req.body.deliveryDate)
    return res.status(400).send({message:"Incomplete data"});

    const existingUser = await user.findOne({email: req.body.email});

    if (existingUser) return res.status(400).send({message: "the user is already registered"});

    let schemaBook = new book({
    title:req.body.title,
    author:req.body.author,
    editorial:req.body.editorial,
    category: req.body.category,
    description:req.body.description,
    quantity:req.body.quantity,
    deliveryDate:req.body.deliveryDate,
    dbStatus:true,
    });
    let result = await schemaBook.save();

    if(!result) return res.status(500).send({message:"Error to register book"});
    res.status(200).send({result});
};

const consultBook = async(req, res)=>{

        let books = await book.find({name: new RegExp(req.params["name"])});
        if(books.length==0) 
        return res.status(500).send({message:"no search results"});
       return res.status(200).send({books});
    };

export default{registerBook, consultBook};