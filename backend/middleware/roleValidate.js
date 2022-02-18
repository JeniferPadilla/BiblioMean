import role from "../model/role.js";

const existingRole = async(req,res,next)=>{

    const roleId = await role.findOne({
        name: "user"})
        if(!roleId) return res.status(500).
        send({message: "no role was assigned"})
    
    req.body.role= roleId._id;

    next();
};

export default {existingRole}
