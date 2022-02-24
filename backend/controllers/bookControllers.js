import book from "../model/book.js";
import user from "../model/user.js";
import moment from "moment";
import jwt from "jsonwebtoken";

const registerBook = async (req, res)=>{

    if (!req.body.title || !req.body.author  || !req.body.category || !req.body. description || !req.body.quantity ||!req.body.deliveryDate || !req.body._id )
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
    user:req.body.user,
    // user_id :req.body.user._id,
    dbStatus:true,
    });
    let result = await schemaBook.save();

    if(!result) return res.status(500).send({message:"Error to register book"});

    try {
        return res.status(200).json({    //se pone .json para los jsonwebtoken
            token: jwt.sign({           //asi se crea el jsonwebtoken jwt
            _id: result._id,
            user_id: result._id,
            title: result.title,         //aqui se hace una copia de la db
            author: result.author,
            editorial:result.editorial,
            user:result.user,
            // role: result.role,        //se ponen los nombres como estan en la db osea com esta en model
            iat: moment().unix()              //para generar la fecha de ingreso, el moment para encriptar la fecha
            },
            process.env.SK_JWT
            ),
        });
    } catch (e) {
return res.status(500).send({message: "Register error"});
    }
};

const consultBook = async(req, res)=>{

        let books = await book.find({name: new RegExp(req.params["name"])});
        if(books.length==0)
        return res.status(500).send({message:"no search results"});
       return res.status(200).send({books});
};

const listBookUser = async(req, res)=>{
    let books = await book.find({user: (req.params["_id"])});

    if(books.length==0)
    return res.status(500).send({message:"no search results"});
   return res.status(200).send({books});
};

const deleteBook = async(req, res)=>{

    if(!req.params["_id"])
    return res.status(400).send({message:"Incomplete data"});

    const books =await book.findByIdAndUpdate(req.params["_id"], {dbStatus: false,})

    return !books
    ? res.status(400).send({message:"Error deliting book"})
    : res.status(200).send({message:"Book delete"})
};

const updateBook = async(req, res)=>{

    if (!req.body._id ||!req.body.title || !req.body.author  || !req.body.category || !req.body.description || !req.body.quantity ||!req.body.deliveryDate)
    return res.status(400).send({message:"Incomplete data"});

    const editBook = await book.findByIdAndUpdate(req.body._id,{

        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description:req.body.description,
        quantity:req.body.quantity,
        deliveryDate:req.body.deliveryDate,
        user:req.body.user,
    });
    if (!editBook)return res.status(500).send({message:"Error editing book "})
    return res.status(200).send({message:"Book update"});
};


export default{
    registerBook,
    consultBook,
    listBookUser,
    deleteBook,
    updateBook};