import book from "../model/book.js";

const registerBook = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.author ||
    !req.body.category ||
    !req.body.description ||
    !req.body.quantity ||
    !req.body.deliveryDate
  )
    return res.status(400).send({ message: "Incomplete data" });

  const schemaBook = new book({
    title: req.body.title,
    author: req.body.author,
    editorial: req.body.editorial,
    category: req.body.category,
    description: req.body.description,
    quantity: req.body.quantity,
    deliveryDate: req.body.deliveryDate,
    user: req.user._id,
    dbStatus: true,
  });
    const result = await schemaBook.save();

  return !result
    ? res.status(500).send({ message: "Error to register book" })
    : res.status(200).send({ result });
};

const consultBook = async (req, res) => {
  let books = await book.find({ name: new RegExp(req.params["name"]) });
  if (books.length == 0)
    return res.status(500).send({ message: "no search results" });
  return res.status(200).send({ books });
};

const listBookUser = async (req, res) => {
  let books = await book.find({ user: req.params["_id"] });

  if (books.length == 0)
    return res.status(500).send({ message: "no search results" });
  return res.status(200).send({ books });
};

const deleteBook = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const books = await book.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !books
    ? res.status(400).send({ message: "Error deliting book" })
    : res.status(200).send({ message: "Book delete" });
};

const updateBook = async (req, res) => {
  if (
    !req.body._id ||
    !req.body.title ||
    !req.body.author ||
    !req.body.category ||
    !req.body.description ||
    !req.body.quantity ||
    !req.body.deliveryDate
  )
    return res.status(400).send({ message: "Incomplete data" });

  const editBook = await book.findByIdAndUpdate(req.body._id, {
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    description: req.body.description,
    quantity: req.body.quantity,
    deliveryDate: req.body.deliveryDate,
    user: req.body.user,
  });
  if (!editBook)
    return res.status(500).send({ message: "Error editing book " });
  return res.status(200).send({ message: "Book update" });
};

export default {
  registerBook,
  consultBook,
  listBookUser,
  deleteBook,
  updateBook,
};
