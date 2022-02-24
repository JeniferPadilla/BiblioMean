import user from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async(req, res)=>{

    if (!req.body.name || !req.body.password || !req.body.phone)
    return res.status(400).send({message: "Incomplete data"});

    const passHash = await bcrypt.hash(req.body.password, 10);

    const schemaUser = new user({
        name: req.body.name,
        email:req.body.email,
        password:passHash,
        phone: req.body.phone,
        role: req.body.role,
        dbStatus:true,
    });
    const result= await schemaUser.save();

    if(!result) return res.status(500).send({message:"Error to register user"});

    try {
        return res.status(200).json({
            token: jwt.sign({
                _id: result._id,
                name:result.name,
                role:result.role,
                iat: moment().unix()
            },
            process.env.SK_JWT
            ),
        });
    } catch (e) {
        return res.status(500).send({message:"Register error"});
    }
};

const listUser = async (req,res)=>{
    let users= await user
    .find({ name: new RegExp(req.params["name"])})
    .populate("role")
    .exec();  //para traer la lista de todos- users es un array, el populate es para indicar algo exacto para mostrar
    if (users.length == 0)
    return res.status(400).send({message:"No search results"});
    return res.status(200).send ({users});
//la funcion para hacer filtros find( aqui va una expresion regular:osea que acepta tpodo el RegExp)
};

const listAdmin = async (req,res)=>{
    let users= await user
    .find({ name: new RegExp(req.params["name"])})
    .populate("role")
    .exec();  //para traer la lista de todos- users es un array, el populate es para indicar algo exacto para mostrar
    if (users.length == 0)
    return res.status(400).send({message:"No search results"});
    return res.status(200).send ({users});
//la funcion para hacer filtros find( aqui va una expresion regular:osea que acepta tpodo el RegExp)
};

const login = async (req, res) =>{

    const userLogin = await user.findOne({ email: req.body.email });
    if (!userLogin)
        return res.status(400).send({ message: "Email no found" }); // verificar email

    if (!userLogin.dbStatus)
        return res.status(400).send({ message: "User no found" });// verificar dbStatus

    const passhash = await bcrypt.compare(req.body.password, userLogin.password);

    if (!passhash)
        return res.status(400).send({ message: "password no found" });

    try {
        return res.status(200).json({
            token: jwt.sign({
                _id: userLogin._id,
                name: userLogin.name,
                role: userLogin.role,
                iat: moment().unix() //para generar la fecha de ingreso, el moment para encriptar la fecha
            },
                process.env.SK_JWT
            ),
        });
    } catch (e) {
        return res.status(500).send({ message: "Register error" });
    }
};

const deleteUser = async(req, res)=>{
    if(!req.params["_id"])
    return res.status(400).send({message:"Incomplete data"});

    const users =await user.findByIdAndUpdate(req.params["_id"], {dbStatus: false,})

    return !users
    ? res.status(400).send({message:"Error deliting user"})
    : res.status(200).send({message:"User delete"})

};

const updateUserAdmin = async(req, res)=>{

    if (!req.body._id || !req.body.name || !req.body.phone || !req.body.email)
    return res.status(400).send({message:"Incomplete data"});

    let pass ="";

    if (!req.body.password){
        const findUser = await user.findOne({email:req.body.email});
         pass= findUser.password;
    }else{
        pass=await bcrypt.hash(req.body.password,10);
    }
    const editUser = await user.findByIdAndUpdate(req.body._id,{
        name: req.body.name,
        password: pass,
        phone:req.body.phone,
        role:req.body.role,
    });
    if (!editUser)return res.status(500).send({message:"Error editing user "})
    return res.status(200).send({message:"User Admin update"});

};


export default {
     registerUser,
     listUser,
     listAdmin,
     login,
     deleteUser,
     updateUserAdmin};