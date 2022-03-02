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

  try {
    return res.status(200).json({
      //se pone .json para los jsonwebtoken
      token: jwt.sign(
        {
          //asi se crea el jsonwebtoken jwt
          _id: resul._id,
          name: resul.name,
          description: resul.description, //aqui se hace una copia de la db
          iat: moment().unix(), //para generar la fecha de ingreso, el moment para encriptar la fecha
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const consultRole = async (req, res) => {
  try {
    let consult = await role.find();
    if (!consult)
      return res.status(500).send({ message: "Error to register role" });
    res.status(200).send({ consult });
  } catch (error) {
    console.log("Error al consultar:", error);
  }
};

const deleteRol = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const roles = await role.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !roles
    ? res.status(400).send({ message: "Error deliting role" })
    : res.status(200).send({ message: "Role delete" });
};

const updateRole = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  const editRole = await role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  if (!editRole)
    return res.status(500).send({ message: "Error editing role " });
  return res.status(200).send({ message: "Role update" });
};

export default { registerRole, consultRole, deleteRol, updateRole };
