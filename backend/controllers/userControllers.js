import user from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "../lib/jwt.js";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.phone)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const schemaUser = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    phone: req.body.phone,
    role: req.body.role,
    dbStatus: true,
  });
  const result = await schemaUser.save();

  if (!result)
    return res.status(500).send({ message: "Error to register user" });

  const token = await jwt.generateToken(result);

  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

const registerAdminUser = async (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.phone)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const schemaUser = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    phone: req.body.phone,
    role: req.body.role,
    dbStatus: true,
  });
  const result = await schemaUser.save();

  if (!result)
    return res.status(500).send({ message: "Error to register user" });

  const token = await jwt.generateToken(result);

  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec(); //para traer la lista de todos- users es un array, el populate es para indicar algo exacto para mostrar
  if (users.length == 0)
    return res.status(400).send({ message: "No search results" });
  return res.status(200).send({ users });
  //la funcion para hacer filtros find( aqui va una expresion regular:osea que acepta tpodo el RegExp)
};

const listAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.length == 0)
    return res.status(400).send({ message: "No search results" });
  return res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Email or password error" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "Email or password error" });

  const passhash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!passhash)
    return res.status(400).send({ message: "Email or password error" });

  const token = await jwt.generateToken(userLogin);
  return !token
    ? res.status(500).send({ message: "Login error" })
    : res.status(200).send({ token });
};

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ message: "Error deliting user" })
    : res.status(200).send({ message: "User delete" });
};

const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.phone || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }
  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    phone: req.body.phone,
    role: req.body.role,
  });
  if (!editUser)
    return res.status(500).send({ message: "Error editing user " });
  return res.status(200).send({ message: "User Admin update" });
};

export default {
  registerUser,
  listUser,
  listAdmin,
  login,
  deleteUser,
  updateUserAdmin,
  registerAdminUser
};
