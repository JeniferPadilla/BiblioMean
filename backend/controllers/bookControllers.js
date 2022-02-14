import book from "../model/book.js"

const registerBook = async (req, res)=>{

    if (!req.body.title || !req.body.author || !req.body.editorial || !req.body.category || !req.body. description || !req.body.quantity ||!req.body.deliveryDate)
    return res.status(400).send({message:"Incomplete data"});

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

    try {
        const consult = await book.find();
        if(!consult) return res.status(500).send({message:"Error to register book"});
        res.status(200).send({consult});
    } catch (error) {
        console.log("Error al consultar:",error);
    }
};

export default{registerBook, consultBook};