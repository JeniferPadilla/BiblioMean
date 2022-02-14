import user from "../model/user.js";
import role from "../model/role.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async(req, res)=>{

    if (!req.body.name || !req.body.email || !req.body.password || !req.body.phone)
    return res.status(400).send({message: "Incomplete data"});

    const existingUser = await user.findOne({email: req.body.email});

    if (existingUser) return res.status(400).send({message: "the user is already registered"});

    const passHash = await bcrypt.hash(req.body.password, 10);

    const roleId = await role.findOne({
        name: "user"})
        if(!roleId) return res.status(500).send({message: "no role was assigned"})
    
    const schemaUser = new user({
        name: req.body.name,
        email:req.body.email,
        password:passHash,
        phone: req.body.phone,
        role: roleId._id,
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

export default { registerUser};