import user from "../model/user.js";

const registerUser = async(req, res)=>{

    if (!req.body.name || !req.body.email || !req.body.password || !req.body.phone )
    return res.status(400).send({message: "Imcomplete date"});

    let schemaUser = new user({

        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone: req.body.phone,
        dbStatus:true,
    });
    let result= await schemaUser.save();

    if(!result) return res.status(500).send({message:"Error to register user"});
    res.status(200).send({result});
};

export default { registerUser};