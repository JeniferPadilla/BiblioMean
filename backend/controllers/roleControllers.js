import role from "../model/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  let schemaRole = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });
  let resul = await schemaRole.save();

  if (!resul)
    return res.status(500).send({ message: "Error to register role" });
  res.status(200).send({ resul });
};

const consultRole = async(req, res)=>{

  try {
      const consult = await role.find();
      if(!consult) return res.status(500).send({message:"Error to register role"});
      res.status(200).send({consult});
  } catch (error) {
      console.log("Error al consultar:",error);
  }
};

export default { registerRole,consultRole };
